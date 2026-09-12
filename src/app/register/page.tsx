"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { apiFetch } from "@/lib/api"
import { Icon } from "@/components/ui"

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !trimmedEmail || !password) {
      setError("Name, email, and password are required.")
      return
    }

    const ageNum =
      age.trim().length === 0 ? undefined : Number.parseInt(age.trim(), 10)
    if (ageNum !== undefined && (Number.isNaN(ageNum) || ageNum < 1)) {
      setError("Age must be a positive number.")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const data = await apiFetch<{
        token?: string
        user?: { id?: string; _id?: string; email?: string; name?: string }
        message?: string
      }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password,
          age: ageNum,
        }),
      })

      if (!data?.token) {
        setError(data?.message || "Registration failed. Please try again.")
        return
      }

      localStorage.setItem("token", data.token)
      window.dispatchEvent(new Event("auth-change"))
      const userId = data.user?.id || data.user?._id
      if (userId) localStorage.setItem("userId", userId)

      router.push("/workouts")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 pt-28 pb-16 sm:px-6">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_75%)]" />
        <div className="animate-orb absolute top-1/4 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-volt-300/15 blur-[90px]" />
        <div className="animate-orb absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-aqua-400/15 blur-[90px]" style={{ animationDelay: "-7s" }} />
      </div>

      <div className="glass-strong relative z-10 w-full max-w-md rounded-3xl border border-white/10 p-7 shadow-2xl backdrop-blur-2xl sm:p-9">
        <div className="mb-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-volt-300 uppercase">
            Get Started
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Create your <span className="text-gradient">account</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sign up to build custom workouts, track every rep, and level up your consistency.
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 backdrop-blur-md">
            <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              Full Name *
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              autoComplete="name"
              className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all duration-200 outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              Email *
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all duration-200 outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              Password *
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all duration-200 outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              Age (Optional)
            </span>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              inputMode="numeric"
              placeholder="e.g. 26"
              className="glass h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-white/35 transition-all duration-200 outline-none focus:border-volt-300/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-volt-300/20"
            />
          </label>

          <button
            disabled={submitting}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-volt-300 px-5 text-sm font-semibold text-ink-950 shadow-[0_12px_34px_-12px_rgba(214,255,102,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-volt-200 hover:shadow-[0_18px_44px_-12px_rgba(214,255,102,0.75)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account…" : "Create account"}
            <Icon name="arrow" className="h-4 w-4" />
          </button>

          <p className="pt-2 text-center text-xs text-white/50">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-volt-300 transition-colors hover:text-volt-200 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}