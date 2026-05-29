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
      if (count === 0) return "bg-muted"
      if (count <= 2) return "bg-green-300"
      if (count <= 4) return "bg-green-500"
  
      return "bg-green-700"
    }
  
    return (
      <div className="rounded-2xl border p-5">
        <h2 className="mb-5 text-lg font-semibold">
          Activity Heatmap
        </h2>
  
        <div className="grid grid-cols-7 gap-2">
          {data.map((day) => (
            <div
              key={day.date}
              className={`h-10 rounded-md ${getIntensity(
                day.count
              )}`}
              title={`${day.date}: ${day.count} workouts`}
            />
          ))}
        </div>
      </div>
    )
  }