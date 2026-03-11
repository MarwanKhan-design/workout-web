"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import { Exercise } from "@/lib/types"
import ExerciseCard from "@/components/ExerciseCard"

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    category: "",
    muscleGroup: "",
    equipment: "",
    description: "",
  })

  useEffect(() => {
    async function loadExercises() {
      try {
        setError(null)
        setLoading(true)
        const data = await apiFetch<Exercise[]>("/exercise")
        setExercises(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load exercises")
      } finally {
        setLoading(false)
      }
    }

    loadExercises()
  }, [])

  async function onCreateExercise(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const created = await apiFetch<Exercise>("/exercise", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category.trim(),
          muscleGroup: form.muscleGroup.trim(),
          equipment: form.equipment.trim(),
          description: form.description.trim(),
        }),
      })

      if (!created || typeof created !== "object" || !("_id" in created)) {
        const msg =
          (created as any)?.message ||
          "Failed to create exercise. Please check the form and try again."
        setError(msg)
        return
      }

      setExercises((prev) => [created, ...prev])
      setForm({
        name: "",
        category: "",
        muscleGroup: "",
        equipment: "",
        description: "",
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create exercise")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Exercises
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Browse exercises on the left, or create a new one on the right.
          </p>
        </div>
        <div className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{exercises.length}</span>{" "}
          total
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Exercise list
          </h2>

          {loading ? (
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
              Loading exercises…
            </div>
          ) : exercises.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
              No exercises yet. Create your first one.
            </div>
          ) : (
            <div className="grid gap-3">
              {exercises.map((ex) => (
                <ExerciseCard key={ex._id} exercise={ex} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Create an exercise
          </h2>

          <form
            onSubmit={onCreateExercise}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="grid gap-3">
              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-700">Name *</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. Barbell Squat"
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-xs font-medium text-slate-700">
                    Category
                  </span>
                  <input
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                    className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Strength"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs font-medium text-slate-700">
                    Muscle group
                  </span>
                  <input
                    value={form.muscleGroup}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, muscleGroup: e.target.value }))
                    }
                    className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Legs"
                  />
                </label>
              </div>

              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-700">
                  Equipment
                </span>
                <input
                  value={form.equipment}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, equipment: e.target.value }))
                  }
                  className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Barbell"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-medium text-slate-700">
                  Description
                </span>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={4}
                  className="resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Short notes or cues…"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating…" : "Create exercise"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}