'use client'

import { Counter, Reveal } from "./Reveal";

const brands = [
  "IRONHOUSE",
  "Pulse Labs",
  "NORDIC STRENGTH",
  "Basecamp Athletics",
  "RUNRIOT",
  "Vitality Club",
  "FORGE 42",
  "Meridian Health",
];

const stats = [
  { value: 240, suffix: "K+", label: "Athletes training weekly" },
  { value: 1842, suffix: "", label: "Guided workouts in the library" },
  { value: 12.4, suffix: "M", label: "Sets logged this year", decimals: 1 },
  { value: 92, suffix: "%", label: "Still training after 90 days" },
];

export default function SocialProof() {
  return (
    <section aria-label="Social proof" className="relative border-y border-white/6 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-[0.72rem] font-medium tracking-[0.24em] text-white/35 uppercase">
            Programmed with coaches from
          </p>
        </Reveal>

        <div className="mask-fade-x relative mt-7 overflow-hidden">
          <div className="animate-marquee flex w-max gap-12 sm:gap-16">
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="font-display text-[1.05rem] font-semibold tracking-[0.12em] whitespace-nowrap text-white/28 transition-colors duration-300 hover:text-white/70 sm:text-xl"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="group bg-ink-950/90 px-5 py-7 text-center transition-colors duration-500 hover:bg-ink-900/90 sm:px-6 sm:py-9"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-white tabular-nums sm:text-[2.6rem]">
                <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mx-auto mt-2 max-w-[16rem] text-[0.82rem] leading-snug text-white/45">
                {s.label}
              </p>
              <span className="mx-auto mt-4 block h-px w-10 origin-center scale-x-50 bg-volt-300/60 transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
