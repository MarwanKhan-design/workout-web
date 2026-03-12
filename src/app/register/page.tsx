"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { apiFetch } from "@/lib/api"

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
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create account
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Sign up to start creating workouts.
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
            <span className="text-xs font-medium text-slate-700">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

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
              placeholder="Create a password"
              autoComplete="new-password"
              className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-medium text-slate-700">Age</span>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              inputMode="numeric"
              placeholder="Optional"
              className="h-10 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          <button
            disabled={submitting}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account…" : "Sign up"}
          </button>

          <p className="mt-2 text-center text-xs text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-sky-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}