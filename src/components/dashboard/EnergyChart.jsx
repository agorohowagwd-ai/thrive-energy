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
  
        <div>
  
          <div className="flex items-end justify-between border-b border-obsidian pb-6">
  
            <div>
  
              <div className="eyebrow">
                Energy Timeline
              </div>
  
              <h2 className="mt-4 text-[45px] font-light leading-[1.15]">
                {range.toUpperCase()} View
              </h2>
  
            </div>
  
            <div className="text-[12px] uppercase text-felt">
  
              {weeklyData.length} points
  
            </div>
  
          </div>
  
          <div className="mt-10 h-[340px]">
  
            {weeklyData.length > 1 ? (
  
              <ResponsiveContainer>
  
                <LineChart
                  data={weeklyData}
                >
  
                  <CartesianGrid
                    vertical={false}
                    stroke="#000"
                    strokeOpacity={0.08}
                  />
  
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#6d6d6d" }}
                    axisLine={{ stroke: "#000" }}
                    tickLine={false}
                  />
  
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 11, fill: "#6d6d6d" }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
  
                  <Tooltip
                    cursor={{ stroke: "#000", strokeWidth: 1 }}
                    contentStyle={{
                      borderRadius: 0,
                      border: "1px solid #000",
                      boxShadow: "none",
                      fontSize: 12,
                    }}
                  />
  
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#000"
                    strokeWidth={1.5}
                    dot={{
                      r: 3,
                      fill: "#fff",
                      stroke: "#000",
                      strokeWidth: 1,
                      cursor: "pointer",
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#000",
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
                      fill="#ffac2e"
                      stroke="#000"
                      strokeWidth={1}
                    />
  
                  ))}
  
                </LineChart>
  
              </ResponsiveContainer>
  
            ) : (
  
              <div className="h-full flex items-center justify-center text-felt text-[18px] font-light">
  
                Add at least two entries
  
              </div>
  
            )}
  
          </div>
  
        </div>
  
      </section>
    )
  
  }