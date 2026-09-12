"use client"

import { useEffect, useMemo, useState } from "react"
import { apiFetch } from "@/lib/api"
import { Icon } from "@/components/ui"
import Link from "next/link"

type User = {
  id?: string
  _id?: string
  name: string
  email: string
  age?: number
}

type WorkoutSession = {
  _id: string
  userId: string
  workoutId: string
  date: string
  exercises: {
    exercise: string
    sets?: { reps: number; weight: number; duration: number }[]
  }[]
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        setError(null)
        setLoading(true)

        const [userData, sessionData] = await Promise.all([
          apiFetch<{ user: User }>("/auth/me"),
          apiFetch<WorkoutSession[]>("/workout-session"),
        ])

        const currentUserId =
          userData?.user?.id ||
          userData?.user?._id ||
          (typeof window !== "undefined" ? localStorage.getItem("userId") : null)

        const allSessions = Array.isArray(sessionData) ? sessionData : []
        const userSessions = currentUserId
          ? allSessions.filter((s) => String(s.userId) === String(currentUserId))
          : allSessions

        setUser(userData.user)
        setSessions(userSessions)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const stats = useMemo(() => {
    if (!sessions.length) return null

    const totalSessions = sessions.length

    const lastSession = sessions
      .slice()
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )[0]

    const totalSets = sessions.reduce((sessionSum, session) => {
      const sessionSets =
        session.exercises?.reduce((exerciseSum, exercise) => {
          return exerciseSum + (exercise.sets?.length ?? 0)
        }, 0) ?? 0

      return sessionSum + sessionSets
    }, 0)

    return {
      totalSessions,
      lastSession,
      totalSets,
    }
  }, [sessions])

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_80%)]" />
        <div className="animate-orb absolute top-24 right-20 h-96 w-96 rounded-full bg-volt-300/10 blur-[100px]" />
        <div className="animate-orb absolute top-80 left-10 h-80 w-80 rounded-full bg-iris-500/10 blur-[90px]" style={{ animationDelay: "-9s" }} />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-8 border-b border-white/8 pb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
            User Account
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Account <span className="text-gradient">Profile</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Manage your personal athlete profile and training statistics.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="glass-strong h-64 animate-pulse rounded-3xl border border-white/8 p-6" />
            <div className="glass-strong h-64 animate-pulse rounded-3xl border border-white/8 p-6 md:col-span-2" />
          </div>
        ) : error ? (
          <div className="flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-300 backdrop-blur-md">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <section className="glass-strong rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-7 md:col-span-1">
              <div className="flex items-center gap-3 border-b border-white/8 pb-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-volt-300 to-aqua-400 font-display text-lg font-bold text-ink-950 shadow-[0_0_20px_-4px_rgba(214,255,102,0.6)]">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">
                    {user?.name || "Athlete"}
                  </h2>
                  <p className="text-xs text-volt-300 font-medium">Active Member</p>
                </div>
              </div>

              {user ? (
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Full Name
                    </dt>
                    <dd className="mt-1 font-medium text-white">{user.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Email Address
                    </dt>
                    <dd className="mt-1 font-medium text-white">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Age
                    </dt>
                    <dd className="mt-1 font-medium text-white">{user.age ?? "Not specified"}</dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-4 text-xs text-white/50">
                  No user information found. Please log in again.
                </p>
              )}
            </section>

            <section className="glass-strong flex flex-col justify-between rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-7 md:col-span-2">
              <div>
                <div className="flex items-center justify-between border-b border-white/8 pb-5">
                  <h2 className="font-display text-lg font-semibold text-white">
                    Workout Activity Summary
                  </h2>
                  <Link
                    href="/dashboard/my-progress"
                    className="text-xs font-medium text-volt-300 hover:underline"
                  >
                    View charts →
                  </Link>
                </div>

                {!stats ? (
                  <div className="py-12 text-center text-sm text-white/50">
                    You haven&apos;t logged any workout sessions yet.
                    <div className="mt-4">
                      <Link
                        href="/workout-session"
                        className="inline-flex items-center gap-2 rounded-full bg-volt-300 px-5 py-2 text-xs font-semibold text-ink-950 hover:bg-volt-200"
                      >
                        Start your first session
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                        Total sessions
                      </p>
                      <p className="mt-2 font-display text-3xl font-bold text-volt-300 tabular-nums">
                        {stats.totalSessions}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                        Sets logged
                      </p>
                      <p className="mt-2 font-display text-3xl font-bold text-white tabular-nums">
                        {stats.totalSets}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                        Last session
                      </p>
                      <p className="mt-2 font-display text-lg font-semibold text-white">
                        {new Date(stats.lastSession.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                <span className="text-xs text-white/40">Ready to train?</span>
                <Link
                  href="/workouts"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
                >
                  Browse workouts
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}