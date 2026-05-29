"use client"

import AreaProgressChart from "./AreaProgressChart"
import ActivityHeatmap from "./HeatMap"
import SessionCharts from "./line-chart"

type ProgressData = {
  date: string
  value: number
}

type HeatmapData = {
  date: string
  count: number
}

type ChartsCardProps = {
  progressData: ProgressData[]
  heatmapData: HeatmapData[]
}

export default function ChartsCard({
  progressData,
  heatmapData,
}: ChartsCardProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm">
        <AreaProgressChart
          title="Workout Progress"
          data={progressData}
        />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm">
        <ActivityHeatmap data={heatmapData} />
      </div>
    </div>
  )
}