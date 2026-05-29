"use client"

import SessionsChart from "./line-chart"
import AreaProgressChart from "./AreaProgressChart"
import ActivityHeatmap from "./HeatMap"

type ChartData = {
  date: string
  value: number
}

type HeatmapData = {
  date: string
  count: number
}

type ChartsCardProps = {
  sessionsData: ChartData[]
  progressData: ChartData[]
  heatmapData: HeatmapData[]
}

export default function ChartsCard({
  sessionsData,
  progressData,
  heatmapData,
}: ChartsCardProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Sessions Chart */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm">
        <SessionsChart
          title="Sessions"
          data={sessionsData}
        />
      </div>

      {/* Area Progress Chart */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm">
        <AreaProgressChart
          title="Workout Progress"
          data={progressData}
        />
      </div>

      {/* Heatmap */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm lg:col-span-2">
        <ActivityHeatmap data={heatmapData} />
      </div>
    </div>
  )
}