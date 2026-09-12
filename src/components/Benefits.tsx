import { Counter, Reveal } from "./Reveal";
import { Button, Icon, SectionHeading } from "./ui";

const rowOne = [
  {
    title: "Sessions that flex around real life",
    body: "Told it you've got 25 minutes and a pair of dumbbells? The plan reshapes itself instead of guilt-tripping you.",
  },
  {
    title: "Streak Shields for the weeks life wins",
    body: "Planned rest, travel and sick days don't nuke your momentum — the app protects the habit you built.",
  },
  {
    title: "Warm-ups that take 90 seconds",
    body: "Movement prep matched to the exact lifts in today's session. No 15-minute preamble before rep one.",
  },
];

const comparison = [
  { without: "Scrolling three apps to find a workout", with: "Today's session is already open" },
  { without: "Guessing the weight, again", with: "Loads suggested from your last 6 sessions" },
  { without: "A notes app full of dead numbers", with: "Volume, PRs and streaks visualised" },
  { without: "Quietly quitting in week three", with: "92% still training at day 90" },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The outcome"
          title={
            <>
              Show up more often.{" "}
              <span className="text-gradient">Get measurably stronger.</span>
            </>
          }
          subtitle="Motivation is unreliable. Systems aren't. Workout Web is built around the small design decisions that turn training into something you simply do."
        />

        {/* Row one */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left" className="relative order-2 lg:order-1">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-volt-300/12 via-transparent to-iris-400/14 blur-2xl"
              />
              <div className="hairline relative overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.pexels.com/photos/13588101/pexels-photo-13588101.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=760"
                  alt="Athlete catching their breath between sets in a low-lit gym"
                  loading="lazy"
                  className="h-[24rem] w-full object-cover object-[50%_30%] transition-transform duration-[1400ms] hover:scale-105 sm:h-[30rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              </div>

              <div className="glass animate-float absolute -right-3 bottom-8 w-[13.5rem] rounded-2xl p-4 shadow-[0_28px_60px_-32px_rgba(0,0,0,1)] sm:-right-6">
                <p className="text-[0.62rem] tracking-[0.16em] text-white/45 uppercase">
                  Weekly adherence
                </p>
                <p className="font-display mt-1 text-2xl font-semibold text-white">
                  <Counter to={94} suffix="%" />
                </p>
                <div className="mt-2.5 flex gap-1">
                  {[70, 88, 62, 100, 84, 96, 78].map((h, i) => (
                    <span key={i} className="flex h-10 flex-1 items-end">
                      <span
                        className="w-full rounded-sm bg-gradient-to-t from-volt-500/30 to-volt-300"
                        style={{ height: `${h}%`, transformOrigin: "bottom", animation: `bar 900ms ${i * 80}ms cubic-bezier(0.16,1,0.3,1) both` }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <h3 className="font-display text-[1.7rem] leading-tight font-semibold text-balance text-white sm:text-[2.1rem]">
                The app removes the excuse before you find it.
              </h3>
            </Reveal>
            <div className="mt-8 space-y-6">
              {rowOne.map((item, i) => (
                <Reveal key={item.title} delay={100 + i * 90} className="group flex gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-volt-300/25 bg-volt-300/10 text-volt-300 transition-all duration-500 group-hover:scale-110 group-hover:bg-volt-300 group-hover:text-ink-950">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-[1.02rem] font-semibold text-white">{item.title}</h4>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-white/50">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={400}>
              <Button href="#cta" variant="outline" size="lg" className="mt-9">
                Build my first week
                <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Row two — comparison */}
        <div className="mt-24 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h3 className="font-display text-[1.7rem] leading-tight font-semibold text-balance text-white sm:text-[2.1rem]">
                From scattered effort to a system that compounds.
              </h3>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-5 text-[1rem] leading-relaxed text-white/52">
                Most people don't lack effort — they lack a record of it. When every set is captured
                and every trend is visible, training stops being a mood and starts being a practice.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { v: 3.4, s: "×", l: "more sessions logged per week" },
                  { v: 34, s: "%", l: "average strength index gain" },
                  { v: 11, s: " min", l: "saved planning every session" },
                ].map((s) => (
                  <div key={s.l} className="hairline rounded-2xl bg-white/[0.03] p-4 text-center">
                    <p className="font-display text-2xl font-semibold text-volt-300 tabular-nums">
                      <Counter to={s.v} suffix={s.s} decimals={s.v % 1 ? 1 : 0} />
                    </p>
                    <p className="mt-1.5 text-[0.72rem] leading-snug text-white/45">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" delay={120}>
            <div className="glass relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
              <div className="mb-5 grid grid-cols-2 gap-4 text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
                <p className="text-white/35">Before</p>
                <p className="text-volt-300">With Workout Web</p>
              </div>
              <ul className="space-y-3">
                {comparison.map((row, i) => (
                  <li
                    key={row.with}
                    style={{ transitionDelay: `${i * 90}ms` }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <span className="flex items-start gap-2 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-3 text-[0.82rem] leading-snug text-white/38">
                      <Icon name="close" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25" />
                      {row.without}
                    </span>
                    <span className="group flex items-start gap-2 rounded-xl border border-volt-300/20 bg-volt-300/[0.07] px-3 py-3 text-[0.82rem] leading-snug text-white/80 transition-all duration-400 hover:border-volt-300/45 hover:bg-volt-300/[0.12]">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-volt-300" />
                      {row.with}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
