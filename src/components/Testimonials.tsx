'use client'

import { testimonials } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Icon, Orb, SectionHeading } from "./ui";

export default function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Orb className="top-[12%] left-[-10%] h-[32rem] w-[32rem]" color="rgba(109,92,240,0.16)" />
        <Orb className="right-[-6%] bottom-[10%] h-[30rem] w-[30rem]" color="rgba(168,232,31,0.1)" delay="-10s" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Real training, real results"
          title={
            <>
              240,000 people stopped starting over.{" "}
              <span className="text-gradient">Here's why they stayed.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Featured */}
          <Reveal className="lg:col-span-2" direction="left">
            <figure className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-7 sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-volt-300/12 blur-[70px]"
              />
              <Icon name="quote" className="relative h-9 w-9 text-volt-300/35" />
              <blockquote className="relative mt-5 font-display text-[1.35rem] leading-[1.4] font-medium text-balance text-white sm:text-[1.65rem]">
                “{featured.quote}”
              </blockquote>
              <figcaption className="relative mt-8 flex flex-wrap items-center gap-4">
                <img
                  src={featured.avatar}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-volt-300/30"
                />
                <div className="mr-auto">
                  <p className="text-[0.95rem] font-semibold text-white">{featured.name}</p>
                  <p className="text-[0.82rem] text-white/45">{featured.role}</p>
                </div>
                <span className="rounded-full border border-volt-300/25 bg-volt-300/10 px-3.5 py-1.5 text-[0.78rem] font-semibold text-volt-200">
                  {featured.stat}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Rating card */}
          <Reveal direction="right" delay={90}>
            <div className="hairline flex h-full flex-col justify-between rounded-[2rem] bg-gradient-to-br from-volt-300/12 via-white/[0.03] to-transparent p-7">
              <div>
                <div className="flex items-center gap-1 text-volt-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="h-5 w-5" />
                  ))}
                </div>
                <p className="font-display mt-5 text-5xl font-semibold text-white">4.9</p>
                <p className="mt-1 text-[0.9rem] text-white/50">
                  Average rating across the App Store, Play Store and Trustpilot.
                </p>
              </div>
              <dl className="mt-8 space-y-3">
                {[
                  ["Would recommend", "97%"],
                  ["Training 3+ days/week", "78%"],
                  ["Hit a PR in 90 days", "64%"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-t border-white/8 pt-3">
                    <dt className="text-[0.85rem] text-white/50">{k}</dt>
                    <dd className="font-display text-[0.95rem] font-semibold text-volt-300">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Grid */}
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="card-hover hairline flex h-full flex-col rounded-[1.75rem] bg-white/[0.028] p-6">
                <div className="flex items-center gap-1 text-volt-300/90">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" className="h-3.5 w-3.5" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[0.94rem] leading-relaxed text-pretty text-white/70">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <img
                    src={t.avatar}
                    alt=""
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[0.88rem] font-semibold text-white">{t.name}</p>
                    <p className="truncate text-[0.76rem] text-white/40">{t.role}</p>
                  </div>
                  <span className="ml-auto shrink-0 text-[0.72rem] font-semibold text-volt-300">
                    {t.stat}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
