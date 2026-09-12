"use client";

import SessionsChart from "./line-chart";
import AreaProgressChart from "./AreaProgressChart";
import ActivityHeatmap from "./HeatMap";

type ChartData = {
  date: string;
  value: number;
};

type HeatmapData = {
  date: string;
  count: number;
};

type ChartsCardProps = {
  sessionsData: ChartData[];
  progressData: ChartData[];
  heatmapData: HeatmapData[];
};

export default function ChartsCard({
  sessionsData,
  progressData,
  heatmapData,
}: ChartsCardProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Sessions Chart */}
      <SessionsChart title="Sessions Frequency" data={sessionsData} />

      {/* Area Progress Chart */}
      <AreaProgressChart title="Workout Volume Progress" data={progressData} />

      {/* Heatmap spans full width */}
      <div className="lg:col-span-2">
        <ActivityHeatmap data={heatmapData} />
      </div>
    </div>
  );
}
