'use client'

import { cn } from "@/utils/cn";
import { useInView } from "../Reveal";
import { Icon } from "../ui";

const weeks = [
  { label: "W1", value: 38 },
  { label: "W2", value: 46 },
  { label: "W3", value: 41 },
  { label: "W4", value: 58 },
  { label: "W5", value: 52 },
  { label: "W6", value: 67 },
  { label: "W7", value: 74 },
  { label: "W8", value: 92 },
];

const prs = [
  { lift: "Back Squat", value: "142.5 kg", delta: "+7.5", when: "2d ago" },
  { lift: "Bench Press", value: "97.5 kg", delta: "+2.5", when: "6d ago" },
  { lift: "Deadlift", value: "180 kg", delta: "+5.0", when: "12d ago" },
];

/** Deterministic pseudo-random intensity so the heatmap looks organic but stable. */
const heat = Array.from({ length: 91 }, (_, i) => {
  const n = Math.sin(i * 12.9898) * 43758.5453;
  const f = n - Math.floor(n);
  if (i > 84) return 0;
  return f > 0.72 ? 3 : f > 0.45 ? 2 : f > 0.22 ? 1 : 0;
});

export default function ProgressPanel({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      className={cn("glass-strong relative overflow-hidden rounded-[1.75rem] p-4 sm:p-6", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-aqua-400/18 blur-[80px]"
      />

      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-medium tracking-[0.18em] text-white/45 uppercase">
            Progress
          </p>
          <h3 className="font-display text-lg font-semibold text-white">Last 8 weeks</h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {["8W", "6M", "1Y"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-3 py-1 text-[0.72rem] font-medium transition-colors",
                i === 0 ? "bg-white/10 text-white" : "text-white/40",
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Stat tiles */}
      <div className="relative mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <Tile icon="dumbbell" label="Total volume" value="428.6k" unit="kg" trend="+18%" />
        <Tile icon="flame" label="Streak" value="64" unit="days" trend="best yet" />
        <Tile icon="calendar" label="Sessions" value="97" unit="done" trend="+9" />
        <Tile icon="trophy" label="New PRs" value="18" unit="lifts" trend="+3" />
      </div>

      <div className="relative mt-4 grid gap-3 lg:grid-cols-5">
        {/* Bar chart */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 lg:col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-[0.8rem] font-medium text-white/70">Weekly training volume</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-volt-300/12 px-2 py-0.5 text-[0.68rem] font-semibold text-volt-200">
              <Icon name="chart" className="h-3 w-3" /> +142%
            </span>
          </div>
          <div className="mt-5 flex h-36 items-end gap-2 sm:gap-3">
            {weeks.map((w, i) => (
              <div key={w.label} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative flex w-full flex-1 items-end">
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-ink-900 px-1.5 py-0.5 text-[0.62rem] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {(w.value * 0.62).toFixed(1)}k
                  </span>
                  <div
                    className={cn(
                      "w-full rounded-t-md bg-gradient-to-t transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:brightness-125",
                      i === weeks.length - 1
                        ? "from-volt-500/40 to-volt-300"
                        : "from-white/8 to-white/25",
                    )}
                    style={{ height: inView ? `${w.value}%` : "2%", transitionDelay: `${i * 70}ms` }}
                  />
                </div>
                <span className="text-[0.62rem] text-white/35">{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRs */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 lg:col-span-2">
          <p className="text-[0.8rem] font-medium text-white/70">Recent personal records</p>
          <ul className="mt-3 space-y-2">
            {prs.map((pr, i) => (
              <li
                key={pr.lift}
                style={{ transitionDelay: `${200 + i * 110}ms` }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 transition-all duration-700",
                  inView ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
                )}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-volt-300/12 text-volt-300">
                  <Icon name="trophy" className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.85rem] font-medium text-white">{pr.lift}</p>
                  <p className="text-[0.68rem] text-white/35">{pr.when}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-[0.9rem] font-semibold text-white tabular-nums">
                    {pr.value}
                  </p>
                  <p className="text-[0.68rem] font-medium text-volt-300">{pr.delta} kg</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Consistency heatmap */}
      <div className="relative mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[0.8rem] font-medium text-white/70">Consistency · last 13 weeks</p>
          <div className="flex items-center gap-1.5 text-[0.65rem] text-white/35">
            less
            {[0, 1, 2, 3].map((lvl) => (
              <span key={lvl} className={cn("h-2.5 w-2.5 rounded-[3px]", levelClass(lvl))} />
            ))}
            more
          </div>
        </div>
        <div
          className="mt-3 grid grid-flow-col gap-[3px] overflow-x-auto pb-1 scroll-thin"
          style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
          aria-hidden
        >
          {heat.map((lvl, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${Math.min(i * 6, 700)}ms` }}
              className={cn(
                "h-[11px] w-[11px] rounded-[3px] transition-all duration-500 hover:scale-125",
                levelClass(lvl),
                inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function levelClass(lvl: number) {
  return [
    "bg-white/6",
    "bg-volt-300/25",
    "bg-volt-300/55",
    "bg-volt-300",
  ][lvl];
}

function Tile({
  icon,
  label,
  value,
  unit,
  trend,
}: {
  icon: "dumbbell" | "flame" | "calendar" | "trophy";
  label: string;
  value: string;
  unit: string;
  trend: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition-all duration-400 hover:-translate-y-1 hover:border-volt-300/25 hover:bg-white/[0.055]">
      <div className="flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/6 text-volt-300 transition-transform duration-400 group-hover:scale-110">
          <Icon name={icon} className="h-3.5 w-3.5" />
        </span>
        <span className="text-[0.62rem] font-medium text-volt-300/80">{trend}</span>
      </div>
      <p className="mt-3 font-display text-xl font-semibold text-white tabular-nums">
        {value}
        <span className="ml-1 text-[0.7rem] font-medium text-white/35">{unit}</span>
      </p>
      <p className="text-[0.68rem] text-white/40">{label}</p>
    </div>
  );
}
