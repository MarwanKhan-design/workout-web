"use client"

import ChartsCard from "@/components/charts/StatsCards"
import { apiFetch } from "@/lib/api"
import type { Workout } from "@/lib/types"
import { useEffect, useMemo, useState } from "react"
import { Icon } from "@/components/ui"
import Link from "next/link"

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

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    if (Number.isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const chartData = useMemo(() => {
    return sessions.map((session) => ({
      date: formatDate(session.date),
      value: session.exercises.length,
    }))
  }, [sessions])

  const heatmapData = useMemo(() => {
    return Object.values(
      sessions.reduce((acc, session) => {
        const date = session.date.split("T")[0]
        if (!acc[date]) {
          acc[date] = { date, count: 0 }
        }
        acc[date].count += 1
        return acc
      }, {} as Record<string, { date: string; count: number }>)
    )
  }, [sessions])

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

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_80%)]" />
        <div className="animate-orb absolute top-20 right-10 h-96 w-96 rounded-full bg-volt-300/10 blur-[100px]" />
        <div className="animate-orb absolute top-96 left-10 h-80 w-80 rounded-full bg-aqua-400/10 blur-[90px]" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
              Performance Analytics
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Training <span className="text-gradient">Progress</span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Review your training consistency, frequency trends, and recorded workout history.
            </p>
          </div>

          <Link
            href="/workout-session"
            className="inline-flex items-center gap-2 rounded-full bg-volt-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] hover:bg-volt-200 transition-all"
          >
            <Icon name="play" className="h-4 w-4" />
            <span>New session</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="glass-strong h-28 animate-pulse rounded-2xl border border-white/8 p-5" />
            ))}
          </div>
        ) : error ? (
          <div className="flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-300 backdrop-blur-md">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        ) : (
          <>
            {/* Top summary cards */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-semibold text-white">
                Key Metrics
              </h2>
              {!stats ? (
                <div className="glass-strong rounded-3xl border border-white/10 p-8 text-center text-sm text-white/50">
                  No workout sessions logged yet. Start a session from the workouts section to track your gains.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="glass-strong rounded-2xl border border-white/10 p-5 shadow-xl backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Total sessions
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-volt-300 tabular-nums">
                      {stats.totalSessions}
                    </p>
                  </div>

                  <div className="glass-strong rounded-2xl border border-white/10 p-5 shadow-xl backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Total sets logged
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-white tabular-nums">
                      {stats.totalSets}
                    </p>
                  </div>

                  <div className="glass-strong rounded-2xl border border-white/10 p-5 shadow-xl backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      First session
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold text-white">
                      {formatDate(stats.first.date)}
                    </p>
                  </div>

                  <div className="glass-strong rounded-2xl border border-white/10 p-5 shadow-xl backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Last session
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold text-volt-300">
                      {formatDate(stats.last.date)}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Visual Charts */}
            <section className="space-y-3">
              <ChartsCard
                sessionsData={chartData}
                progressData={chartData}
                heatmapData={heatmapData}
              />
            </section>

            {/* Sessions list */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-white">
                  Session History
                </h2>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                  {sessions.length} recorded
                </span>
              </div>

              {!sessions.length ? (
                <div className="glass-strong rounded-2xl border border-white/10 p-8 text-center text-sm text-white/50">
                  No sessions recorded yet.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {sessions
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((s) => {
                      const name = workoutNameById[s.workoutId] || "Custom Workout"
                      const sets = s.exercises?.length ?? 0
                      return (
                        <div
                          key={s._id}
                          className="glass-strong card-hover group flex items-center justify-between rounded-2xl border border-white/8 p-4 text-sm backdrop-blur-xl transition-all duration-300 hover:border-volt-300/30"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-display text-base font-semibold text-white transition-colors group-hover:text-volt-300">
                              {name}
                            </p>
                            <p className="mt-1 text-xs text-white/50">
                              {formatDate(s.date)} • {sets} {sets === 1 ? "exercise" : "exercises"} completed
                            </p>
                          </div>
                          <span className="rounded-full border border-volt-300/20 bg-volt-300/10 px-3 py-1 text-xs font-semibold text-volt-300">
                            Completed
                          </span>
                        </div>
                      )
                    })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}