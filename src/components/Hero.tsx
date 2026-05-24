export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50">
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.sky.100),white)] opacity-40" />

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-12 px-6 py-20 md:flex-row md:items-center md:justify-between md:py-28">
        
        {/* Left Content Column */}
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 ring-1 ring-inset ring-sky-700/10">
            Workout Web
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl/tight">
            Plan, track, and crush{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-sky-600 to-blue-700">
              your workouts.
            </span>
          </h1>
          
          <p className="text-base text-slate-600 sm:text-lg/relaxed">
            Create custom routines, log your exercises, and stay consistent with an 
            intelligent dashboard designed to keep you moving forward.
          </p>
          
          <div className="flex flex-wrap gap-3.5 pt-2">
            <a
              href="/workout-session"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm shadow-sky-600/10 transition-all hover:bg-sky-700 hover:shadow-sky-600/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Start a workout
            </a>
            <a
              href="/exercises"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
            >
              Browse exercises
            </a>
          </div>
        </div>

        {/* Right Preview Card Column */}
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-100/50 ring-1 ring-black/[0.02] transition-all hover:shadow-2xl hover:shadow-slate-100/70">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Today&apos;s Focus
              </p>
              <h3 className="mt-0.5 text-base font-semibold text-slate-900">Full Body Power</h3>
            </div>
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {/* Progress bar asset */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Estimated duration</span>
                <span className="font-medium text-slate-700">45 min</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-sky-500" />
              </div>
            </div>

            {/* Exercise List */}
            <div className="rounded-xl bg-slate-50/70 p-3 ring-1 ring-inset ring-slate-100">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between text-slate-700">
                  <span className="font-medium text-slate-800">1. Barbell Squats</span>
                  <span className="font-mono text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100 shadow-2xs">3 × 10</span>
                </li>
                <li className="flex items-center justify-between text-slate-700">
                  <span className="font-medium text-slate-800">2. Bench Press</span>
                  <span className="font-mono text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100 shadow-2xs">3 × 8</span>
                </li>
                <li className="flex items-center justify-between text-slate-700">
                  <span className="font-medium text-slate-800">3. Conventional Deadlifts</span>
                  <span className="font-mono text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100 shadow-2xs">3 × 5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}