'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sync = () => setIsLoggedIn(Boolean(localStorage.getItem('token')))
    sync()

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') sync()
    }
    const onAuthChange = () => sync()

    window.addEventListener('storage', onStorage)
    window.addEventListener('auth-change', onAuthChange as any)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('auth-change', onAuthChange as any)
    }
  }, [])

  async function handleLogout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' })
    } catch {
      // best-effort; local logout still proceeds
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      setIsLoggedIn(false)
      setMenuOpen(false)
      router.push('/login')
      router.refresh()
    }
  }
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-slate-900">
          Workout Web
        </Link>

        <div className="flex items-center gap-1 text-sm">
          <div className="hidden items-center gap-1 sm:flex">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              href="/workouts"
              className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Workouts
            </Link>
            <Link
              href="/exercises"
              className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Exercises
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="relative ml-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-xs font-medium text-white hover:bg-sky-700"
              >
                U
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-10 w-40 rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-lg">
                  <Link
                    href="/dashboard/profile"
                    className="block px-3 py-2 text-slate-700 hover:bg-slate-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/my-progress"
                    className="block px-3 py-2 text-slate-700 hover:bg-slate-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    My progress
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 block w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-sky-600 px-3 py-2 font-medium text-white hover:bg-sky-700"
            >
              Sign up
            </Link>
            </div>
          )}
         
        </div>
      </nav>
    </header>
  )
}