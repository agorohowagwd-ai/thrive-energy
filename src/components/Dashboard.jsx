import { useMemo, useState } from "react"

import KPIGrid from "./dashboard/KPIGrid"
import AICoachCard from "./dashboard/AICoachCard"
import EnergyChart from "./dashboard/EnergyChart"

import PremiumBanner from "./premium/PremiumBanner"
import PremiumModal from "./premium/PremiumModal"

import useSubscription from "../hooks/useSubscription"

export default function Dashboard({
  user,

  entries = [],
  weeklyData = [],
  stats = null,

  activity,
  setActivity,

  notes,
  setNotes,

  energy,
  setEnergy,

  category,
  setCategory,

  mood,
  setMood,

  addEntry,
  deleteEntry,
}) {

  //────────────────────────────
  // UI
  //────────────────────────────

  const [range, setRange] = useState("week")

  const [selectedEntry, setSelectedEntry] =
    useState(null)

  const [showPremium, setShowPremium] =
    useState(false)

  //────────────────────────────
  // SUBSCRIPTION
  //────────────────────────────

  const subscription =
    useSubscription(user)

  //────────────────────────────
  // SORT
  //────────────────────────────

  const sortedEntries = useMemo(() => {
    if (!entries.length) return []

    return [...entries].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
  }, [entries])

  //────────────────────────────
  // PEAKS
  //────────────────────────────

  const peaks = useMemo(() => {
    if (!weeklyData.length) return []

    const max = Math.max(
      ...weeklyData.map(
        (d) => d.energy || 0
      )
    )

    return weeklyData.filter(
      (d) => d.energy === max
    )
  }, [weeklyData])

  //────────────────────────────
  // CHART CLICK
  //────────────────────────────

  function handlePointClick(data) {
    if (!data?.date) return

    const match = entries.find(
      (e) => e.date === data.date
    )

    if (!match) return

    setSelectedEntry(match)

    const el =
      document.getElementById(
        `entry-${match.id}`
      )

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  //────────────────────────────
  // UI
  //────────────────────────────

  return (
    <main className="flex-1 min-w-0 min-h-screen overflow-x-hidden bg-paper">

      {/* HERO */}

      <header className="iridescent relative min-h-[420px] md:min-h-[520px] flex flex-col justify-end text-paper">

        <div className="absolute top-0 inset-x-0 h-[66px] px-5 md:px-10 flex items-center justify-between">

          <span className="eyebrow !text-white/80">
            Thrive
          </span>

          <span className="eyebrow !text-white/80">
            {new Date().toLocaleDateString()}
          </span>

        </div>

        <div className="relative px-5 md:px-10 pb-10 md:pb-14 reveal">

          <h1 className="text-[64px] sm:text-[94px] xl:text-[150px] font-normal leading-[0.85]">
            Dashboard
          </h1>

          <p className="mt-6 max-w-md text-[18px] leading-[1.4] font-light text-white/85">
            Track energy, detect patterns,
            and unlock AI insights
          </p>

        </div>

        {/* ROTATING BADGE */}

        <svg
          viewBox="0 0 100 100"
          className="badge-spin hidden md:block absolute right-10 bottom-12 w-[110px] h-[110px] text-white"
          aria-hidden="true"
        >
          <defs>
            <path
              id="badge-circle"
              d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
            />
          </defs>
          <text fontSize="9.5" fill="currentColor" letterSpacing="2">
            <textPath href="#badge-circle">
              TRACK · DETECT · UNLOCK · THRIVE ·
            </textPath>
          </text>
        </svg>

      </header>

      <div className="max-w-page mx-auto px-5 md:px-10 xl:px-0">

        {/* PREMIUM */}

        <div className="mt-[46px]">

          <PremiumBanner
            user={user}
            onUpgrade={() =>
              setShowPremium(true)
            }
          />

        </div>

        {/* KPI */}

        <div className="mt-[46px]">

          <KPIGrid stats={stats} />

        </div>

      </div>

      {/* AI — black band */}

      <div className="mt-[46px] bg-obsidian text-paper">

        <div className="max-w-page mx-auto px-5 md:px-10 xl:px-0 py-16 md:py-24">

          {subscription.locked ? (

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">

              <div className="max-w-xl">

                <div className="eyebrow !text-ash">
                  Locked
                </div>

                <h2 className="mt-5 text-[45px] md:text-[78px] font-light leading-[1.05]">

                  AI Coach is Premium

                </h2>

                <p className="mt-6 text-[18px] leading-[1.58] text-ash">

                  Unlock personalized
                  recommendations,
                  weekly reports,
                  future predictions
                  and AI Memory.

                </p>

              </div>

              <button
                onClick={() =>
                  setShowPremium(true)
                }
                className="pill pill-dark self-start md:self-end"
              >

                Upgrade

              </button>

            </div>

          ) : stats ? (

            <AICoachCard
              entries={entries}
              stats={stats}
            />

          ) : (

            <div className="text-ash">

              Loading AI...

            </div>

          )}

        </div>

      </div>

      <div className="max-w-page mx-auto px-5 md:px-10 xl:px-0 pb-24">

        {/* RANGE */}

        <div className="mt-16 flex gap-2">

          {["week", "month", "year"].map(
            (r) => (

              <button
                key={r}
                onClick={() =>
                  setRange(r)
                }
                className={`pill pill-sm ${
                  range === r
                    ? "pill-active"
                    : ""
                }`}
              >

                {r.toUpperCase()}

              </button>

            )
          )}

        </div>

        {/* CHART */}

        <div className="mt-10">

          <EnergyChart
            weeklyData={weeklyData}
            range={range}
            peaks={peaks}
            onPointClick={
              handlePointClick
            }
          />

        </div>

        {/* GRID */}

        <div className="mt-24 grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-16 xl:gap-20">

          {/* FORM */}

          <div>

            <div className="eyebrow">
              01 — Log
            </div>

            <h2 className="mt-4 text-[45px] font-light leading-[1.15]">
              Log Energy
            </h2>

            <input
              className="field mt-8"
              placeholder="Activity"
              value={activity}
              onChange={(e) =>
                setActivity(
                  e.target.value
                )
              }
            />

            <textarea
              className="field mt-2 h-28 resize-none"
              placeholder="Notes"
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
            />

            <input
              className="field mt-2"
              placeholder="Energy"
              value={energy}
              onChange={(e) =>
                setEnergy(
                  e.target.value
                )
              }
            />

            <div className="mt-8 flex gap-2 flex-wrap">

              {[
                "Work",
                "Health",
                "Study",
                "Social",
              ].map((c) => (

                <button
                  key={c}
                  onClick={() =>
                    setCategory(c)
                  }
                  className={`pill pill-sm ${
                    category === c
                      ? "pill-active"
                      : ""
                  }`}
                >

                  {c}

                </button>

              ))}

            </div>

            <div className="mt-4 flex gap-2">

              {[
                "🙂",
                "😐",
                "😃",
                "⚡",
              ].map((m) => (

                <button
                  key={m}
                  onClick={() =>
                    setMood(m)
                  }
                  className={`w-12 h-12 rounded-pill border transition-colors duration-[400ms] ${
                    mood === m
                      ? "border-obsidian bg-obsidian"
                      : "border-black/20 hover:border-obsidian"
                  }`}
                >

                  {m}

                </button>

              ))}

            </div>

            <button
              onClick={addEntry}
              className="pill pill-active w-full mt-10"
            >

              Save Entry

            </button>

          </div>

          {/* TIMELINE */}

          <div>

            <div className="eyebrow">
              02 — History
            </div>

            <h2 className="mt-4 text-[45px] font-light leading-[1.15]">

              Timeline

            </h2>

            <div className="mt-8 border-t border-obsidian">

              {!sortedEntries.length && (

                <div className="py-6 text-felt">

                  No entries yet

                </div>

              )}

              {sortedEntries.map((e) => (

                <div
                  key={e.id}
                  id={`entry-${e.id}`}
                  onClick={() =>
                    setSelectedEntry(e)
                  }
                  className={`group py-5 border-b cursor-pointer transition-colors duration-800 ease-expo ${
                    selectedEntry?.id ===
                    e.id
                      ? "border-obsidian bg-obsidian text-paper px-4 -mx-4"
                      : "border-black/15"
                  }`}
                >

                  <div className="flex justify-between items-baseline gap-6">

                    <div>

                      <div className="text-[18px] transition-transform duration-800 ease-expo group-hover:translate-x-2">

                        {e.activity}

                      </div>

                      <div className={`mt-1 text-[11px] uppercase ${
                        selectedEntry?.id === e.id ? "text-ash" : "text-felt"
                      }`}>

                        {e.category}

                      </div>

                    </div>

                    <div className="text-[39px] font-light leading-none">

                      {e.energy}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      <PremiumModal
        open={showPremium}
        onClose={() =>
          setShowPremium(false)
        }
      />

    </main>
  )
}
