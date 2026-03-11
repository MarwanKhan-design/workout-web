export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:py-24">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
            Workout Web
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Plan, track, and crush
            <span className="block text-sky-600">your workouts.</span>
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Create custom workouts, log your exercises, and stay consistent with a
            simple dashboard that keeps everything in one place.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/workouts"
              className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Start a workout
            </a>
            <a
              href="/exercises"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Browse exercises
            </a>
          </div>
        </div>

        <div className="mt-8 w-full max-w-sm self-stretch rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:mt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Today&apos;s focus
          </p>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span className="font-medium text-slate-800">Full body workout</span>
              <span className="text-xs text-slate-500">45 min</span>
            </div>
            <ul className="space-y-1 text-slate-600">
              <li>• Squats 3 × 10</li>
              <li>• Bench press 3 × 8</li>
              <li>• Deadlifts 3 × 5</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
