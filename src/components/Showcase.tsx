'use client'

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { Icon, Orb, SectionHeading } from "./ui";
import SessionPlayer from "./mock/SessionPlayer";
import LibraryPanel from "./mock/LibraryPanel";
import ProgressPanel from "./mock/ProgressPanel";

const tabs = [
  {
    id: "start",
    label: "Start a workout",
    icon: "play" as const,
    blurb:
      "Open the app, hit start. Sets, loads and rest timers are pre-filled from last week — tap a set to bank it and keep moving.",
    highlights: [
      { icon: "timer" as const, title: "Auto rest timers", body: "Counts down, buzzes your watch, rolls into the next set." },
      { icon: "dumbbell" as const, title: "Smart load suggestions", body: "Last week's numbers plus the nudge you've earned." },
      { icon: "bolt" as const, title: "Two-tap logging", body: "Big, thumb-friendly targets you can hit mid-set with chalky hands." },
    ],
  },
  {
    id: "browse",
    label: "Browse workouts",
    icon: "layers" as const,
    blurb:
      "Filter 1,842 sessions by discipline, time and equipment. Every card tells you the cost in minutes before you commit.",
    highlights: [
      { icon: "search" as const, title: "Filter by what you've got", body: "Ten minutes and a kettlebell? There's a session for that." },
      { icon: "users" as const, title: "Coach-led programming", body: "Follow a named coach through a full 8-week block." },
      { icon: "heart" as const, title: "Save and stack", body: "Build your own playlist of go-to sessions for busy weeks." },
    ],
  },
  {
    id: "progress",
    label: "See your progress",
    icon: "chart" as const,
    blurb:
      "Volume, streaks, PRs and consistency in one view. Proof that the boring, repeated work is compounding.",
    highlights: [
      { icon: "trophy" as const, title: "PR timeline", body: "Every record, when you hit it, and what it took." },
      { icon: "calendar" as const, title: "Consistency heatmap", body: "13 weeks of showing up, at a glance." },
      { icon: "shield" as const, title: "Recovery aware", body: "Sleep and HRV context so you know when to push." },
    ],
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section id="showcase" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <Orb className="top-[18%] left-[-6%] h-[34rem] w-[34rem]" color="rgba(52,224,187,0.12)" />
        <Orb className="right-[-8%] bottom-[6%] h-[32rem] w-[32rem]" color="rgba(168,232,31,0.12)" delay="-8s" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Inside the app"
          title={
            <>
              Three screens. <span className="text-gradient">Zero friction.</span>
            </>
          }
          subtitle="This is the real interface — click around. Start a session, filter the library, watch the dashboard fill in."
        />

        {/* Tabs */}
        <Reveal delay={120} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Product screens"
            className="glass relative flex w-full max-w-2xl gap-1 rounded-2xl p-1.5 sm:rounded-full"
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                onClick={() => setActive(i)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[0.8rem] font-medium transition-all duration-400 sm:rounded-full sm:px-5 sm:text-[0.9rem]",
                  active === i
                    ? "bg-volt-300 text-ink-950 shadow-[0_12px_30px_-14px_rgba(214,255,102,0.9)]"
                    : "text-white/55 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon name={t.icon} className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p
            key={tab.id}
            className="mx-auto mt-6 max-w-2xl animate-fade text-center text-[0.98rem] leading-relaxed text-pretty text-white/50"
          >
            {tab.blurb}
          </p>
        </Reveal>

        {/* App frame */}
        <Reveal delay={120} direction="scale" className="relative mt-10">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2.8rem] bg-gradient-to-br from-volt-300/10 via-transparent to-iris-400/12 blur-2xl"
          />
          <div className="glass relative overflow-hidden rounded-[2rem] p-2 shadow-[0_60px_120px_-60px_rgba(0,0,0,1)] sm:p-3">
            {/* window chrome */}
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="mx-auto hidden max-w-xs flex-1 items-center justify-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-1 text-[0.7rem] text-white/35 sm:flex">
                <Icon name="shield" className="h-3 w-3 text-volt-300/70" />
                app.workoutweb.com/{tab.id}
              </div>
              <span className="ml-auto hidden text-[0.68rem] text-white/30 sm:block">
                Live interactive demo
              </span>
            </div>

            <div
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              key={tab.id}
              className="animate-rise"
            >
              {active === 0 && (
                <div className="grid gap-3 lg:grid-cols-[1fr_1.05fr]">
                  <SessionPlayer />
                  <div className="relative hidden overflow-hidden rounded-[1.75rem] border border-white/8 lg:block">
                    <img
                      src="https://images.pexels.com/photos/12890814/pexels-photo-12890814.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720"
                      alt="Athlete mid-session in a gym"
                      loading="lazy"
                      className="h-full w-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="glass rounded-2xl p-4">
                        <p className="text-[0.68rem] tracking-[0.16em] text-white/45 uppercase">
                          Form cue · Bench press
                        </p>
                        <p className="mt-1.5 text-[0.92rem] leading-relaxed text-white/85">
                          “Ribs down, elbows at 60°. Touch the same spot every rep — consistency is
                          what makes the load go up.”
                        </p>
                        <p className="mt-2.5 text-[0.72rem] text-volt-300">— Coach Maya Okafor</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {active === 1 && <LibraryPanel />}
              {active === 2 && <ProgressPanel />}
            </div>
          </div>
        </Reveal>

        {/* Highlights */}
        <div key={tab.id} className="mt-8 grid gap-4 sm:grid-cols-3">
          {tab.highlights.map((h, i) => (
            <div
              key={h.title}
              style={{ animationDelay: `${i * 110}ms` }}
              className="group hairline animate-rise rounded-2xl bg-white/[0.028] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-volt-300/25 hover:bg-white/[0.05]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt-300/10 text-volt-300 transition-transform duration-500 group-hover:scale-110">
                <Icon name={h.icon} className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-[0.98rem] font-semibold text-white">{h.title}</h3>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-white/48">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
