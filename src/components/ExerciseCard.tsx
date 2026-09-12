import type { Exercise } from '../lib/types'
import { Icon } from './ui'

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <article className="glass-strong card-hover group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-5 backdrop-blur-xl transition-all duration-400 hover:border-volt-300/40">
      {/* Ambient hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-aqua-400/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div>
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-base font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-volt-300">
              {exercise.name}
            </h3>
            {exercise.category && (
              <p className="mt-1 text-xs font-medium text-white/50 uppercase tracking-wider">
                {exercise.category}
              </p>
            )}
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-volt-300/25 bg-volt-300/10 px-2.5 py-1 text-[11px] font-semibold text-volt-300 uppercase tracking-wider">
            <Icon name="bolt" className="h-3 w-3" />
            {exercise.muscleGroup}
          </span>
        </header>

        {exercise.description && (
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-white/60">
            {exercise.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/8 pt-3 text-[11px] text-white/50">
        <span className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5">
          Equipment:{" "}
          <span className="ml-1 font-medium text-white/80">
            {exercise.equipment || "Bodyweight"}
          </span>
        </span>
        {exercise._id && (
          <span className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5">
            Id:{" "}
            <span className="ml-1 font-mono text-[10px] text-white/70">
              {exercise._id}
            </span>
          </span>
        )}
      </div>
    </article>
  )
}