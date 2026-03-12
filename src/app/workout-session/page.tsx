"use client"

import { apiFetch } from "@/lib/api"
import type { Workout } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export default function WorkoutSessionIndexPage() {
  const router = useRouter()
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setError(null)
        setLoading(true)
        const data = await apiFetch<Workout[]>("/workout")
        const list = Array.isArray(data) ? data : []
        setWorkouts(list)
        setSelectedWorkoutId(list[0]?._id ?? "")
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load workouts")
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  const selectedWorkout = useMemo(
    () => workouts.find((w) => w._id === selectedWorkoutId),
    [workouts, selectedWorkoutId]
  )

  function startSession() {
    if (!selectedWorkoutId) return
    router.push(`/workout-session/${selectedWorkoutId}`)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Workout session
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Select a workout, then start a session.
          </p>
        </div>

        <button
          type="button"
          onClick={startSession}
          disabled={!selectedWorkoutId}
          className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Start session
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Loading workouts…
        </div>
      ) : workouts.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          No workouts found. Create one from the Workouts page.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Workouts
            </p>
            <div className="mt-3 space-y-2">
              {workouts.map((w) => {
                const id = w._id ?? ""
                const checked = id === selectedWorkoutId
                return (
                  <label
                    key={id || `${w.userId}-${w.name}`}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 transition ${
                      checked
                        ? "border-sky-200 bg-sky-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="workout"
                      className="mt-1 h-4 w-4 accent-sky-600"
                      checked={checked}
                      onChange={() => setSelectedWorkoutId(id)}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-900">
                        {w.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-600">
                        {(w.exercises?.length ?? 0) + " exercises"}
                        {w.description ? ` • ${w.description}` : ""}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Selected
            </p>
            <div className="mt-3">
              {selectedWorkout ? (
                <div className="space-y-2">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      {selectedWorkout.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedWorkout.description || "No description"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                    <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5">
                      Exercises:{" "}
                      <span className="ml-1 font-medium text-slate-900">
                        {selectedWorkout.exercises?.length ?? 0}
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={startSession}
                    className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700"
                  >
                    Start session
                  </button>
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  Pick a workout to see details.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}