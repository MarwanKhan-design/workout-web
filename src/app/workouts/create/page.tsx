"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import type { Exercise } from "@/lib/types"

export default function CreateWorkout() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setError(null)
        setLoading(true)

        const me = await apiFetch<{ user?: { _id?: string } }>("/auth/me")
        const id = me?.user?._id
        setUserId(id ?? null)

        const ex = await apiFetch<Exercise[]>("/exercise")
        setExercises(Array.isArray(ex) ? ex : [])
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  async function createWorkout(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    const trimmedDescription = description.trim()

    if (!trimmedName) {
      setError("Workout name is required.")
      return
    }
    if (selected.length === 0) {
      setError("Select at least one exercise.")
      return
    }
    if (!userId) {
      setError("You must be logged in to create a workout.")
      return
    }

    try {
      setSubmitting(true)
      const created = await apiFetch("/workout", {
        method: "POST",
        body: JSON.stringify({
          userId,
          name: trimmedName,
          description: trimmedDescription,
          exercises: selected,
        }),
      })

      const msg = (created as any)?.message
      if (msg && typeof msg === "string" && (created as any)?._id == null) {
        setError(msg)
        return
      }

      router.push("/workouts")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create workout")
    } finally {
      setSubmitting(false)
    }
  }

  function toggleExercise(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((e) => e !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create workout
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Pick exercises, add a name, and save.
          </p>
        </div>
        <Link href="/workouts" className="text-sm text-slate-600 hover:text-slate-900">
          Back to workouts
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <form
        onSubmit={createWorkout}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">Details</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3">
              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-700">Name *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. Push Day"
                  required
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-700">
                  Description
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Optional notes…"
                />
              </label>

              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <span className="text-slate-700">Selected exercises</span>
                <span className="font-medium text-slate-900">{selected.length}</span>
              </div>

              <button
                type="submit"
                disabled={loading || submitting}
                className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating…" : "Create workout"}
              </button>

              {!userId && !loading && (
                <p className="text-xs text-slate-500">
                  Note: you need to be logged in (token in localStorage) to create a workout.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Choose exercises *
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {loading ? (
              <div className="text-sm text-slate-600">Loading exercises…</div>
            ) : exercises.length === 0 ? (
              <div className="text-sm text-slate-600">
                No exercises found. Create some first in the Exercises page.
              </div>
            ) : (
              <div className="max-h-[420px] space-y-2 overflow-auto pr-1">
                {exercises.map((ex) => {
                  const checked = selected.includes(ex._id)
                  return (
                    <label
                      key={ex._id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleExercise(ex._id)}
                        className="mt-1 h-4 w-4 accent-sky-600"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-900">
                          {ex.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-600">
                          {ex.muscleGroup}
                          {ex.equipment ? ` • ${ex.equipment}` : ""}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </form>
    </div>
  )
}