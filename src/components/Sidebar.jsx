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
<aside
className="
w-[380px]
min-h-screen
flex
flex-col

  bg-gradient-to-b
  from-[#4b1117]
  via-[#611a21]
  to-[#3d0d13]

  text-white

  backdrop-blur-3xl
  border-r
  border-white/10
  "
>

  {/* LOGO */}

  <div
    className="
    px-8
    pt-8
    pb-6
    border-b
    border-white/10
    "
  >
    <div
      className="
      text-[11px]
      uppercase
      tracking-[0.35em]
      text-white/50
      "
    >
      PERSONAL ENERGY SYSTEM
    </div>

    <h1
      className="
      mt-3
      text-3xl
      font-semibold
      tracking-tight
      "
    >
      EnergyOS
    </h1>
  </div>

  {/* SCORE */}

  <div className="p-6">

    <div
      className="
      rounded-[34px]
      bg-white/[0.08]
      backdrop-blur-3xl
      border
      border-white/10
      p-6

      transition-all
      duration-500

      hover:bg-white/[0.12]
      hover:border-white/20
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
        Energy Score
      </div>

      <div
        className="
        text-6xl
        font-semibold
        mt-4
        "
      >
        {average}
      </div>

      <div
        className="
        mt-2
        text-sm
        text-white/60
        "
      >
        Personal index
      </div>

    </div>

  </div>

  {/* STATS */}

  <div
    className="
    px-6
    grid
    grid-cols-2
    gap-3
    "
  >

    <div
      className="
      rounded-3xl
      bg-white/[0.06]
      border
      border-white/10
      p-4
      "
    >
      <div className="text-white/50 text-xs">
        Entries
      </div>

      <div className="text-2xl mt-2">
        {entries.length}
      </div>
    </div>

    <div
      className="
      rounded-3xl
      bg-white/[0.06]
      border
      border-white/10
      p-4
      "
    >
      <div className="text-white/50 text-xs">
        Streak
      </div>

      <div className="text-2xl mt-2">
        {streak}
      </div>
    </div>

  </div>

  {/* NAVIGATION */}

  <div className="px-6 mt-8">

    <div
      className="
      text-[11px]
      uppercase
      tracking-[0.25em]
      text-white/40
      mb-4
      "
    >
      Navigation
    </div>

    {[
      "Dashboard",
      "Analytics",
      "Timeline",
      "Insights",
    ].map((item) => (

      <div
        key={item}
        className="
        px-5
        py-4
        rounded-2xl

        text-white/75

        transition-all
        duration-300

        hover:bg-white/10
        hover:text-white
        hover:translate-x-1

        cursor-pointer
        "
      >
        {item}
      </div>

    ))}

  </div>

  {/* TIMELINE */}

  <div
    className="
    flex-1
    overflow-y-auto
    px-6
    mt-8
    "
  >

    <div
      className="
      text-[11px]
      uppercase
      tracking-[0.25em]
      text-white/40
      mb-4
      "
    >
      Recent Activity
    </div>

    {grouped.slice(0, 7).map(
      ([date, items]) => (

        <div
          key={date}
          className="mb-6"
        >

          <div
            className="
            text-xs
            text-white/35
            mb-3
            "
          >
            {date}
          </div>

          {items.slice(0, 2).map(
            (item, i) => (

              <div
                key={i}
                className="
                rounded-2xl
                bg-white/[0.05]
                border
                border-white/10

                p-4
                mb-2

                transition-all
                duration-300

                hover:bg-white/[0.08]
                hover:border-white/20
                "
              >

                <div
                  className="
                  flex
                  justify-between
                  "
                >
                  <span>
                    {item.activity}
                  </span>

                  <span className="text-white/50">
                    {item.energy}
                  </span>
                </div>

                <div
                  className="
                  mt-2
                  text-xs
                  text-white/40
                  "
                >
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

  <div className="p-6">

    <div
      className="
      rounded-[30px]

      bg-gradient-to-br
      from-white/10
      to-white/5

      border
      border-white/10

      p-5
      "
    >

      <div
        className="
        text-xs
        uppercase
        tracking-[0.2em]
        text-white/40
        "
      >
        Premium
      </div>

      <div
        className="
        mt-3
        text-lg
        font-medium
        "
      >
        AI Energy Insights
      </div>

      <div
        className="
        mt-2
        text-sm
        text-white/50
        "
      >
        Forecast trends,
        detect patterns
        and discover your
        peak performance.
      </div>

    </div>

  </div>

  {/* LOGOUT */}

  <div
    className="
    p-6
    border-t
    border-white/10
    "
  >

    <button
      onClick={logout}
      className="
      w-full
      py-4
      rounded-2xl

      bg-white/10
      border
      border-white/10

      transition-all
      duration-300

      hover:bg-white/15
      hover:border-white/20
      "
    >
      Logout
    </button>

  </div>

</aside>

)
}
