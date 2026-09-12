"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import WorkoutCard from "@/components/WorkoutCard"
import { apiFetch } from "@/lib/api"
import type { Workout } from "@/lib/types"
import { Icon } from "@/components/ui"

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
    <div className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_80%)]" />
        <div className="animate-orb absolute top-20 right-10 h-96 w-96 rounded-full bg-volt-300/10 blur-[100px]" />
        <div className="animate-orb absolute top-80 left-10 h-80 w-80 rounded-full bg-iris-500/10 blur-[90px]" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-white/8 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
              Training Library
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your <span className="text-gradient">Workouts</span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Create, organize, and manage your personalized exercise routines.
            </p>
          </div>

          <Link
            href="/workouts/create"
            className="inline-flex items-center gap-2 rounded-full bg-volt-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-volt-200 hover:shadow-[0_18px_44px_-12px_rgba(214,255,102,0.75)] active:translate-y-0"
          >
            <span>+ Create workout</span>
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 backdrop-blur-md">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">
              All routines
            </h2>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
              <span className="font-semibold text-volt-300">{workouts.length}</span>{" "}
              {workouts.length === 1 ? "workout" : "workouts"} total
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="glass-strong h-36 animate-pulse rounded-2xl border border-white/8 p-5"
                />
              ))}
            </div>
          ) : workouts.length === 0 ? (
            <div className="glass-strong flex flex-col items-center justify-center rounded-3xl border border-white/10 p-12 text-center backdrop-blur-xl">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-volt-300/20 bg-volt-300/10 text-volt-300 shadow-[0_0_24px_-4px_rgba(214,255,102,0.4)]">
                <Icon name="dumbbell" className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                No workouts created yet
              </h3>
              <p className="mt-1.5 max-w-sm text-xs text-white/50">
                You haven&apos;t set up any workout routines. Start building your first split now.
              </p>
              <Link
                href="/workouts/create"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-volt-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all hover:bg-volt-200"
              >
                Create your first workout
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {workouts.map((w) => (
                <WorkoutCard key={w._id ?? `${w.userId}-${w.name}`} workout={w} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}