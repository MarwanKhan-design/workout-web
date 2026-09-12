"use client"

import { apiFetch } from "@/lib/api"
import type { Exercise, Workout } from "@/lib/types"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Icon } from "@/components/ui"
import Link from "next/link"

type SetInput = {
  reps: string
  weight: string
  duration: string
}

type ExerciseInputs = {
  sets: SetInput[]
}

export default function WorkoutSessionDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const workoutId = params.id

  const [workout, setWorkout] = useState<Workout | null>(null)
  const [allExercises, setAllExercises] = useState<Exercise[]>([])
  const [inputs, setInputs] = useState<Record<string, ExerciseInputs>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setError(null)
        setSuccess(null)
        setLoading(true)

        const w = await apiFetch<Workout>(`/workout/${workoutId}`)
        setWorkout(w)

        const ex = await apiFetch<Exercise[]>("/exercise")
        setAllExercises(Array.isArray(ex) ? ex : [])

        // Initialize empty inputs for each exercise in the workout
        if (Array.isArray(w.exercises)) {
          const initial: Record<string, ExerciseInputs> = {}
          for (const exId of w.exercises) {
            initial[exId] = {
              sets: [
                {
                  reps: "",
                  weight: "",
                  duration: "",
                },
              ],
            }
          }
          setInputs(initial)
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load workout")
      } finally {
        setLoading(false)
      }
    }

    if (workoutId) {
      load()
    }
  }, [workoutId])

  const workoutExercises: Exercise[] = useMemo(() => {
    if (!workout?.exercises) return []
    const ids = new Set(workout.exercises)
    return allExercises.filter((e) => ids.has(e._id))
  }, [workout, allExercises])

  function updateInput(
    exerciseId: string,
    setIndex: number,
    field: keyof SetInput,
    value: string
  ) {
    setInputs((prev) => {
      const exercise = prev[exerciseId]
      if (!exercise) return prev

      const updatedSets = [...exercise.sets]
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        [field]: value,
      }

      return {
        ...prev,
        [exerciseId]: {
          ...exercise,
          sets: updatedSets,
        },
      }
    })
  }

  function addSet(exerciseId: string) {
    setInputs((prev) => {
      const exercise = prev[exerciseId]
      if (!exercise) return prev

      return {
        ...prev,
        [exerciseId]: {
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              reps: "",
              weight: "",
              duration: "",
            },
          ],
        },
      }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!workout) return

    setError(null)
    setSuccess(null)

    const userId = localStorage.getItem("userId")
    if (!userId) {
      setError("You must be logged in to save a session.")
      return
    }

    const sessionExercises = workout.exercises.map((exId) => {
      const raw = inputs[exId]
      return {
        exercise: exId,
        sets:
          raw?.sets
            .filter(
              (set) =>
                set.reps.trim() ||
                set.weight.trim() ||
                set.duration.trim()
            )
            .map((set) => ({
              reps: set.reps ? Number(set.reps) : undefined,
              weight: set.weight ? Number(set.weight) : undefined,
              duration: set.duration
                ? Number(set.duration)
                : undefined,
            })) || [],
      }
    })

    const nonEmpty = sessionExercises.some(
      (exercise) => exercise.sets.length > 0
    )
    if (!nonEmpty) {
      setError("Enter at least one value (reps, weight, or duration) for any exercise.")
      return
    }

    try {
      setSubmitting(true)
      await apiFetch("/workout-session", {
        method: "POST",
        body: JSON.stringify({
          userId,
          workoutId,
          date: new Date().toISOString(),
          exercises: sessionExercises,
        }),
      })

      setSuccess("Workout session logged successfully.")
      setTimeout(() => {
        router.push("/workout-session")
      }, 900)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save workout session")
    } finally {
      setSubmitting(false)
    }
  }

  const renderSets = (value: ExerciseInputs, ex: Exercise) => {
    return (
      <div className="mt-4 space-y-3">
        {value.sets.map((set, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-200 hover:border-white/15"
          >
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-[0.16em] text-volt-300">
                Set {index + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className="block space-y-1">
                <span className="text-xs font-medium text-white/60">Reps</span>
                <input
                  value={set.reps}
                  onChange={(e) =>
                    updateInput(ex._id, index, "reps", e.target.value)
                  }
                  inputMode="numeric"
                  className="glass h-10 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="e.g. 10"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs font-medium text-white/60">Weight (kg)</span>
                <input
                  value={set.weight}
                  onChange={(e) =>
                    updateInput(ex._id, index, "weight", e.target.value)
                  }
                  inputMode="decimal"
                  className="glass h-10 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="e.g. 60"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs font-medium text-white/60">Duration (sec)</span>
                <input
                  value={set.duration}
                  onChange={(e) =>
                    updateInput(ex._id, index, "duration", e.target.value)
                  }
                  inputMode="numeric"
                  className="glass h-10 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="e.g. 45"
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addSet(ex._id)}
          className="inline-flex items-center gap-1.5 rounded-full border border-volt-300/30 bg-volt-300/10 px-4 py-1.5 text-xs font-semibold text-volt-300 transition-all hover:bg-volt-300/20 active:translate-y-0"
        >
          <span>+ Add Set</span>
        </button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_80%)]" />
        <div className="animate-orb absolute top-20 right-10 h-96 w-96 rounded-full bg-volt-300/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        {loading ? (
          <div className="glass-strong h-64 animate-pulse rounded-3xl border border-white/8 p-8" />
        ) : !workout ? (
          <div className="glass-strong rounded-3xl border border-rose-500/30 bg-rose-500/10 p-10 text-center text-rose-300">
            Workout routine not found.
            <div className="mt-4">
              <Link href="/workout-session" className="text-volt-300 underline">
                Return to sessions
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
                  Active Logger
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Session: <span className="text-gradient">{workout.name}</span>
                </h1>
                <p className="mt-2 text-sm text-white/60">
                  Log your sets, weight load, reps, and durations as you complete them.
                </p>
              </div>
              <Link
                href="/workout-session"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Icon name="arrow" className="h-4 w-4 rotate-180" />
                Change workout
              </Link>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 backdrop-blur-md">
                <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-volt-300/30 bg-volt-300/10 px-4 py-3 text-sm text-volt-300 backdrop-blur-md">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-volt-300" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {workoutExercises.length === 0 ? (
                <div className="glass-strong rounded-3xl border border-white/10 p-8 text-center text-sm text-white/60">
                  This workout has no exercises attached yet.
                </div>
              ) : (
                workoutExercises.map((ex) => {
                  const value = inputs[ex._id] || {
                    sets: [{ reps: "", weight: "", duration: "" }],
                  }
                  return (
                    <div
                      key={ex._id}
                      className="glass-strong rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-4">
                        <div>
                          <h2 className="font-display text-xl font-semibold text-white">
                            {ex.name}
                          </h2>
                          <p className="mt-1 text-xs text-white/50">
                            {ex.category || "General"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-xs font-semibold text-volt-300 uppercase">
                            {ex.muscleGroup}
                          </span>
                          {ex.equipment && (
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                              {ex.equipment}
                            </span>
                          )}
                        </div>
                      </div>

                      {renderSets(value, ex)}
                    </div>
                  )
                })
              )}

              <div className="flex items-center justify-end gap-4 pt-2">
                <Link
                  href="/workout-session"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 hover:text-white"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting || workoutExercises.length === 0}
                  className="inline-flex items-center gap-2 rounded-full bg-volt-300 px-7 py-3 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all hover:-translate-y-0.5 hover:bg-volt-200 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Recording session…" : "Complete & save session"}
                  <Icon name="check" className="h-4 w-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}