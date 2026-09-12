'use client'

import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { categories, workouts } from "@/lib/data";
import { Icon } from "../ui";

export default function LibraryPanel({ className }: { className?: string }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workouts.filter((w) => {
      const matchesCat = active === "All" || w.category === active;
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.coach.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [active, query]);

  return (
    <div className={cn("glass-strong relative overflow-hidden rounded-[1.75rem] p-4 sm:p-6", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/3 h-56 w-72 rounded-full bg-iris-400/20 blur-[80px]"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-medium tracking-[0.18em] text-white/45 uppercase">
            Library
          </p>
          <h3 className="font-display text-lg font-semibold text-white">
            1,842 guided workouts
          </h3>
        </div>
        <label className="group relative flex items-center">
          <span className="sr-only">Search workouts</span>
          <Icon
            name="search"
            className="pointer-events-none absolute left-3.5 h-4 w-4 text-white/35 transition-colors group-focus-within:text-volt-300"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search “kettlebell”, “mobility”…"
            className="w-full rounded-full border border-white/12 bg-white/[0.04] py-2.5 pr-4 pl-10 text-sm text-white placeholder-white/30 transition-all duration-300 outline-none focus:border-volt-300/40 focus:bg-white/[0.07] sm:w-64"
          />
        </label>
      </div>

      {/* Filters */}
      <div className="relative mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scroll-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition-all duration-300",
              active === cat
                ? "border-volt-300/60 bg-volt-300 text-ink-950 shadow-[0_10px_26px_-14px_rgba(214,255,102,0.9)]"
                : "border-white/12 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white",
            )}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 items-center self-center pl-3 text-[0.75rem] text-white/35 sm:flex">
          {results.length} results
        </span>
      </div>

      {/* Grid */}
      <div key={active} className="relative mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((w, i) => (
          <article
            key={w.id}
            style={{ animationDelay: `${i * 55}ms` }}
            className="group animate-rise relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-volt-300/35 hover:shadow-[0_26px_50px_-30px_rgba(0,0,0,0.95)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={w.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-[1.07] group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100",
                  w.accent,
                )}
              />
              <span className="absolute top-2.5 left-2.5 rounded-full border border-white/15 bg-ink-950/70 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.1em] text-white/80 uppercase backdrop-blur-md">
                {w.category}
              </span>
              <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-ink-950/70 px-2 py-1 text-[0.68rem] font-semibold text-volt-200 backdrop-blur-md">
                <Icon name="star" className="h-3 w-3" />
                {w.rating.toFixed(1)}
              </span>
              <button
                type="button"
                aria-label={`Start ${w.title}`}
                className="absolute right-2.5 bottom-2.5 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-volt-300 text-ink-950 opacity-0 shadow-[0_10px_26px_-10px_rgba(214,255,102,0.9)] transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110"
              >
                <Icon name="play" className="ml-0.5 h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-3.5">
              <h4 className="line-clamp-1 text-[0.9rem] font-semibold text-white transition-colors group-hover:text-volt-200">
                {w.title}
              </h4>
              <p className="mt-1 text-[0.74rem] text-white/40">with {w.coach}</p>
              <div className="mt-3 flex items-center gap-3 text-[0.72rem] text-white/50">
                <span className="inline-flex items-center gap-1">
                  <Icon name="timer" className="h-3.5 w-3.5 text-white/35" />
                  {w.minutes}m
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="flame" className="h-3.5 w-3.5 text-white/35" />
                  {w.kcal}
                </span>
                <span className="ml-auto rounded-md border border-white/10 px-1.5 py-0.5 text-[0.65rem] text-white/45">
                  {w.level}
                </span>
              </div>
            </div>
          </article>
        ))}

        {results.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-white/12 py-12 text-center">
            <p className="text-sm text-white/50">No sessions match “{query}”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("All");
              }}
              className="mt-3 text-sm font-medium text-volt-300 underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
