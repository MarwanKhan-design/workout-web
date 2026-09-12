type ActivityData = {
  date: string
  count: number
}

type ActivityHeatmapProps = {
  data: ActivityData[]
}

export default function ActivityHeatmap({
  data,
}: ActivityHeatmapProps) {
  const getIntensity = (count: number) => {
    if (count === 0) return "bg-white/[0.05] border border-white/8 hover:border-white/20"
    if (count <= 2) return "bg-volt-500/30 border border-volt-500/40 text-white hover:bg-volt-500/40"
    if (count <= 4) return "bg-volt-400/70 border border-volt-400/70 text-ink-950 shadow-[0_0_10px_rgba(195,248,63,0.3)]"

    return "bg-volt-300 border border-volt-300 text-ink-950 shadow-[0_0_14px_rgba(214,255,102,0.6)]"
  }

  return (
    <div className="glass-strong rounded-2xl border border-white/10 p-5 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">
          Activity Heatmap
        </h2>
        <span className="text-xs text-white/45">Recent workouts</span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {data.map((day) => (
          <div
            key={day.date}
            className={`h-9 rounded-xl transition-all duration-200 cursor-pointer ${getIntensity(
              day.count
            )}`}
            title={`${day.date}: ${day.count} workout${day.count === 1 ? '' : 's'}`}
          />
        ))}
      </div>
    </div>
  )
}