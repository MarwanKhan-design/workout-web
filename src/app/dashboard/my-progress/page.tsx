"use client"

import { apiFetch } from "@/lib/api"
import type { Workout } from "@/lib/types"
import { useEffect, useMemo, useState } from "react"

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

export default function MyProgressPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setError(null)
        setLoading(true)

        const [allSessions, allWorkouts] = await Promise.all([
          apiFetch<WorkoutSession[]>("/workout-session"),
          apiFetch<Workout[]>("/workout"),
        ])

        const userId = localStorage.getItem("userId")
        const filtered = userId
          ? allSessions.filter((s) => String(s.userId) === String(userId))
          : allSessions

        setSessions(filtered)
        setWorkouts(allWorkouts)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load progress")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const workoutNameById = useMemo(() => {
    const map: Record<string, string> = {}
  
    workouts.forEach((w) => {
      if (w._id) {
        map[String(w._id)] = w.name
      }
    })
  
    return map
  }, [workouts])

  const stats = useMemo(() => {
    if (!sessions.length) return null
  
    const totalSessions = sessions.length
  
    const totalSets = sessions.reduce((sessionSum, session) => {
      const sessionSets =
        session.exercises?.reduce((exerciseSum, exercise) => {
          return exerciseSum + (exercise.sets?.length ?? 0)
        }, 0) ?? 0
  
      return sessionSum + sessionSets
    }, 0)
  
    const first = sessions
      .slice()
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )[0]
  
    const last = sessions
      .slice()
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )[0]
  
    return {
      totalSessions,
      totalSets,
      first,
      last,
    }
  }, [sessions])
  
  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    if (Number.isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) // e.g. 5 Aug 2020
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          My progress
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Overview of your workout history and logged sessions.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Loading progress...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-sm">
          {error}
        </div>
      ) : (
        <>
          {/* Top summary card */}
          <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Summary
            </h2>
            {!stats ? (
              <p className="mt-3 text-sm text-slate-600">
                No workout sessions logged yet. Start a session from the home page or
                the workout session section.
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                  <p className="text-xs text-slate-500">First session</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {formatDate(stats.first.date)}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Last session</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {formatDate(stats.last.date)}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Sessions list */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">
              All sessions
            </h2>

            {!sessions.length ? (
              <p className="text-sm text-slate-600">
                No sessions to show yet.
              </p>
            ) : (
              <div className="space-y-2">
                {sessions
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((s) => {
                    const name =  workoutNameById[s.workoutId]
                    const sets = s.exercises?.length ?? 0
                    return (
                      <div
                        key={s._id}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-900">
                            {name}
                          </p>
                          <p className="text-xs text-slate-600">
                            {formatDate(s.date)} • {sets} set
                            {sets === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}