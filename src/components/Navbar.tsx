"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { Button, Icon } from "./ui";
import { apiFetch } from "@/lib/api";

const marketingLinks = [
  { label: "Features", href: "/#features" },
  { label: "The app", href: "/#showcase" },
  { label: "Results", href: "/#testimonials" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const appLinks = [
  { label: "Workouts", href: "/workouts" },
  { label: "Exercises", href: "/exercises" },
  { label: "Session", href: "/workout-session" },
  { label: "My Progress", href: "/dashboard/my-progress" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Workout Web home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[0.7rem] bg-gradient-to-br from-volt-300 via-volt-400 to-aqua-400 shadow-[0_8px_24px_-10px_rgba(214,255,102,0.9)] transition-transform duration-500 group-hover:rotate-[8deg]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-ink-950"
          aria-hidden="true"
        >
          <path
            d="M6 7v10M3.2 9.4v5.2M18 7v10M20.8 9.4v5.2M6 12h12"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight text-white">
        Workout<span className="text-volt-300">Web</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const isHome = pathname === "/";
  const navLinks = isHome ? marketingLinks : appLinks;

  useEffect(() => {
    const syncAuth = async () => {
      try {
        await apiFetch("/auth/me");
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };

    syncAuth();

    const onAuthChange = () => syncAuth();

    window.addEventListener("auth-change", onAuthChange);

    return () => {
      window.removeEventListener("auth-change", onAuthChange);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleLogout() {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // best-effort
    } finally {
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setUserDropdown(false);
      setOpen(false);
      window.dispatchEvent(new Event("auth-change"));
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-500 sm:px-6",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between gap-6 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled || !isHome
              ? "glass-strong shadow-[0_18px_50px_-28px_rgba(0,0,0,0.95)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-[0.88rem] font-medium transition-colors duration-300",
                    active
                      ? "text-volt-300 font-semibold"
                      : "text-white/65 hover:text-white",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-volt-300 to-transparent transition-transform duration-300",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdown((v) => !v)}
                  className="flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1.5 pl-2 pr-3 text-sm font-medium text-white transition-colors hover:border-volt-300/40 hover:bg-white/10"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-volt-300 to-aqua-400 font-semibold text-xs text-ink-950 shadow-[0_0_12px_-2px_rgba(214,255,102,0.7)]">
                    U
                  </span>
                  <span>Account</span>
                  <Icon
                    name="chevron"
                    className={cn(
                      "h-3.5 w-3.5 text-white/50 transition-transform duration-200",
                      userDropdown && "rotate-180",
                    )}
                  />
                </button>

                {userDropdown && (
                  <div className="glass-strong absolute right-0 top-12 w-48 rounded-2xl border border-white/12 p-2 shadow-2xl backdrop-blur-xl animate-fade">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-volt-300"
                    >
                      <Icon name="users" className="h-4 w-4 text-white/40" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/my-progress"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-volt-300"
                    >
                      <Icon name="chart" className="h-4 w-4 text-white/40" />
                      My Progress
                    </Link>
                    <div className="my-1 h-px bg-white/10" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-rose-300 transition-colors hover:bg-rose-500/15"
                    >
                      <Icon name="close" className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  Sign in
                </Link>
                <Button href="/register">
                  Start free
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "glass-strong absolute inset-x-3 top-20 origin-top rounded-3xl p-5 transition-all duration-400",
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-[0.97] opacity-0",
          )}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                className={cn(
                  "flex items-center justify-between border-b border-white/6 py-3.5 text-[1.05rem] font-medium text-white/80 transition-all duration-500 last:border-0 hover:text-volt-300",
                  open
                    ? "translate-x-0 opacity-100"
                    : "translate-x-2 opacity-0",
                )}
              >
                {link.label}
                <Icon name="arrow" className="h-4 w-4 text-white/30" />
              </Link>
            ))}
          </nav>
          <div className="mt-5 grid gap-2.5">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-medium text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/my-progress"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-medium text-white"
                >
                  My Progress
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-rose-500/20 px-5 py-3 text-center text-sm font-semibold text-rose-300 hover:bg-rose-500/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Button
                  href="/register"
                  size="lg"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Start free — no card
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Sign in
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
