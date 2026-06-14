import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    } from "recharts"
    
    export default function Insights({
    entries,
    }) {
    
    const data = [...Array(14)]
    .map((_, i) => {
    
      const d = new Date()
      d.setDate(
        d.getDate() - i
      )
    
      const date =
        d
          .toISOString()
          .split("T")[0]
    
      const day =
        entries.filter(
          (e) =>
            e.date === date
        )
    
      const avg =
        day.length
          ? day.reduce(
              (s, e) =>
                s + e.energy,
              0
            ) / day.length
          : 0
    
      return {
        day: date.slice(5),
        energy:
          Number(
            avg.toFixed(1)
          ),
      }
    
    })
    .reverse()
    
    const average =
    entries.length
    ? (
    entries.reduce(
    (s, e) =>
    s + e.energy,
    0
    ) / entries.length
    ).toFixed(1)
    : "0"
    
    const highest =
    entries.length
    ? Math.max(
    ...entries.map(
    (e) =>
    e.energy
    )
    )
    : 0
    
    return (
    
  
    <div
      className="
      rounded-[42px]
    
      bg-white/75
      backdrop-blur-3xl
    
      border
      border-black/5
    
      p-8
    
      transition-all
      duration-700
    
      hover:shadow-[0_30px_100px_rgba(127,29,29,0.08)]
      "
    >
    
      {/* HEADER */}
    
      <div
        className="
        flex
        justify-between
        items-start
        mb-10
        "
      >
    
        <div>
    
          <div
            className="
            text-[11px]
            uppercase
            tracking-[0.3em]
            text-black/35
            "
          >
            Analytics
          </div>
    
          <h2
            className="
            text-4xl
            font-semibold
            tracking-tight
            mt-3
            "
          >
            Energy Flow
          </h2>
    
        </div>
    
        <div className="text-right">
    
          <div
            className="
            text-black/35
            text-sm
            "
          >
            Average
          </div>
    
          <div
            className="
            text-4xl
            font-semibold
            mt-2
            "
          >
            {average}
          </div>
    
        </div>
    
      </div>
    
      {/* CHART */}
    
      <div className="h-[360px]">
    
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
    
          <AreaChart data={data}>
    
            <defs>
    
              <linearGradient
                id="premiumEnergy"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
    
                <stop
                  offset="0%"
                  stopColor="#7f1d1d"
                  stopOpacity={0.12}
                />
    
                <stop
                  offset="100%"
                  stopColor="#7f1d1d"
                  stopOpacity={0}
                />
    
              </linearGradient>
    
            </defs>
    
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill:
                  "#9ca3af",
                fontSize: 11,
              }}
            />
    
            <Tooltip
              cursor={false}
              contentStyle={{
                background:
                  "rgba(255,255,255,0.95)",
    
                border:
                  "1px solid rgba(127,29,29,0.08)",
    
                borderRadius:
                  "18px",
    
                backdropFilter:
                  "blur(24px)",
    
                boxShadow:
                  "0 20px 60px rgba(127,29,29,0.08)",
              }}
            />
    
            <Area
              type="monotone"
              dataKey="energy"
    
              stroke="#7f1d1d"
              strokeWidth={2}
    
              fill="url(#premiumEnergy)"
    
              dot={false}
    
              activeDot={{
                r: 6,
                fill:
                  "#7f1d1d",
                stroke:
                  "#ffffff",
                strokeWidth: 3,
              }}
            />
    
          </AreaChart>
    
        </ResponsiveContainer>
    
      </div>
    
      {/* INSIGHTS */}
    
      <div
        className="
        grid
        grid-cols-3
        gap-4
        mt-10
        "
      >
    
        <div
          className="
          rounded-3xl
    
          bg-[#fafafa]
    
          border
          border-black/5
    
          p-5
    
          transition-all
          duration-500
    
          hover:border-red-200
          hover:shadow-[0_10px_30px_rgba(127,29,29,0.06)]
          "
        >
    
          <div
            className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-black/35
            "
          >
            Average
          </div>
    
          <div
            className="
            text-3xl
            font-semibold
            mt-3
            "
          >
            {average}
          </div>
    
        </div>
    
        <div
          className="
          rounded-3xl
    
          bg-[#fafafa]
    
          border
          border-black/5
    
          p-5
    
          transition-all
          duration-500
    
          hover:border-red-200
          hover:shadow-[0_10px_30px_rgba(127,29,29,0.06)]
          "
        >
    
          <div
            className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-black/35
            "
          >
            Peak Energy
          </div>
    
          <div
            className="
            text-3xl
            font-semibold
            mt-3
            "
          >
            {highest}
          </div>
    
        </div>
    
        <div
          className="
          rounded-3xl
    
          bg-gradient-to-br
          from-[#55151a]
          to-[#7f1d1d]
    
          text-white
    
          p-5
    
          transition-all
          duration-500
    
          hover:shadow-[0_20px_50px_rgba(127,29,29,0.25)]
          "
        >
    
          <div
            className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-white/50
            "
          >
            AI Insight
          </div>
    
          <div
            className="
            mt-3
            text-sm
            leading-relaxed
            text-white/90
            "
          >
            Your energy pattern
            shows the highest
            performance after
            focused work sessions.
          </div>
    
        </div>
    
      </div>
    
    </div>
    
    )
    }
    