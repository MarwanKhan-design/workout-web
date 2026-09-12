import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { Icon, Orb, SectionHeading } from "./ui";

type Feature = {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  body: string;
  span: string;
  visual?: "start" | "chart" | "none";
};

const features: Feature[] = [
  {
    icon: "play",
    title: "One tap and you're training",
    body: "No setup rituals. Workout Web opens on today's session with your weights, sets and rest timers already dialled in — so the hardest part is behind you before the first rep.",
    span: "lg:col-span-3",
    visual: "start",
  },
  {
    icon: "chart",
    title: "Progress you can actually read",
    body: "Volume, intensity, streaks and PRs in one calm dashboard. No spreadsheet archaeology — just a clear line that goes up.",
    span: "lg:col-span-3",
    visual: "chart",
  },
  {
    icon: "sparkle",
    title: "Adaptive progression",
    body: "Every logged set teaches the engine what you're ready for. Loads nudge up when you're strong, back off when you're cooked.",
    span: "lg:col-span-2",
  },
  {
    icon: "layers",
    title: "1,842 guided workouts",
    body: "Strength, HIIT, mobility and cardio — filtered instantly by time, equipment and energy level.",
    span: "lg:col-span-2",
  },
  {
    icon: "watch",
    title: "Works everywhere you do",
    body: "Web, iOS, Android and watch. Sessions download for offline basements and 30,000-foot flights.",
    span: "lg:col-span-2",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Orb className="top-[10%] right-[-8%] h-[30rem] w-[30rem]" color="rgba(168,232,31,0.1)" />
        <Orb className="bottom-[0%] left-[-10%] h-[28rem] w-[28rem]" color="rgba(109,92,240,0.14)" delay="-9s" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why it works"
          title={
            <>
              Everything that gets in the way of training,{" "}
              <span className="text-gradient">removed</span>.
            </>
          }
          subtitle="We obsessed over the ten seconds before a workout starts — because that's where most fitness apps lose you. What's left is an interface that respects your time and your effort."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 80}
              className={cn("card-hover group hairline relative overflow-hidden rounded-3xl bg-white/[0.028] p-6 sm:p-7", f.span)}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-20 h-48 w-48 rounded-full bg-volt-300/0 blur-3xl transition-all duration-700 group-hover:bg-volt-300/12"
              />
              <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/12 to-white/3 text-volt-300 transition-all duration-500 group-hover:-rotate-6 group-hover:border-volt-300/30 group-hover:text-volt-200">
                <Icon name={f.icon} className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <h3 className="relative mt-5 text-[1.15rem] font-semibold text-white">{f.title}</h3>
              <p className="relative mt-2.5 text-[0.92rem] leading-relaxed text-white/50">{f.body}</p>

              {f.visual === "start" && <StartVisual />}
              {f.visual === "chart" && <ChartVisual />}
            </Reveal>
          ))}

          {/* Coach card with photo */}
          <Reveal
            delay={400}
            className="group hairline relative col-span-full overflow-hidden rounded-3xl lg:col-span-2"
          >
            <img
              src="https://images.pexels.com/photos/38453225/pexels-photo-38453225.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=620"
              alt="Athlete performing a dumbbell press in a low-lit gym"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30" />
            <div className="relative flex h-full min-h-[15rem] flex-col justify-end p-6 sm:p-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-volt-200 uppercase">
                <Icon name="users" className="h-3.5 w-3.5" /> Coach built
              </span>
              <h3 className="mt-4 text-[1.15rem] font-semibold text-white">
                Programmed by real coaches
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/55">
                Every block is written by S&C coaches and physios — then pressure-tested on 240,000
                athletes before it reaches you.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StartVisual() {
  return (
    <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/8 bg-ink-900/70 p-4">
      <div className="flex items-center gap-4">
        <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-volt-300 text-ink-950 shadow-[0_12px_30px_-12px_rgba(214,255,102,0.9)]">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-volt-300/60" />
          <Icon name="play" className="relative ml-0.5 h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.85rem] font-semibold text-white">Push Power — Chest & Delts</p>
          <p className="mt-0.5 text-[0.72rem] text-white/40">42 min · 4 exercises · 13 sets</p>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-volt-300 to-aqua-400 transition-[width] duration-1000 group-hover:w-[72%]" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5 text-[0.68rem] text-white/45">
        {["Warm-up", "Bench 4×6", "Incline 3×10", "Fly 3×12"].map((s, i) => (
          <span
            key={s}
            className={cn(
              "rounded-md border px-2 py-1 whitespace-nowrap transition-colors duration-500",
              i === 1
                ? "border-volt-300/40 bg-volt-300/10 text-volt-200"
                : "border-white/8 bg-white/[0.03]",
            )}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ChartVisual() {
  const pts = [14, 22, 18, 30, 26, 38, 34, 48, 58, 54, 70, 82];
  const d = pts
    .map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - p}`)
    .join(" ");

  return (
    <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/8 bg-ink-900/70 p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.72rem] tracking-[0.14em] text-white/40 uppercase">Strength index</p>
        <p className="font-display text-[0.95rem] font-semibold text-volt-300">+34.8%</p>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-3 h-24 w-full" aria-hidden>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(214,255,102,0.35)" />
            <stop offset="100%" stopColor="rgba(214,255,102,0)" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${d} 100,100`} fill="url(#areaGrad)" />
        <polyline
          points={d}
          fill="none"
          stroke="#d6ff66"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="drop-shadow-[0_0_10px_rgba(214,255,102,0.45)] transition-all duration-700 group-hover:drop-shadow-[0_0_16px_rgba(214,255,102,0.8)]"
        />
        <circle
          cx="100"
          cy={100 - pts[pts.length - 1]}
          r="2.4"
          fill="#d6ff66"
          className="animate-pulse"
        />
      </svg>
      <div className="flex justify-between text-[0.62rem] text-white/30">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
      </div>
    </div>
  );
}
