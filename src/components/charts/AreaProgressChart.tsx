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
    <div className="glass-strong rounded-2xl border border-white/10 p-5 shadow-xl backdrop-blur-xl">
      <h2 className="font-display text-base font-semibold text-white mb-4">
        {title}
      </h2>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient
                id="colorProgressVolt"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#d6ff66"
                  stopOpacity={0.45}
                />
                <stop
                  offset="95%"
                  stopColor="#34e0bb"
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>

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
            <Area
              type="monotone"
              dataKey="value"
              stroke="#d6ff66"
              fillOpacity={1}
              fill="url(#colorProgressVolt)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}