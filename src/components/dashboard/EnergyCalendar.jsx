import { useMemo } from "react"

export default function EnergyCalendar({
  entries = [],
  onSelect,
  selectedEntry,
}) {
  //────────────────────────────
  // GROUP BY DAY
  //────────────────────────────

  const map = useMemo(() => {
    const m = new Map()

    entries.forEach((e) => {
      const date = new Date(e.date)
        .toISOString()
        .split("T")[0]

      if (!m.has(date)) {
        m.set(date, [])
      }

      m.get(date).push(e)
    })

    return m
  }, [entries])

  //────────────────────────────
  // GET ENERGY SCORE PER DAY
  //────────────────────────────

  const days = useMemo(() => {
    return Array.from(map.entries()).map(([date, items]) => {
      const avg =
        items.reduce((a, b) => a + Number(b.energy || 0), 0) /
        items.length

      return {
        date,
        energy: avg,
        count: items.length,
      }
    })
  }, [map])

  //────────────────────────────
  // RENDER GRID (30 DAYS VIEW)
  //────────────────────────────

  return (
    <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-6">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Energy Calendar
        </h3>

        <span className="text-xs text-black/40">
          Click a day to open entry
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">

        {days.map((d) => {
          const intensity = Math.min(1, d.energy / 10)

          return (
            <div
              key={d.date}
              onClick={() => onSelect?.(d.date)}
              className={`
                h-10 rounded-lg cursor-pointer transition
                flex items-center justify-center text-xs
                ${
                  selectedEntry?.date === d.date
                    ? "ring-2 ring-[#6A1E2B]"
                    : ""
                }
              `}
              style={{
                backgroundColor: `rgba(106,30,43,${intensity})`,
                color: intensity > 0.5 ? "white" : "black",
              }}
              title={`${d.date} | avg energy: ${d.energy.toFixed(1)}`}
            >
              {new Date(d.date).getDate()}
            </div>
          )
        })}

      </div>

    </div>
  )
}