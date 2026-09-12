"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { pricing } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Button, Icon, SectionHeading } from "./ui";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Less than one session with a trainer.{" "}
              <span className="text-gradient">Every month, forever.</span>
            </>
          }
          subtitle="Start free and stay free if that's all you need. Upgrade when you want the full library and the adaptive engine working for you."
        />

        {/* Billing toggle */}
        <Reveal delay={120} className="mt-9 flex justify-center">
          <div className="glass inline-flex items-center gap-1 rounded-full p-1.5">
            {(["Monthly", "Yearly"] as const).map((label, i) => {
              const isYear = i === 1;
              const activeTab = yearly === isYear;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setYearly(isYear)}
                  aria-pressed={activeTab}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-[0.85rem] font-medium transition-all duration-400",
                    activeTab
                      ? "bg-volt-300 text-ink-950 shadow-[0_12px_28px_-14px_rgba(214,255,102,0.9)]"
                      : "text-white/55 hover:text-white",
                  )}
                >
                  {label}
                  {isYear && (
                    <span
                      className={cn(
                        "ml-2 rounded-full px-2 py-0.5 text-[0.65rem] font-bold transition-colors",
                        activeTab
                          ? "bg-ink-950/15 text-ink-950"
                          : "bg-volt-300/15 text-volt-300",
                      )}
                    >
                      −35%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {pricing.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <Reveal
                key={plan.name}
                delay={i * 110}
                className={cn(
                  "relative h-full",
                  plan.highlight && "lg:-mt-4 lg:mb-[-1rem]",
                )}
              >
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] p-7 transition-all duration-500 sm:p-8",
                    plan.highlight
                      ? "glass-strong border-volt-300/30 shadow-[0_40px_90px_-50px_rgba(214,255,102,0.5)]"
                      : "hairline bg-white/[0.025] hover:-translate-y-1.5 hover:border-white/18",
                  )}
                >
                  {plan.highlight && (
                    <>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-24 left-1/2 h-52 w-72 -translate-x-1/2 rounded-full bg-volt-300/18 blur-[70px]"
                      />
                      <span className="absolute top-5 right-5 rounded-full bg-volt-300 px-3 py-1 text-[0.65rem] font-bold tracking-[0.12em] text-ink-950 uppercase">
                        Most popular
                      </span>
                    </>
                  )}

                  <h3 className="relative font-display text-[1.25rem] font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="relative mt-1.5 text-[0.88rem] text-white/45">
                    {plan.tagline}
                  </p>

                  <div className="relative mt-7 flex items-end gap-1.5">
                    <span
                      key={`${plan.name}-${price}`}
                      className="font-display animate-fade text-[3.1rem] leading-none font-semibold tracking-tight text-white tabular-nums"
                    >
                      ${price}
                    </span>
                    <span className="mb-1.5 text-[0.85rem] text-white/40">
                      {price === 0 ? "forever" : "/ month"}
                    </span>
                  </div>
                  {price > 0 && (
                    <p className="relative mt-1.5 text-[0.76rem] text-white/35">
                      {yearly
                        ? `Billed $${price * 12} yearly`
                        : "Billed monthly, cancel anytime"}
                    </p>
                  )}

                  <Button
                    href="#cta"
                    size="lg"
                    variant={plan.highlight ? "primary" : "outline"}
                    className="relative mt-7 w-full"
                  >
                    {plan.cta}
                    <Icon
                      name="arrow"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>

                  <ul className="relative mt-8 space-y-3.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 grid h-[1.15rem] w-[1.15rem] shrink-0 place-items-center rounded-full",
                            plan.highlight
                              ? "bg-volt-300 text-ink-950"
                              : "bg-white/10 text-volt-300",
                          )}
                        >
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        <span className="text-[0.88rem] leading-snug text-white/62">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.82rem] text-white/40">
            {[
              { icon: "shield" as const, label: "14-day Pro trial, no card" },
              { icon: "globe" as const, label: "Cancel in two clicks" },
              { icon: "users" as const, label: "Student & coach discounts" },
            ].map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <Icon name={item.icon} className="h-4 w-4 text-volt-300/70" />
                {item.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
