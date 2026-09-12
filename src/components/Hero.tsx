import { Button, Icon, Orb, Pill } from "./ui";
import { Counter, Reveal } from "./Reveal";
import SessionPlayer from "./mock/SessionPlayer";

const avatars = [
  "https://images.pexels.com/photos/20085710/pexels-photo-20085710.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=120&w=120",
  "https://images.pexels.com/photos/17782869/pexels-photo-17782869.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=120&w=120",
  "https://images.pexels.com/photos/8436400/pexels-photo-8436400.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=120&w=120",
  "https://images.pexels.com/photos/28455391/pexels-photo-28455391.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=120&w=120",
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_20%,transparent_75%)]" />
        <Orb className="top-[-18%] left-[-10%] h-[46rem] w-[46rem]" color="rgba(168,232,31,0.16)" />
        <Orb
          className="top-[6%] right-[-14%] h-[40rem] w-[40rem]"
          color="rgba(109,92,240,0.22)"
          delay="-6s"
        />
        <Orb
          className="bottom-[-22%] left-[28%] h-[34rem] w-[34rem]"
          color="rgba(52,224,187,0.14)"
          delay="-12s"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        {/* Copy */}
        <div className="relative max-w-xl">
          <Reveal>
            <Pill
              icon={<span className="h-1.5 w-1.5 rounded-full bg-volt-300 shadow-[0_0_10px_2px_rgba(214,255,102,0.7)]" />}
            >
              New · Adaptive progression engine
            </Pill>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.35rem] leading-[1] font-semibold tracking-[-0.03em] text-balance text-white sm:text-6xl sm:leading-[0.98] lg:text-[4.15rem]">
              Train with intent.
              <span className="block text-gradient">Progress you can see.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-pretty text-white/58 sm:text-[1.12rem]">
              Workout Web turns "I should exercise" into a session you actually start. One tap to
              begin, 1,800+ guided workouts to browse, and a progress dashboard that proves the work
              is paying off.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#cta" size="lg">
                Start training free
                <Icon
                  name="arrow"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button href="#showcase" variant="outline" size="lg">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
                  <Icon name="play" className="ml-0.5 h-2.5 w-2.5" />
                </span>
                See the app in motion
              </Button>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {avatars.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      style={{ animationDelay: `${i * 120}ms` }}
                      className="h-9 w-9 animate-fade rounded-full border-2 border-ink-950 object-cover transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                    />
                  ))}
                  <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink-950 bg-volt-300 text-[0.62rem] font-bold text-ink-950">
                    +2k
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-volt-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-3.5 w-3.5" />
                    ))}
                    <span className="ml-1.5 text-[0.8rem] font-semibold text-white">4.9</span>
                  </div>
                  <p className="text-[0.78rem] text-white/45">
                    from <Counter to={12480} /> athlete reviews
                  </p>
                </div>
              </div>

              <div className="hidden h-10 w-px bg-white/10 sm:block" />

              <div className="flex items-center gap-2 text-[0.82rem] text-white/50">
                <Icon name="shield" className="h-4 w-4 text-volt-300/80" />
                Free forever plan · no card required
              </div>
            </div>
          </Reveal>
        </div>

        {/* Layered product composition */}
        <Reveal delay={180} direction="scale" className="relative">
          <div className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-volt-300/14 via-iris-400/10 to-aqua-400/14 blur-2xl"
            />

            {/* Photo card */}
            <div className="hairline relative overflow-hidden rounded-[2rem] shadow-[0_50px_90px_-50px_rgba(0,0,0,1)]">
              <img
                src="https://images.pexels.com/photos/15549976/pexels-photo-15549976.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                alt="Athlete resting on a barbell between working sets"
                className="h-[17rem] w-full object-cover object-[50%_28%] sm:h-[20rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.7rem] font-medium text-white/85">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-rose-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
                  </span>
                  Week 6 · Strength block
                </span>
                <span className="glass hidden rounded-full px-3 py-1.5 text-[0.7rem] font-medium text-white/85 sm:inline-flex">
                  Coach Maya Okafor
                </span>
              </div>
            </div>

            {/* Session player overlapping the photo */}
            <div className="relative z-10 -mt-20 ml-0 sm:-mt-24 sm:ml-10 lg:-mr-6">
              <SessionPlayer compact />
            </div>

            {/* Floating microstats */}
            <div className="animate-float glass pointer-events-none absolute top-[11.5rem] -left-3 z-20 hidden rounded-2xl px-3.5 py-2.5 shadow-[0_20px_44px_-24px_rgba(0,0,0,1)] sm:block lg:-left-8">
              <p className="text-[0.6rem] tracking-[0.16em] text-white/45 uppercase">Streak</p>
              <p className="font-display text-lg font-semibold text-white">
                <Counter to={64} /> days 🔥
              </p>
            </div>

            <div
              className="animate-float glass pointer-events-none absolute top-[6rem] -right-2 z-20 hidden rounded-2xl px-3.5 py-2.5 shadow-[0_20px_44px_-24px_rgba(0,0,0,1)] sm:block lg:-right-9"
              style={{ animationDelay: "-7s" }}
            >
              <p className="text-[0.6rem] tracking-[0.16em] text-white/45 uppercase">New PR</p>
              <p className="font-display text-lg font-semibold text-volt-300">+7.5 kg squat</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
