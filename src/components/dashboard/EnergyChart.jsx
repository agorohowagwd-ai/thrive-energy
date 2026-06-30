import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceDot,
  } from "recharts"
  
  export default function EnergyChart({
    weeklyData = [],
    peaks = [],
    onPointClick,
    range = "week",
  }) {
  
    return (
      <section className="relative z-10">
  
        <div
          className="
          rounded-[32px]
          bg-white/70
          backdrop-blur-2xl
          border
          border-black/5
          p-8
        "
        >
  
          <div className="flex items-center justify-between">
  
            <div>
  
              <div className="text-[11px] uppercase tracking-[0.3em] text-black/40">
                Energy Timeline
              </div>
  
              <h2 className="mt-3 text-2xl font-semibold">
                {range.toUpperCase()} View
              </h2>
  
            </div>
  
            <div className="text-sm text-black/40">
  
              {weeklyData.length} points
  
            </div>
  
          </div>
  
          <div className="mt-8 h-[340px]">
  
            {weeklyData.length > 1 ? (
  
              <ResponsiveContainer>
  
                <LineChart
                  data={weeklyData}
                >
  
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.15}
                  />
  
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                  />
  
                  <YAxis
                    domain={[0, 10]}
                  />
  
                  <Tooltip />
  
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#6A1E2B"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      cursor: "pointer",
                    }}
                    activeDot={{
                      r: 7,
                      onClick: (_, payload) =>
                        onPointClick?.(payload.payload),
                    }}
                  />
  
                  {peaks.map((peak) => (
  
                    <ReferenceDot
                      key={peak.date}
                      x={peak.date}
                      y={peak.energy}
                      r={8}
                      fill="#FFD700"
                      stroke="#6A1E2B"
                    />
  
                  ))}
  
                </LineChart>
  
              </ResponsiveContainer>
  
            ) : (
  
              <div className="h-full flex items-center justify-center text-black/40">
  
                Add at least two entries
  
              </div>
  
            )}
  
          </div>
  
        </div>
  
      </section>
    )
  
  }