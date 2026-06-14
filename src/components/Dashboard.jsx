import { useMemo } from "react"
import Insights from "./Insights"

export default function Dashboard({
  entries,
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
}) {

  // ─────────────────────────────
  // METRICS
  // ─────────────────────────────

  const stats = useMemo(() => {
    if (!entries.length) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        streak: 0,
      }
    }

    const energies = entries.map(e => e.energy)

    const average =
      energies.reduce((a, b) => a + b, 0) / energies.length

    const highest = Math.max(...energies)
    const lowest = Math.min(...energies)

    // simple streak logic (same-day grouping)
    const dates = [...new Set(entries.map(e => e.date))]

    return {
      average: average.toFixed(1),
      highest,
      lowest,
      streak: dates.length,
    }
  }, [entries])

  // ─────────────────────────────
  // UI
  // ─────────────────────────────

  return (
    <main className="flex-1 min-h-screen px-14 py-10 bg-[#FBFAF8] relative">

      {/* soft premium background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-300px] right-[-300px] w-[700px] h-[700px] rounded-full bg-[#6A1E2B]/10 blur-[160px]" />
        <div className="absolute bottom-[-300px] left-[-250px] w-[650px] h-[650px] rounded-full bg-black/5 blur-[180px]" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 mb-12">

        <div className="text-xs uppercase tracking-[0.35em] text-black/40">
          Thrive Dashboard
        </div>

        <h1 className="text-5xl font-semibold tracking-tight mt-4">
          Good morning
        </h1>

        <p className="mt-3 text-black/50">
          Track your energy, focus and emotional patterns.
        </p>

      </div>
            {/* KPI GRID */}
            <div className="relative z-10 grid grid-cols-4 gap-5 mb-12">

{/* AVERAGE ENERGY */}
<div className="group rounded-[28px] bg-white/60 backdrop-blur-2xl border border-black/5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#6A1E2B]/20 hover:shadow-[0_25px_80px_rgba(106,30,43,0.12)]">

  <div className="text-xs uppercase tracking-[0.3em] text-black/40">
    Average
  </div>

  <div className="mt-4 text-4xl font-semibold transition-colors group-hover:text-[#6A1E2B]">
    {stats.average}
  </div>

  <div className="text-sm text-black/40 mt-2">
    Energy level
  </div>

</div>

{/* HIGHEST */}
<div className="group rounded-[28px] bg-white/60 backdrop-blur-2xl border border-black/5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#6A1E2B]/20 hover:shadow-[0_25px_80px_rgba(106,30,43,0.12)]">

  <div className="text-xs uppercase tracking-[0.3em] text-black/40">
    Peak
  </div>

  <div className="mt-4 text-4xl font-semibold transition-colors group-hover:text-[#6A1E2B]">
    {stats.highest}
  </div>

  <div className="text-sm text-black/40 mt-2">
    Highest value
  </div>

</div>

{/* LOWEST */}
<div className="group rounded-[28px] bg-white/60 backdrop-blur-2xl border border-black/5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#6A1E2B]/20 hover:shadow-[0_25px_80px_rgba(106,30,43,0.12)]">

  <div className="text-xs uppercase tracking-[0.3em] text-black/40">
    Low
  </div>

  <div className="mt-4 text-4xl font-semibold transition-colors group-hover:text-[#6A1E2B]">
    {stats.lowest}
  </div>

  <div className="text-sm text-black/40 mt-2">
    Minimum energy
  </div>

</div>

{/* STREAK */}
<div className="group rounded-[28px] bg-white/60 backdrop-blur-2xl border border-black/5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#6A1E2B]/20 hover:shadow-[0_25px_80px_rgba(106,30,43,0.12)]">

  <div className="text-xs uppercase tracking-[0.3em] text-black/40">
    Streak
  </div>

  <div className="mt-4 text-4xl font-semibold transition-colors group-hover:text-[#6A1E2B]">
    {stats.streak}
  </div>

  <div className="text-sm text-black/40 mt-2">
    Active days
  </div>

</div>

</div>
      {/* AI COACH SECTION */}
      <div className="relative z-10 mb-12">

        <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-8 transition-all duration-500 hover:border-[#6A1E2B]/20 hover:shadow-[0_30px_90px_rgba(106,30,43,0.10)]">

          <div className="flex items-start justify-between">

            <div>

              <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
                AI Coach
              </div>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Your Energy Insight
              </h2>

            </div>

            <div className="text-xs text-black/40">
              Live analysis
            </div>

          </div>

          {/* INSIGHT TEXT */}
          <div className="mt-6 text-black/60 leading-7 max-w-3xl">

            {entries.length === 0 ? (
              <span>
                Start adding entries to unlock personalized insights about your energy patterns.
              </span>
            ) : (
              <span>
                Your energy is most stable on days when you maintain consistent activity patterns. You tend to perform better in focused tasks after higher-energy entries.
              </span>
            )}

          </div>

          {/* HIGHLIGHTS */}
          <div className="mt-8 grid grid-cols-3 gap-5">

            <div className="rounded-2xl bg-white/50 border border-black/5 p-5 hover:border-[#6A1E2B]/20 transition">
              <div className="text-xs text-black/40 uppercase tracking-[0.2em]">
                Pattern
              </div>
              <div className="mt-3 text-lg font-medium">
                Consistency
              </div>
            </div>

            <div className="rounded-2xl bg-white/50 border border-black/5 p-5 hover:border-[#6A1E2B]/20 transition">
              <div className="text-xs text-black/40 uppercase tracking-[0.2em]">
                Peak Time
              </div>
              <div className="mt-3 text-lg font-medium">
                Morning
              </div>
            </div>

            <div className="rounded-2xl bg-white/50 border border-black/5 p-5 hover:border-[#6A1E2B]/20 transition">
              <div className="text-xs text-black/40 uppercase tracking-[0.2em]">
                Recovery
              </div>
              <div className="mt-3 text-lg font-medium">
                Moderate
              </div>
            </div>

          </div>

        </div>

      </div>
            {/* QUICK ENTRY */}
            <div className="relative z-10 mb-12 grid grid-cols-[420px_1fr] gap-8">

{/* FORM */}
<div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-8 transition-all duration-500 hover:border-[#6A1E2B]/20 hover:shadow-[0_30px_90px_rgba(106,30,43,0.08)]">

  <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
    Quick Entry
  </div>

  <h2 className="mt-3 text-2xl font-semibold">
    Log your energy
  </h2>

  {/* ACTIVITY */}
  <input
    className="w-full mt-6 p-4 rounded-2xl bg-white/60 border border-black/5 focus:border-[#6A1E2B]/30 transition outline-none"
    placeholder="What did you do?"
    value={activity}
    onChange={(e) => setActivity(e.target.value)}
  />

  {/* NOTES */}
  <textarea
    className="w-full mt-4 p-4 rounded-2xl bg-white/60 border border-black/5 focus:border-[#6A1E2B]/30 transition outline-none h-28"
    placeholder="Notes (optional)"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />

  {/* ENERGY INPUT */}
  <div className="mt-4">
    <input
      type="number"
      className="w-full p-4 rounded-2xl bg-white/60 border border-black/5 focus:border-[#6A1E2B]/30 transition outline-none"
      placeholder="Energy (1–10)"
      value={energy}
      onChange={(e) => setEnergy(e.target.value)}
    />
  </div>

  {/* CATEGORY */}
  <div className="mt-4 flex flex-wrap gap-2">
    {["Work", "Health", "Study", "Social"].map((c) => (
      <button
        key={c}
        type="button"
        onClick={() => setCategory(c)}
        className={`px-4 py-2 rounded-full text-sm border transition
          ${
            category === c
              ? "bg-[#6A1E2B] text-white border-[#6A1E2B]"
              : "bg-white/50 border-black/5 text-black/60 hover:border-[#6A1E2B]/30 hover:text-[#6A1E2B]"
          }
        `}
      >
        {c}
      </button>
    ))}
  </div>

  {/* MOOD */}
  <div className="mt-4 flex gap-2">
    {["🙂", "😐", "😃", "⚡"].map((m) => (
      <button
        key={m}
        type="button"
        onClick={() => setMood(m)}
        className={`w-10 h-10 rounded-xl border transition
          ${
            mood === m
              ? "bg-[#6A1E2B] text-white border-[#6A1E2B]"
              : "bg-white/50 border-black/5 hover:border-[#6A1E2B]/30"
          }
        `}
      >
        {m}
      </button>
    ))}
  </div>

  {/* SAVE BUTTON */}
  <button
    onClick={addEntry}
    className="w-full mt-6 py-4 rounded-2xl bg-[#6A1E2B] text-white font-medium transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_70px_rgba(106,30,43,0.25)]"
  >
    Save Entry
  </button>

</div>

{/* RIGHT SIDE (PREVIEW / INSIGHTS MINI) */}
<div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-8">

  <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
    Today
  </div>

  <h3 className="mt-3 text-2xl font-semibold">
    Energy Overview
  </h3>

  <div className="mt-6 space-y-4 text-black/60">

    <div className="flex justify-between">
      <span>Entries</span>
      <span className="text-black">{entries.length}</span>
    </div>

    <div className="flex justify-between">
      <span>Average</span>
      <span className="text-black">{stats.average}</span>
    </div>

    <div className="flex justify-between">
      <span>Peak</span>
      <span className="text-black">{stats.highest}</span>
    </div>

  </div>

  <div className="mt-8 text-sm text-black/50 leading-6">
    Your data is building a personal energy model. The more consistent entries you add, the more accurate your insights become.
  </div>

</div>

</div>
      {/* TIMELINE + HISTORY */}
      <div className="relative z-10 grid grid-cols-[1fr_1fr] gap-8 mb-16">

        {/* LEFT: TIMELINE */}
        <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-8">

          <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
            Timeline
          </div>

          <h3 className="mt-3 text-2xl font-semibold">
            Recent Activity
          </h3>

          <div className="mt-6 space-y-4 max-h-[420px] overflow-auto pr-2">

            {entries.length === 0 && (
              <div className="text-black/40 text-sm">
                No entries yet. Start logging your energy.
              </div>
            )}

            {entries.map((e, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-black/5 bg-white/50 p-4 transition hover:border-[#6A1E2B]/20 hover:shadow-[0_20px_60px_rgba(106,30,43,0.08)]"
              >

                <div className="flex justify-between items-center">

                  <div className="font-medium group-hover:text-[#6A1E2B] transition">
                    {e.activity}
                  </div>

                  <div className="text-sm text-black/50">
                    {e.energy}
                  </div>

                </div>

                <div className="mt-2 flex justify-between text-xs text-black/40">

                  <span>
                    {e.category}
                  </span>

                  <span>
                    {e.date}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT: ENERGY FLOW BREAKDOWN */}
        <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-8">

          <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
            Analysis
          </div>

          <h3 className="mt-3 text-2xl font-semibold">
            Energy Breakdown
          </h3>

          <div className="mt-6 space-y-5">

            {/* WORK */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Work</span>
                <span className="text-black">
                  {entries.filter(e => e.category === "Work").length}
                </span>
              </div>

              <div className="h-2 bg-black/5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#6A1E2B] w-[60%]" />
              </div>
            </div>

            {/* HEALTH */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Health</span>
                <span className="text-black">
                  {entries.filter(e => e.category === "Health").length}
                </span>
              </div>

              <div className="h-2 bg-black/5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#6A1E2B] w-[40%]" />
              </div>
            </div>

            {/* STUDY */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Study</span>
                <span className="text-black">
                  {entries.filter(e => e.category === "Study").length}
                </span>
              </div>

              <div className="h-2 bg-black/5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#6A1E2B] w-[50%]" />
              </div>
            </div>

            {/* SOCIAL */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Social</span>
                <span className="text-black">
                  {entries.filter(e => e.category === "Social").length}
                </span>
              </div>

              <div className="h-2 bg-black/5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#6A1E2B] w-[35%]" />
              </div>
            </div>

          </div>

          <div className="mt-8 text-sm text-black/50 leading-6">
            This breakdown helps identify where your energy is spent most frequently and how it affects your overall performance.
          </div>

        </div>

      </div>
            {/* EMPTY STATE / MICRO UX LAYER */}
            {entries.length === 0 && (
        <div className="relative z-10 mt-10 rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-10 text-center">

          <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
            Welcome to Thrive
          </div>

          <h3 className="mt-4 text-3xl font-semibold">
            Start your first energy entry
          </h3>

          <p className="mt-3 text-black/50 max-w-xl mx-auto leading-7">
            Your dashboard will evolve as you log your daily energy.
            Patterns, insights and AI coaching will appear here.
          </p>

          <div className="mt-6 text-sm text-[#6A1E2B] font-medium">
            → Use Quick Entry to begin
          </div>

        </div>
      )}

      {/* FLOATING GLOW DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute top-[20%] right-[-200px] w-[500px] h-[500px] bg-[#6A1E2B]/5 blur-[160px] rounded-full" />

        <div className="absolute bottom-[-250px] left-[10%] w-[600px] h-[600px] bg-black/5 blur-[180px] rounded-full" />

      </div>

    </main>
  )
}