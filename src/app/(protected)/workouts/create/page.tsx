"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import type { Exercise } from "@/lib/types"
import { Icon } from "@/components/ui"

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
        const localUserId = localStorage.getItem('userId')
        const me = await apiFetch<{ user?: { _id?: string } }>("/auth/me")
        const id = me?.user?._id
        setUserId(localUserId ?? id ?? null)

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
    <div className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_80%)]" />
        <div className="animate-orb absolute top-24 left-1/3 h-96 w-96 rounded-full bg-volt-300/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
              Workout Builder
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create a <span className="text-gradient">Workout</span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Pick target exercises, assign a routine title, and assemble your workout split.
            </p>
          </div>
          <Link
            href="/workouts"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            Back to workouts
          </Link>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 backdrop-blur-md">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={createWorkout}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <section className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-white">
              Details
            </h2>
            <div className="glass-strong rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl space-y-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Workout Name *
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="e.g. Push Power A"
                  required
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Description
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="glass w-full rounded-xl border border-white/12 bg-white/[0.04] p-4 text-sm text-white placeholder-white/35 transition-all outline-none resize-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
                  placeholder="Target muscle groups, intensity guidelines, coaching notes…"
                />
              </label>

              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm">
                <span className="text-white/70">Selected exercises</span>
                <span className="rounded-full border border-volt-300/30 bg-volt-300/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-volt-300">
                  {selected.length}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || submitting}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-volt-300 px-5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all hover:-translate-y-0.5 hover:bg-volt-200 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Saving workout…" : "Save workout"}
                <Icon name="arrow" className="h-4 w-4" />
              </button>

              {!userId && !loading && (
                <p className="text-center text-xs text-rose-300">
                  You must be logged in to save a workout.
                </p>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-white">
              Choose exercises *
            </h2>
            <div className="glass-strong rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
              {loading ? (
                <div className="py-8 text-center text-sm text-white/50 animate-pulse">
                  Loading available exercises…
                </div>
              ) : exercises.length === 0 ? (
                <div className="py-8 text-center text-sm text-white/50">
                  No exercises found.{" "}
                  <Link href="/exercises" className="text-volt-300 hover:underline">
                    Create some first here
                  </Link>.
                </div>
              ) : (
                <div className="max-h-[440px] space-y-2.5 overflow-y-auto pr-1.5 scroll-thin">
                  {exercises.map((ex) => {
                    const checked = selected.includes(ex._id)
                    return (
                      <label
                        key={ex._id}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-all duration-200 ${
                          checked
                            ? "border-volt-300/50 bg-volt-300/10 shadow-[0_0_20px_-6px_rgba(214,255,102,0.3)]"
                            : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleExercise(ex._id)}
                          className="mt-1 h-4 w-4 accent-volt-400 rounded cursor-pointer"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-sm font-semibold text-white">
                            {ex.name}
                          </span>
                          <span className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-white/60">
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/80">
                              {ex.muscleGroup}
                            </span>
                            {ex.equipment && (
                              <span className="text-white/40">
                                • {ex.equipment}
                              </span>
                            )}
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
    </div>
  )
}