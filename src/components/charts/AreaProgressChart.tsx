"use client"

import {
  AreaChart,
  Area,
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

type AreaProgressChartProps = {
  title: string
  data: ChartData[]
}

export default function AreaProgressChart({
  title,
  data,
}: AreaProgressChartProps) {
  return (
    <div className="rounded-2xl border p-5">
      <h2 className="mb-5 text-lg font-semibold">
        {title}
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="colorProgress"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorProgress)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}