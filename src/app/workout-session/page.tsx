"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import type { Workout } from "@/lib/types"
import { Icon } from "@/components/ui"
import Link from "next/link"

export default function WorkoutSessionPage() {
  const router = useRouter()
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null)

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setError(null)
        setLoading(true)
        const data = await apiFetch<Workout[]>("/workout")
        const list = Array.isArray(data) ? data : []
        setWorkouts(list)
        if (list.length > 0) {
          setSelectedWorkoutId(list[0]._id ?? null)
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load workouts")
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  const selectedWorkout = useMemo(() => {
    return workouts.find((w) => w._id === selectedWorkoutId) ?? null
  }, [workouts, selectedWorkoutId])

  function startSession() {
    if (!selectedWorkoutId) return
    router.push(`/workout-session/${selectedWorkoutId}`)
  }

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_80%)]" />
        <div className="animate-orb absolute top-20 right-10 h-96 w-96 rounded-full bg-volt-300/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
              Live Session
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start a <span className="text-gradient">Workout Session</span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Select your scheduled routine, hit start, and record your sets and loads as you train.
            </p>
          </div>

          <button
            type="button"
            onClick={startSession}
            disabled={!selectedWorkoutId}
            className="inline-flex items-center gap-2 rounded-full bg-volt-300 px-6 py-2.5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all hover:-translate-y-0.5 hover:bg-volt-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="play" className="h-4 w-4" />
            <span>Launch session</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 backdrop-blur-md">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="glass-strong h-64 animate-pulse rounded-3xl border border-white/8 p-6" />
            <div className="glass-strong h-64 animate-pulse rounded-3xl border border-white/8 p-6" />
          </div>
        ) : workouts.length === 0 ? (
          <div className="glass-strong rounded-3xl border border-white/10 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-volt-300/20 bg-volt-300/10 text-volt-300">
              <Icon name="dumbbell" className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">
              No workouts found
            </h3>
            <p className="mt-1 text-sm text-white/50">
              You need at least one workout routine created before starting a session.
            </p>
            <Link
              href="/workouts/create"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-volt-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] hover:bg-volt-200"
            >
              Create a workout first
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-strong rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Available Routines
              </p>
              <div className="mt-4 space-y-2.5">
                {workouts.map((w) => {
                  const id = w._id ?? ""
                  const checked = id === selectedWorkoutId
                  return (
                    <label
                      key={id || `${w.userId}-${w.name}`}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                        checked
                          ? "border-volt-300/60 bg-volt-300/10 shadow-[0_0_24px_-6px_rgba(214,255,102,0.35)]"
                          : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="workout"
                        className="mt-1 h-4 w-4 accent-volt-400 cursor-pointer"
                        checked={checked}
                        onChange={() => setSelectedWorkoutId(id)}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-semibold text-white">
                          {w.name}
                        </span>
                        <span className="mt-1 block text-xs text-white/60">
                          {(w.exercises?.length ?? 0) + " exercises"}
                          {w.description ? ` • ${w.description}` : ""}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="glass-strong flex flex-col justify-between rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-volt-300">
                  Selected Routine
                </p>
                <div className="mt-4">
                  {selectedWorkout ? (
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-white">
                          {selectedWorkout.name}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                          {selectedWorkout.description || "No description provided for this workout."}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/60">Exercises in routine</span>
                          <span className="rounded-full border border-volt-300/30 bg-volt-300/10 px-2.5 py-0.5 font-semibold text-volt-300">
                            {selectedWorkout.exercises?.length ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-white/50">
                      Pick a workout on the left to review before launching.
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={startSession}
                disabled={!selectedWorkoutId}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-volt-300 px-5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all hover:-translate-y-0.5 hover:bg-volt-200 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon name="play" className="h-4 w-4" />
                <span>Start session now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}