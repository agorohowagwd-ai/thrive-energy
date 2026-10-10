import { useMemo } from "react"

export default function Sidebar({
  entries,
  logout,
}) {

  const grouped = useMemo(() => {
    const map = {}

    entries.forEach((entry) => {
      if (!map[entry.date]) {
        map[entry.date] = []
      }

      map[entry.date].push(entry)
    })

    return Object.entries(map).sort(
      (a, b) =>
        new Date(b[0]) -
        new Date(a[0])
    )
  }, [entries])

  const average =
    entries.length > 0
      ? (
          entries.reduce(
            (s, e) =>
              s + e.energy,
            0
          ) / entries.length
        ).toFixed(1)
      : "0"

  const streak = grouped.length

  return (
    <aside className="w-[340px] shrink-0 min-h-screen flex flex-col bg-obsidian text-paper">

      {/* LOGO */}

      <div className="px-8 h-[66px] flex items-center justify-between border-b border-white/20">

        <span className="text-[18px] font-semibold uppercase">
          EnergyOS
        </span>

        <span className="eyebrow !text-ash">
          Personal energy system
        </span>

      </div>

      {/* SCORE */}

      <div className="px-8 pt-12 pb-10 border-b border-white/20">

        <div className="eyebrow !text-ash">
          Energy Score
        </div>

        <div className="mt-6 text-[94px] font-light leading-[0.76]">
          {average}
        </div>

        <div className="mt-6 text-[12px] text-ash">
          Personal index
        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 border-b border-white/20">

        <div className="px-8 py-7 border-r border-white/20">
          <div className="eyebrow !text-ash">
            Entries
          </div>

          <div className="text-[39px] font-light mt-3 leading-none">
            {entries.length}
          </div>
        </div>

        <div className="px-8 py-7">
          <div className="eyebrow !text-ash">
            Streak
          </div>

          <div className="text-[39px] font-light mt-3 leading-none">
            {streak}
          </div>
        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="px-8 pt-10">

        <div className="eyebrow !text-ash mb-5">
          Navigation
        </div>

        {[
          "Dashboard",
          "Analytics",
          "Timeline",
          "Insights",
        ].map((item, i) => (

          <div
            key={item}
            className="group flex items-baseline gap-4 py-2 cursor-pointer"
          >
            <span className="text-[11px] text-felt w-5">
              0{i + 1}
            </span>

            <span className="text-[29px] font-light leading-[1.15] text-white/70 transition-all duration-800 ease-expo group-hover:text-white group-hover:translate-x-2">
              {item}
            </span>
          </div>

        ))}

      </nav>

      {/* TIMELINE */}

      <div className="flex-1 overflow-y-auto px-8 mt-12">

        <div className="eyebrow !text-ash mb-4">
          Recent Activity
        </div>

        {grouped.slice(0, 7).map(
          ([date, items]) => (

            <div
              key={date}
              className="mb-6"
            >

              <div className="text-[11px] text-felt mb-1">
                {date}
              </div>

              {items.slice(0, 2).map(
                (item, i) => (

                  <div
                    key={i}
                    className="py-3 border-b border-white/15"
                  >

                    <div className="flex justify-between text-[16px]">
                      <span>
                        {item.activity}
                      </span>

                      <span className="text-ash">
                        {item.energy}
                      </span>
                    </div>

                    <div className="mt-1 text-[11px] uppercase text-felt">
                      {item.category}
                    </div>

                  </div>

                )
              )}

            </div>

          )
        )}

      </div>

      {/* PREMIUM */}

      <div className="px-8 py-8 border-t border-white/20">

        <div className="eyebrow !text-ash">
          Premium
        </div>

        <div className="mt-3 text-[18px]">
          AI Energy Insights
        </div>

        <div className="mt-2 text-[12px] leading-[1.58] text-ash">
          Forecast trends,
          detect patterns
          and discover your
          peak performance.
        </div>

      </div>

      {/* LOGOUT */}

      <div className="px-8 pb-8">

        <button
          onClick={logout}
          className="pill pill-dark w-full"
        >
          Logout
        </button>

      </div>

    </aside>
  )
}
