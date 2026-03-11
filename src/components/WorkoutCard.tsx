import type { Workout } from '../lib/types'

interface WorkoutCardProps {
  workout: Workout
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {workout.name}
          </h3>
          {workout.description ? (
            <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">
              {workout.description}
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-slate-500">No description</p>
          )}
        </div>

        <span className="shrink-0 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
          {workout.exercises?.length ?? 0} exercises
        </span>
      </header>

      <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
        <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5">
          User:{" "}
          <span className="ml-1 font-mono text-[10px] text-slate-500">
            {workout.userId}
          </span>
        </span>
        {workout._id && (
          <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5">
            Id:{" "}
            <span className="ml-1 font-mono text-[10px] text-slate-500">
              {workout._id}
            </span>
          </span>
        )}
      </div>
    </article>
  )
}