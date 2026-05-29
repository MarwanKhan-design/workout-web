"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

type ChartData = {
  date: string
  value: number
}

type SessionsChartProps = {
  data: ChartData[]
  title?: string
}

export default function SessionsChart({
  data,
  title,
}: SessionsChartProps) {
  return (
    <div className="rounded-2xl border p-4 bg-background">
      {title && (
        <h2 className="text-lg font-semibold mb-4">
          {title}
        </h2>
      )}

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}