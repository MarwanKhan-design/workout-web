"use client"

import { apiFetch } from "@/lib/api"
import type { User } from "@/lib/types"
import { useEffect, useMemo, useState } from "react"

type WorkoutSession = {
  _id: string
  userId: string
  workoutId: string
  date: string
  exercises: { exercise: string; reps?: number; weight?: number; duration?: number }[]
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setError(null)
        setLoading(true)

        const me = await apiFetch<{ user?: User }>("/auth/me")
        if (me.user) setUser(me.user)

        const allSessions = await apiFetch<WorkoutSession[]>("/workout-session")
        const uid = me.user?._id
        setSessions(
          uid ? allSessions.filter((s) => String(s.userId) === String(uid)) : allSessions
        )
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const stats = useMemo(() => {
    if (!sessions.length) return null

    const totalSessions = sessions.length
    const lastSession = sessions
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

    const totalSets = sessions.reduce(
      (sum, s) => sum + (s.exercises?.length ?? 0),
      0
    )

    return { totalSessions, lastSession, totalSets }
  }, [sessions])

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Your account details and workout progress.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Loading profile...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-sm">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <section className="md:col-span-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">User info</h2>
            {user ? (
              <dl className="mt-3 space-y-2 text-sm text-slate-700">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Name
                  </dt>
                  <dd>{user.name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Email
                  </dt>
                  <dd>{user.email}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Age
                  </dt>
                  <dd>{user.age ?? "–"}</dd>
                </div>
              </dl>
            ) : (
              <p className="mt-3 text-sm text-slate-600">
                No user information found. You may need to log in again.
              </p>
            )}
          </section>

          <section className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Workout progress
            </h2>

            {!stats ? (
              <p className="mt-3 text-sm text-slate-600">
                You haven&apos;t logged any workout sessions yet.
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Total sessions</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {stats.totalSessions}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Total sets logged</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {stats.totalSets}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Last session</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {new Date(stats.lastSession.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}