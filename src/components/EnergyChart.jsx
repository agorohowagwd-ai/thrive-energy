import { useMemo, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Dot,
} from "recharts"

export default function EnergyChart({
  weeklyData = [],
  range = "week",
  onPointClick,
  peaks = [],
}) {
  const [hovered, setHovered] = useState(null)

  //────────────────────────────
  // DATA NORMALIZATION
  //────────────────────────────

  const data = useMemo(() => {
    if (!weeklyData?.length) return []

    return weeklyData.map((d) => ({
      ...d,
      energy: Number(d.energy) || 0,
    }))
  }, [weeklyData])

  //────────────────────────────
  // MAX VALUE (for scaling glow)
  //────────────────────────────

  const max = useMemo(() => {
    if (!data.length) return 10
    return Math.max(...data.map((d) => d.energy))
  }, [data])

  //────────────────────────────
  // CUSTOM DOT (PEAK + SELECTED + HOVER)
  //────────────────────────────

  function CustomDot(props) {
    const { cx, cy, payload } = props

    const isPeak = peaks?.some((p) => p.date === payload.date)
    const isHovered = hovered === payload.date

    const size = isPeak ? 10 : 6

    return (
      <circle
        cx={cx}
        cy={cy}
        r={size}
        fill={
          isPeak
            ? "#6A1E2B"
            : "#999"
        }
        opacity={isHovered ? 1 : 0.7}
        style={{ cursor: "pointer" }}
        onClick={() => onPointClick?.(payload)}
        onMouseEnter={() => setHovered(payload.date)}
        onMouseLeave={() => setHovered(null)}
      />
    )
  }

  //────────────────────────────
  // UI
  //────────────────────────────

  return (
    <div className="w-full h-[320px] md:h-[380px] rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-4">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-black/60">
          Energy Trend
        </h3>

        <div className="text-xs text-black/30">
          {range.toUpperCase()}
        </div>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          onMouseMove={(state) => {
            if (state?.activePayload?.[0]) {
              setHovered(state.activePayload[0].payload.date)
            }
          }}
          onMouseLeave={() => setHovered(null)}
        >

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            stroke="#aaa"
          />

          <YAxis
            domain={[0, max + 1]}
            tick={{ fontSize: 11 }}
            stroke="#aaa"
          />

          <Tooltip
            contentStyle={{
              background: "white",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          />

          {/* MAIN LINE */}
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#6A1E2B"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{
              r: 8,
              stroke: "#6A1E2B",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />

        </LineChart>
      </ResponsiveContainer>

      {/* FOOTER INSIGHT */}
      <div className="mt-2 text-xs text-black/40 flex justify-between">
        <span>
          Peak energy: {max}/10
        </span>

        <span>
          Click points → open entry
        </span>
      </div>

    </div>
  )
}