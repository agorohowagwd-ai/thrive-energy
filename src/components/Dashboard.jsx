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
    <main className="flex-1 min-h-screen px-5 md:px-10 xl:px-14 py-6 md:py-8 xl:py-10 overflow-x-hidden">

      {/* HEADER */}

      <div className="relative z-10">

        <h1 className="text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="text-black/40 mt-2">
          Track energy, detect patterns,
          and unlock AI insights
        </p>

      </div>

      {/* PREMIUM */}

      <div className="mt-8">

        <PremiumBanner
          user={user}
          onUpgrade={() =>
            setShowPremium(true)
          }
        />

      </div>

      {/* KPI */}

      <div className="relative z-10 mt-8">

        <KPIGrid stats={stats} />

      </div>

      {/* AI */}

      <div className="relative z-10 mt-8">

        {subscription.locked ? (

          <div className="rounded-[32px] bg-white/70 backdrop-blur-xl border border-black/5 p-10 text-center">

            <div className="text-6xl">
              🔒
            </div>

            <h2 className="mt-5 text-2xl font-semibold">

              AI Coach is Premium

            </h2>

            <p className="mt-4 text-black/50">

              Unlock personalized
              recommendations,
              weekly reports,
              future predictions
              and AI Memory.

            </p>

            <button
              onClick={() =>
                setShowPremium(true)
              }
              className="mt-8 rounded-xl bg-[#6A1E2B] px-7 py-3 text-white"
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

          <div className="rounded-[32px] bg-white/70 border border-black/5 p-8 text-black/40">

            Loading AI...

          </div>

        )}

      </div>

      {/* RANGE */}

      <div className="mt-6 flex gap-2">

        {["week", "month", "year"].map(
          (r) => (

            <button
              key={r}
              onClick={() =>
                setRange(r)
              }
              className={`px-4 py-2 rounded-full transition ${
                range === r
                  ? "bg-[#6A1E2B] text-white"
                  : "bg-white/60 border border-black/5"
              }`}
            >

              {r.toUpperCase()}

            </button>

          )
        )}

      </div>

      {/* CHART */}

      <div className="mt-8">

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

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8">

        {/* FORM */}

        <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-8">

          <h2 className="text-xl font-semibold">
            Log Energy
          </h2>

          <input
            className="w-full mt-6 p-4 rounded-2xl bg-white/60 border"
            placeholder="Activity"
            value={activity}
            onChange={(e) =>
              setActivity(
                e.target.value
              )
            }
          />

          <textarea
            className="w-full mt-4 p-4 rounded-2xl bg-white/60 border h-28"
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
          />

          <input
            className="w-full mt-4 p-4 rounded-2xl bg-white/60 border"
            placeholder="Energy"
            value={energy}
            onChange={(e) =>
              setEnergy(
                e.target.value
              )
            }
          />

          <div className="mt-4 flex gap-2 flex-wrap">

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
                className={`px-4 py-2 rounded-full ${
                  category === c
                    ? "bg-[#6A1E2B] text-white"
                    : "bg-white/60 border"
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
                className={`w-10 h-10 rounded-xl ${
                  mood === m
                    ? "bg-[#6A1E2B] text-white"
                    : "border"
                }`}
              >

                {m}

              </button>

            ))}

          </div>

          <button
            onClick={addEntry}
            className="w-full mt-6 py-4 rounded-2xl bg-[#6A1E2B] text-white"
          >

            Save Entry

          </button>

        </div>

        {/* TIMELINE */}

        <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-8">

          <h2 className="text-xl font-semibold">

            Timeline

          </h2>

          <div className="mt-6 space-y-4">

            {!sortedEntries.length && (

              <div className="text-black/40">

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
                className={`p-5 rounded-2xl border cursor-pointer transition ${
                  selectedEntry?.id ===
                  e.id
                    ? "border-[#6A1E2B] bg-[#6A1E2B]/5"
                    : "bg-white/50 border-black/5"
                }`}
              >

                <div className="flex justify-between">

                  <div>

                    <div className="font-medium">

                      {e.activity}

                    </div>

                    <div className="text-sm text-black/40">

                      {e.category}

                    </div>

                  </div>

                  <div className="font-semibold">

                    {e.energy}

                  </div>

                </div>

              </div>

            ))}

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