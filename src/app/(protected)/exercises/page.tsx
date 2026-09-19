"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import { Exercise } from "@/lib/types"
import ExerciseCard from "@/components/ExerciseCard"
import { Icon } from "@/components/ui"

export default function ExercisesPage() {
  const router = useRouter()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [authorized, setAuthorized] = useState(false)
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
        const me = await apiFetch<{ user?: { role?: string } }>("/auth/me")
        if (me.user?.role !== "admin") {
          router.replace("/workouts")
          return
        }

        setAuthorized(true)
        const data = await apiFetch<Exercise[]>("/exercise")
        setExercises(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load exercises")
      } finally {
        setLoading(false)
      }
    }

    loadExercises()
  }, [router])

  async function onCreateExercise(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const created = await apiFetch<Exercise>("/exercise", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category.trim() || undefined,
          muscleGroup: form.muscleGroup.trim(),
          equipment: form.equipment.trim() || undefined,
          description: form.description.trim() || undefined,
        }),
      })

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

  if (!authorized) {
    return null
  }

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_80%)]" />
        <div className="animate-orb absolute top-20 left-10 h-96 w-96 rounded-full bg-volt-300/10 blur-[100px]" />
        <div className="animate-orb absolute top-96 right-10 h-80 w-80 rounded-full bg-aqua-400/10 blur-[90px]" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
              Exercise Library
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Exercise <span className="text-gradient">Directory</span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Manage the exercise library used when members create workouts.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/70">
            <span className="font-semibold text-volt-300">{exercises.length}</span>{" "}
            exercises in database
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 backdrop-blur-md">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-white">
                Available Exercises
              </h2>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="glass-strong h-28 animate-pulse rounded-2xl border border-white/8 p-5"
                  />
                ))}
              </div>
            ) : exercises.length === 0 ? (
              <div className="glass-strong rounded-2xl border border-white/10 p-8 text-center text-sm text-white/50">
                No exercises registered yet. Use the form on the right to add one.
              </div>
            ) : (
              <div className="space-y-3">
                {exercises.map((ex) => (
                  <ExerciseCard key={ex._id} exercise={ex} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-white">
              Create an exercise
            </h2>

            <form
              onSubmit={onCreateExercise}
              className="glass-strong rounded-3xl border border-white/10 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4"
            >
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Exercise Name *
                </span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="e.g. Bulgarian Split Squat"
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                    Category
                  </span>
                  <input
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                    className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                    placeholder="Strength, Mobility, HIIT"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                    Muscle Group *
                  </span>
                  <input
                    value={form.muscleGroup}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, muscleGroup: e.target.value }))
                    }
                    required
                    className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                    placeholder="Quads, Chest, Back"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Equipment
                </span>
                <input
                  value={form.equipment}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, equipment: e.target.value }))
                  }
                  className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="Barbell, Dumbbells, Bodyweight"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Description / Coaching Cues
                </span>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={4}
                  className="glass w-full rounded-xl border border-white/12 bg-white/[0.04] p-4 text-sm text-white placeholder-white/35 transition-all outline-none resize-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="Key form cues, range of motion notes, setup reminders…"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-volt-300 px-5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all hover:-translate-y-0.5 hover:bg-volt-200 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Creating exercise…" : "Create exercise"}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
