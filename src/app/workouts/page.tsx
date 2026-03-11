"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import WorkoutCard from "@/components/WorkoutCard"
import { apiFetch } from "@/lib/api"
import type { Workout } from "@/lib/types"

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setError(null)
        setLoading(true)
        const data = await apiFetch<Workout[]>("/workout")
        setWorkouts(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load workouts")
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Workouts
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Create workouts and manage your exercise lists.
          </p>
        </div>

        <Link
          href="/workouts/create"
          className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700"
        >
          Create workout
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Workout list
          </h2>
          <div className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">{workouts.length}</span>{" "}
            total
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
            Loading workouts…
          </div>
        ) : workouts.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
            No workouts yet. Click “Create workout” to add one.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {workouts.map((w) => (
              <WorkoutCard key={w._id ?? `${w.userId}-${w.name}`} workout={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}