"use client"

import { apiFetch } from "@/lib/api"
import type { Exercise, Workout } from "@/lib/types"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

type ExerciseInputs = {
  reps: string
  weight: string
  duration: string
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
            initial[exId] = { reps: "", weight: "", duration: "" }
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

  function updateInput(exerciseId: string, field: keyof ExerciseInputs, value: string) {
    setInputs((prev) => ({
      ...prev,
      [exerciseId]: {
        reps: prev[exerciseId]?.reps ?? "",
        weight: prev[exerciseId]?.weight ?? "",
        duration: prev[exerciseId]?.duration ?? "",
        [field]: value,
      },
    }))
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
      const raw = inputs[exId] || { reps: "", weight: "", duration: "" }
      const reps = raw.reps.trim()
      const weight = raw.weight.trim()
      const duration = raw.duration.trim()

      return {
        exercise: exId,
        reps: reps ? Number(reps) : undefined,
        weight: weight ? Number(weight) : undefined,
        duration: duration ? Number(duration) : undefined,
      }
    })

    const nonEmpty = sessionExercises.some(
      (e) => e.reps !== undefined || e.weight !== undefined || e.duration !== undefined
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

      setSuccess("Workout session saved successfully.")
      // Optionally redirect back to session list or workouts
      setTimeout(() => {
        router.push("/workout-session")
      }, 800)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save workout session")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Loading workout...
        </div>
      ) : !workout ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-sm">
          Workout not found.
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Session for: {workout.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Log your sets for each exercise in this workout.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              {workoutExercises.length === 0 ? (
                <p className="text-sm text-slate-600">
                  This workout has no exercises attached yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {workoutExercises.map((ex) => {
                    const value = inputs[ex._id] || {
                      reps: "",
                      weight: "",
                      duration: "",
                    }
                    return (
                      <div
                        key={ex._id}
                        className="rounded-lg border border-slate-200 px-3 py-3"
                      >
                        <div className="mb-2 flex items-baseline justify-between gap-3">
                          <div>
                            <h2 className="text-sm font-semibold text-slate-900">
                              {ex.name}
                            </h2>
                            <p className="text-xs text-slate-600">
                              {ex.muscleGroup}
                              {ex.equipment ? ` • ${ex.equipment}` : ""}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          <label className="grid gap-1 text-xs text-slate-700">
                            Reps
                            <input
                              value={value.reps}
                              onChange={(e) =>
                                updateInput(ex._id, "reps", e.target.value)
                              }
                              inputMode="numeric"
                              className="h-9 rounded-md border border-slate-300 px-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                              placeholder="e.g. 10"
                            />
                          </label>

                          <label className="grid gap-1 text-xs text-slate-700">
                            Weight (kg)
                            <input
                              value={value.weight}
                              onChange={(e) =>
                                updateInput(ex._id, "weight", e.target.value)
                              }
                              inputMode="decimal"
                              className="h-9 rounded-md border border-slate-300 px-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                              placeholder="e.g. 60"
                            />
                          </label>

                          <label className="grid gap-1 text-xs text-slate-700">
                            Duration (sec)
                            <input
                              value={value.duration}
                              onChange={(e) =>
                                updateInput(ex._id, "duration", e.target.value)
                              }
                              inputMode="numeric"
                              className="h-9 rounded-md border border-slate-300 px-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                              placeholder="e.g. 45"
                            />
                          </label>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || workoutExercises.length === 0}
              className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving session…" : "Save session"}
            </button>
          </form>
        </>
      )}
    </div>
  )
}