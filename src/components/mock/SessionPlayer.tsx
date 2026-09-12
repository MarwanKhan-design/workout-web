'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "../ui";

type Exercise = {
  name: string;
  muscle: string;
  scheme: string;
  load: string;
  sets: number;
};

const EXERCISES: Exercise[] = [
  { name: "Barbell Bench Press", muscle: "Chest", scheme: "4 × 6", load: "82.5 kg", sets: 4 },
  { name: "Incline DB Press", muscle: "Upper chest", scheme: "3 × 10", load: "30 kg", sets: 3 },
  { name: "Seated Shoulder Press", muscle: "Delts", scheme: "3 × 8", load: "24 kg", sets: 3 },
  { name: "Cable Fly → Triceps", muscle: "Superset", scheme: "3 × 12", load: "17.5 kg", sets: 3 },
];

const TOTAL_SETS = EXERCISES.reduce((sum, e) => sum + e.sets, 0);

export function ProgressRing({
  value,
  size = 118,
  stroke = 9,
  className,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(Math.max(value, 0), 1) * c);

  return (
    <div className={cn("relative grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d6ff66" />
            <stop offset="55%" stopColor="#a8e81f" />
            <stop offset="100%" stopColor="#34e0bb" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SessionPlayer({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(1582);
  const [rest, setRest] = useState(0);
  const [done, setDone] = useState<boolean[][]>(() =>
    EXERCISES.map((e, i) => Array.from({ length: e.sets }, (_, s) => i === 0 && s < 2)),
  );
  const tick = useRef(0);

  const completedSets = useMemo(
    () => done.reduce((sum, sets) => sum + sets.filter(Boolean).length, 0),
    [done],
  );

  const currentIndex = useMemo(() => {
    const idx = done.findIndex((sets) => sets.some((s) => !s));
    return idx === -1 ? EXERCISES.length - 1 : idx;
  }, [done]);

  const completeNext = useCallback(() => {
    setDone((prev) => {
      const next = prev.map((row) => [...row]);
      for (let i = 0; i < next.length; i++) {
        const s = next[i].findIndex((v) => !v);
        if (s !== -1) {
          next[i][s] = true;
          return next;
        }
      }
      return prev;
    });
    setRest(45);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSeconds((s) => s + 1);
      setRest((r) => (r > 0 ? r - 1 : 0));
      tick.current += 1;
      if (tick.current % 3 === 0) completeNext();
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, completeNext]);

  useEffect(() => {
    if (completedSets >= TOTAL_SETS) setRunning(false);
  }, [completedSets]);

  const toggleSet = (ei: number, si: number) => {
    setDone((prev) => {
      const next = prev.map((row) => [...row]);
      next[ei][si] = !next[ei][si];
      return next;
    });
  };

  const reset = () => {
    setDone(EXERCISES.map((e, i) => Array.from({ length: e.sets }, (_, s) => i === 0 && s < 2)));
    setSeconds(1582);
    setRest(0);
    tick.current = 0;
  };

  const pct = completedSets / TOTAL_SETS;
  const finished = completedSets >= TOTAL_SETS;
  const visible = compact ? EXERCISES.slice(0, 3) : EXERCISES;

  return (
    <div
      className={cn(
        "glass-strong relative overflow-hidden rounded-[1.75rem] p-4 sm:p-5",
        className,
      )}
    >
      {/* ambient glow inside the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-volt-300/20 blur-[70px]"
      />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            {running && (
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-volt-300" />
            )}
            <span
              className={cn(
                "relative inline-flex h-2.5 w-2.5 rounded-full",
                running ? "bg-volt-300" : "bg-white/30",
              )}
            />
          </span>
          <div>
            <p className="text-[0.68rem] font-medium tracking-[0.18em] text-white/45 uppercase">
              {finished ? "Session complete" : running ? "Live session" : "Today · Week 6"}
            </p>
            <p className="font-display text-[0.98rem] font-semibold text-white">
              Push Power — Chest & Delts
            </p>
          </div>
        </div>
        <div className="hidden items-end gap-1 sm:flex" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-volt-300/40 to-volt-300"
              style={{
                height: `${10 + i * 3}px`,
                transformOrigin: "bottom",
                animation: running ? `bar ${700 + i * 90}ms ${i * 70}ms ease-in-out infinite alternate` : "none",
                opacity: running ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Ring + vitals */}
      <div className="relative mt-5 flex items-center gap-5">
        <ProgressRing value={pct} size={compact ? 104 : 118} stroke={compact ? 8 : 9}>
          <div>
            <p className="font-display text-xl font-semibold text-white tabular-nums sm:text-2xl">
              {Math.round(pct * 100)}%
            </p>
            <p className="text-[0.62rem] tracking-[0.14em] text-white/40 uppercase">done</p>
          </div>
        </ProgressRing>

        <div className="grid flex-1 grid-cols-2 gap-2.5">
          <Vital label="Elapsed" value={fmt(seconds)} icon="timer" />
          <Vital label="Sets" value={`${completedSets}/${TOTAL_SETS}`} icon="layers" />
          <Vital label="Volume" value={`${(6.4 + completedSets * 0.42).toFixed(1)}k kg`} icon="dumbbell" />
          <Vital label="Heart rate" value={running ? "142 bpm" : "— bpm"} icon="heart" live={running} />
        </div>
      </div>

      {/* Rest banner */}
      <div
        className={cn(
          "relative mt-4 flex items-center gap-3 overflow-hidden rounded-2xl border border-volt-300/25 bg-volt-300/10 px-4 transition-all duration-500",
          rest > 0 ? "max-h-16 py-3 opacity-100" : "max-h-0 border-transparent py-0 opacity-0",
        )}
        aria-live="polite"
      >
        <Icon name="timer" className="h-4 w-4 shrink-0 text-volt-300" />
        <p className="text-sm font-medium text-volt-100">Rest — next set in {fmt(rest)}</p>
        <div className="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-volt-300 transition-[width] duration-1000 ease-linear"
            style={{ width: `${(rest / 45) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise list */}
      <ul className="relative mt-4 space-y-2">
        {visible.map((ex, ei) => {
          const isCurrent = ei === currentIndex && !finished;
          const sets = done[ei];
          return (
            <li
              key={ex.name}
              className={cn(
                "rounded-2xl border px-3.5 py-3 transition-all duration-500",
                isCurrent
                  ? "border-volt-300/35 bg-gradient-to-r from-volt-300/12 to-transparent"
                  : "border-white/8 bg-white/[0.03] hover:border-white/16",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className={cn(
                      "truncate text-[0.9rem] font-medium",
                      sets.every(Boolean) ? "text-white/45 line-through" : "text-white",
                    )}
                  >
                    {ex.name}
                  </p>
                  <p className="mt-0.5 text-[0.72rem] text-white/40">
                    {ex.muscle} · {ex.scheme} · <span className="text-volt-300/80">{ex.load}</span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {sets.map((isDone, si) => (
                    <button
                      key={si}
                      type="button"
                      onClick={() => toggleSet(ei, si)}
                      aria-label={`${ex.name} set ${si + 1} ${isDone ? "completed" : "not completed"}`}
                      aria-pressed={isDone}
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-lg border text-[0.68rem] font-semibold transition-all duration-300 hover:scale-110",
                        isDone
                          ? "border-volt-300/50 bg-volt-300 text-ink-950"
                          : "border-white/14 bg-white/[0.04] text-white/45 hover:border-volt-300/50 hover:text-volt-200",
                      )}
                    >
                      {isDone ? <Icon name="check" className="h-3.5 w-3.5" /> : si + 1}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Controls */}
      <div className="relative mt-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => (finished ? reset() : setRunning((r) => !r))}
          className={cn(
            "group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full py-3 text-sm font-semibold transition-all duration-300",
            running
              ? "border border-white/15 bg-white/8 text-white hover:bg-white/12"
              : "bg-volt-300 text-ink-950 shadow-[0_14px_34px_-14px_rgba(214,255,102,0.8)] hover:-translate-y-0.5 hover:bg-volt-200",
          )}
        >
          {!running && !finished && (
            <span className="shine pointer-events-none absolute inset-0 animate-shimmer opacity-25" />
          )}
          <span className="relative flex items-center gap-2">
            {finished ? (
              <>
                <Icon name="sparkle" className="h-4 w-4" /> Log session & finish
              </>
            ) : running ? (
              <>
                <span className="flex gap-[3px]">
                  <span className="h-3.5 w-[3px] rounded-full bg-current" />
                  <span className="h-3.5 w-[3px] rounded-full bg-current" />
                </span>
                Pause
              </>
            ) : (
              <>
                <Icon name="play" className="h-3.5 w-3.5" /> Start workout
              </>
            )}
          </span>
        </button>
        <button
          type="button"
          onClick={completeNext}
          aria-label="Complete current set"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/14 bg-white/5 text-white/70 transition-all duration-300 hover:scale-105 hover:border-volt-300/40 hover:text-volt-300"
        >
          <Icon name="check" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset demo session"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/14 bg-white/5 text-white/70 transition-all duration-300 hover:scale-105 hover:border-white/30 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 5v4h4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Vital({
  label,
  value,
  icon,
  live,
}: {
  label: string;
  value: string;
  icon: "timer" | "layers" | "dumbbell" | "heart";
  live?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2">
      <div className="flex items-center gap-1.5 text-white/40">
        <Icon
          name={icon}
          className={cn("h-3.5 w-3.5", live && "animate-pulse text-rose-300")}
        />
        <span className="text-[0.62rem] tracking-[0.12em] uppercase">{label}</span>
      </div>
      <p className="mt-0.5 font-display text-[0.95rem] font-semibold text-white tabular-nums">
        {value}
      </p>
    </div>
  );
}
