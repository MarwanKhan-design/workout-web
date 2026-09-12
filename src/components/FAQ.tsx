'use client'

import { useState } from "react";
import { cn } from "@/utils/cn";
import { faqs } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Icon, SectionHeading } from "./ui";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Questions"
              title={
                <>
                  Everything you were about to <span className="text-gradient">ask</span>.
                </>
              }
              subtitle="Still curious? Our team trains on the product every day and answers in under four hours."
            />
            <Reveal delay={200}>
              <a
                href="#cta"
                className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 pr-5 transition-all duration-400 hover:-translate-y-1 hover:border-volt-300/30 hover:bg-white/[0.06]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-volt-300/12 text-volt-300">
                  <Icon name="users" className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <span>
                  <span className="block text-[0.9rem] font-semibold text-white">
                    Talk to a real coach
                  </span>
                  <span className="block text-[0.8rem] text-white/45">
                    Free 15-minute programme review
                  </span>
                </span>
                <Icon
                  name="arrow"
                  className="ml-2 h-4 w-4 text-white/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-volt-300"
                />
              </a>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 70}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-500",
                      isOpen
                        ? "border-volt-300/25 bg-white/[0.05]"
                        : "border-white/8 bg-white/[0.022] hover:border-white/16",
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                      >
                        <span
                          className={cn(
                            "text-[1rem] font-medium transition-colors duration-300 sm:text-[1.05rem]",
                            isOpen ? "text-white" : "text-white/78",
                          )}
                        >
                          {item.q}
                        </span>
                        <span
                          className={cn(
                            "relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500",
                            isOpen
                              ? "rotate-180 border-volt-300/40 bg-volt-300 text-ink-950"
                              : "border-white/12 bg-white/5 text-white/60",
                          )}
                        >
                          <Icon name={isOpen ? "minus" : "plus"} className="h-4 w-4" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-6 text-[0.94rem] leading-relaxed text-pretty text-white/52 sm:px-6 sm:pr-16">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
