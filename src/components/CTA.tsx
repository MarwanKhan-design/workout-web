"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { Button, Icon } from "./ui";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section
      id="cta"
      className="relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
    >
      <Reveal direction="scale" className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 sm:rounded-[2.75rem]">
          <img
            src="https://images.pexels.com/photos/9943223/pexels-photo-9943223.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[50%_35%] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/88 to-ink-900/70" />
          <div
            aria-hidden
            className="animate-orb absolute -top-32 -left-20 h-96 w-96 rounded-full bg-volt-300/22 blur-[90px]"
          />
          <div
            aria-hidden
            className="animate-orb absolute -right-24 -bottom-28 h-96 w-96 rounded-full bg-iris-400/22 blur-[90px]"
            style={{ animationDelay: "-8s" }}
          />
          <div className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_75%)]" />

          <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-volt-300/25 bg-volt-300/10 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-volt-200 uppercase">
              <Icon name="bolt" className="h-3.5 w-3.5" />
              Your first session is 60 seconds away
            </span>

            <h2 className="font-display mx-auto mt-7 max-w-3xl text-[2.1rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance text-white sm:text-5xl lg:text-[3.4rem]">
              Stop planning to train.
              <span className="block text-gradient">Start training today.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-pretty text-white/58">
              Create your free account, answer four quick questions, and your
              first week of workouts is ready before your pre-workout kicks in.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
              className="mx-auto mt-9 flex w-full max-w-lg flex-col gap-2.5 sm:flex-row"
            >
              <label htmlFor="cta-email" className="sr-only">
                Email address
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSent(false);
                }}
                placeholder="you@email.com"
                className="glass w-full rounded-full px-5 py-3.5 text-[0.95rem] text-white placeholder-white/35 transition-all duration-300 outline-none focus:border-volt-300/45 focus:bg-white/10"
              />
              <button
                type="submit"
                className={cn(
                  "group relative shrink-0 overflow-hidden rounded-full px-7 py-3.5 text-[0.95rem] font-semibold transition-all duration-300",
                  sent
                    ? "bg-aqua-400 text-ink-950"
                    : "bg-volt-300 text-ink-950 shadow-[0_16px_40px_-14px_rgba(214,255,102,0.8)] hover:-translate-y-0.5 hover:bg-volt-200",
                )}
              >
                <span className="shine pointer-events-none absolute inset-0 animate-shimmer opacity-25" />
                <span className="relative inline-flex items-center gap-2">
                  {sent ? (
                    <>
                      <Icon name="check" className="h-4 w-4" /> Check your inbox
                    </>
                  ) : (
                    <>
                      Start free
                      <Icon
                        name="arrow"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-[0.8rem] text-white/40">
              {[
                "No credit card",
                "Free forever plan",
                "Cancel anytime",
                "iOS · Android · Web",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-volt-300/80" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#showcase" variant="outline" size="lg">
                <Icon name="play" className="h-3 w-3" />
                Replay the product tour
              </Button>
              <Button href="#pricing" variant="ghost" size="lg">
                Compare plans
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
