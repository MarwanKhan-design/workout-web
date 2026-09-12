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
    <div className="glass-strong rounded-2xl border border-white/10 p-5 shadow-xl backdrop-blur-xl">
      {title && (
        <h2 className="font-display text-base font-semibold text-white mb-4">
          {title}
        </h2>
      )}

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255, 255, 255, 0.07)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="rgba(255, 255, 255, 0.4)"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.4)"
              fontSize={11}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(11, 13, 18, 0.95)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "0.75rem",
                color: "#ffffff",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#d6ff66", fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#d6ff66"
              strokeWidth={3}
              dot={{ fill: "#06070a", stroke: "#d6ff66", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#d6ff66" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}