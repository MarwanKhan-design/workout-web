"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      setError("Email and password are required.")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const data = await apiFetch<{
        token?: string
        user?: { id?: string; _id?: string; email?: string; name?: string }
        message?: string
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: trimmedEmail, password }),
      })

      if (!data?.token) {
        setError(data?.message || "Login failed. Please check your credentials.")
        return
      }

      localStorage.setItem("token", data.token)
      window.dispatchEvent(new Event("auth-change"))
      const userId = data.user?.id || data.user?._id
      if (userId) localStorage.setItem("userId", userId)

      router.push("/workouts")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Login
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Sign in to create workouts and manage exercises.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs font-medium text-slate-700">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-medium text-slate-700">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          <button
            disabled={submitting}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Login"}
          </button>

          <p className="mt-2 text-center text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-sky-700 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}