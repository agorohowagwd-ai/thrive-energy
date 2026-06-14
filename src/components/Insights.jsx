import { useMemo, useState } from "react"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts"

const PERIODS = [
  {
    id: "7",
    label: "7D",
    days: 7,
  },
  {
    id: "30",
    label: "30D",
    days: 30,
  },
  {
    id: "90",
    label: "90D",
    days: 90,
  },
]

export default function Insights({
  entries,
}) {
  const [period, setPeriod] =
    useState("30")

  const selected =
    PERIODS.find(
      (item) =>
        item.id === period
    )

  const data = useMemo(() => {
    const result = []

    for (
      let i = selected.days - 1;
      i >= 0;
      i--
    ) {
      const date =
        new Date()

      date.setDate(
        date.getDate() - i
      )

      const key =
        date
          .toISOString()
          .split("T")[0]

      const dayEntries =
        entries.filter(
          (entry) =>
            entry.date === key
        )

      const average =
        dayEntries.length > 0
          ? dayEntries.reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.energy,
              0
            ) /
            dayEntries.length
          : 0

      result.push({
        date: key,

        label:
          date.toLocaleDateString(
            "en-US",
            {
              month:
                "short",
              day: "numeric",
            }
          ),

        energy:
          Number(
            average.toFixed(1)
          ),
      })
    }

    return result
  }, [entries, selected])

  const average =
    data.length
      ? (
          data.reduce(
            (
              sum,
              item
            ) =>
              sum +
              item.energy,
            0
          ) / data.length
        ).toFixed(1)
      : "0"

  const highest =
    Math.max(
      ...data.map(
        (d) => d.energy
      )
    )

  const lowest =
    Math.min(
      ...data.map(
        (d) => d.energy
      )
    )

  const trend =
    data.length > 1
      ? (
          data[
            data.length - 1
          ].energy -
          data[0].energy
        ).toFixed(1)
      : 0

  const insight =
    trend > 0
      ? "Your energy has been improving over the selected period."
      : trend < 0
      ? "Energy has slightly decreased. Consider adding more recovery time."
      : "Your energy has remained stable over this period."

  function CustomTooltip({
    active,
    payload,
    label,
  }) {
    if (
      !active ||
      !payload ||
      !payload.length
    ) {
      return null
    }

    const value =
      payload[0].value
      return (
        <div
          className="
          rounded-3xl
          border
          border-black/5
          bg-white/80
          backdrop-blur-3xl
          p-8
  
          transition-all
          duration-500
  
          hover:shadow-[0_35px_90px_rgba(91,23,33,.12)]
          hover:border-[#6A1E2B]/20
          "
        >
          <div className="flex items-start justify-between">
  
            <div>
  
              <div
                className="
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-black/40
                "
              >
                Thrive Analytics
              </div>
  
              <h2
                className="
                mt-3
                text-4xl
                font-semibold
                tracking-tight
                "
              >
                Energy Trends
              </h2>
  
              <p
                className="
                mt-3
                text-black/45
                "
              >
                Visualize how your energy changes over time.
              </p>
  
            </div>
  
            <div
              className="
              flex
              rounded-2xl
              bg-[#faf7f5]
              border
              border-black/5
              p-1
              gap-1
              "
            >
  
              {PERIODS.map((item) => (
  
                <button
                  key={item.id}
                  onClick={() =>
                    setPeriod(item.id)
                  }
                  className={`
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-300
  
                    ${
                      period === item.id
                        ? "bg-[#5B1721] text-white shadow-lg"
                        : "text-black/50 hover:text-[#5B1721]"
                    }
                  `}
                >
                  {item.label}
                </button>
  
              ))}
  
            </div>
  
          </div>
  
          <div className="mt-10 h-[360px]">
  
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
  
              <AreaChart
                data={data}
              >
  
                <defs>
  
                  <linearGradient
                    id="energyGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
  
                    <stop
                      offset="0%"
                      stopColor="#6A1E2B"
                      stopOpacity={0.22}
                    />
  
                    <stop
                      offset="100%"
                      stopColor="#6A1E2B"
                      stopOpacity={0}
                    />
  
                  </linearGradient>
  
                </defs>
  
                <CartesianGrid
                  strokeDasharray="4 10"
                  stroke="#f3f4f6"
                  vertical={false}
                />
  
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9ca3af",
                    fontSize: 11,
                  }}
                />
  
                <Tooltip
                  cursor={{
                    stroke: "#6A1E2B",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  content={<CustomTooltip />}
                />
  
                <Area
                  type="monotone"
                  dataKey="energy"
                  stroke="#5B1721"
                  strokeWidth={2.4}
                  fill="url(#energyGradient)"
                  animationDuration={1400}
                  animationEasing="ease"
  
                  activeDot={{
                    r: 6,
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    fill: "#5B1721",
                  }}
  
                  dot={false}
                />
  
              </AreaChart>
  
            </ResponsiveContainer>
  
          </div>
  
          <div
            className="
            mt-8
            grid
            grid-cols-3
            gap-5
            "
          >
  
            <MetricCard
              title="Average"
              value={average}
              subtitle="Energy score"
            />
  
            <MetricCard
              title="Peak"
              value={highest}
              subtitle="Best day"
            />
  
            <MetricCard
              title="Lowest"
              value={lowest}
              subtitle="Recovery"
            />
  
          </div>
  
          <div
            className="
            mt-8
            rounded-[30px]
            border
            border-[#6A1E2B]/10
            bg-gradient-to-br
            from-[#fbf7f6]
            to-white
            p-6
  
            transition-all
            duration-500
  
            hover:border-[#6A1E2B]/20
            hover:shadow-[0_25px_80px_rgba(91,23,33,.08)]
            "
          >
                      <div
            className="
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-[#6A1E2B]/70
            "
          >
            AI Insight
          </div>

          <div
            className="
            mt-3
            text-2xl
            font-semibold
            tracking-tight
            "
          >
            Today's Recommendation
          </div>

          <p
            className="
            mt-4
            leading-7
            text-black/60
            max-w-3xl
            "
          >
            {insight}
          </p>

        </div>

      </div>
    )
  }

  function MetricCard({
    title,
    value,
    subtitle,
  }) {

    return (

      <div
        className="
        rounded-[26px]
        border
        border-black/5
        bg-[#fcfbfa]
        p-5

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-[#6A1E2B]/20
        hover:shadow-[0_18px_50px_rgba(91,23,33,.08)]
        "
      >

        <div
          className="
          text-xs
          uppercase
          tracking-[0.25em]
          text-black/35
          "
        >
          {title}
        </div>

        <div
          className="
          mt-4
          text-4xl
          font-semibold

          transition-colors
          duration-300

          hover:text-[#6A1E2B]
          "
        >
          {value}
        </div>

        <div
          className="
          mt-2
          text-sm
          text-black/45
          "
        >
          {subtitle}
        </div>

      </div>

    )

  }

  function CustomTooltip({
    active,
    payload,
  }) {

    if (
      !active ||
      !payload ||
      !payload.length
    ) {
      return null
    }

    const point =
      payload[0].payload

    return (

      <div
        className="
        rounded-[22px]
        border
        border-[#6A1E2B]/10
        bg-white/95
        backdrop-blur-3xl

        px-5
        py-4

        shadow-[0_25px_60px_rgba(91,23,33,.12)]
        "
      >

        <div
          className="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-black/35
          "
        >
          {point.label}
        </div>

        <div
          className="
          mt-3
          text-3xl
          font-semibold
          text-[#5B1721]
          "
        >
          {point.energy}
        </div>

        <div
          className="
          mt-2
          text-sm
          text-black/50
          "
        >
          Energy Score
        </div>

      </div>

    )

  }

}