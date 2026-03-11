import type { Exercise } from '../lib/types'

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <header className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{exercise.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{exercise.category}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
          {exercise.muscleGroup}
        </span>
      </header>

      <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
        <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5">
          Equipment: <span className="ml-1 font-medium">{exercise.equipment || 'Bodyweight'}</span>
        </span>
        <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5">
          Id: <span className="ml-1 font-mono text-[10px] text-slate-500">{exercise._id}</span>
        </span>
      </div>

      {exercise.description && (
        <p className="mt-1 line-clamp-2 text-xs text-slate-600">{exercise.description}</p>
      )}
    </article>
  )
}