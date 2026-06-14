import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    CartesianGrid,
  } from "recharts"
  
  export default function Analytics({ entries }) {
  
    // ─────────────────────────────
    // BUILD WEEKLY DATA
    // ─────────────────────────────
  
    const data = [...Array(14)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
  
      const date = d.toISOString().split("T")[0]
  
      const dayEntries = entries.filter(e => e.date === date)
  
      const avg = dayEntries.length
        ? dayEntries.reduce((s, e) => s + e.energy, 0) / dayEntries.length
        : 0
  
      return {
        date: date.slice(5),
        energy: Number(avg.toFixed(2)),
        count: dayEntries.length,
      }
    }).reverse()
  
    const total = entries.length
  
    const avgEnergy = total
      ? (entries.reduce((s, e) => s + e.energy, 0) / total).toFixed(1)
      : 0
      return (
        <main className="flex-1 min-h-screen px-14 py-10 bg-[#FBFAF8] relative">
    
          {/* background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-300px] right-[-300px] w-[700px] h-[700px] bg-[#6A1E2B]/10 blur-[160px] rounded-full" />
          </div>
    
          {/* HEADER */}
          <div className="relative z-10 mb-10">
    
            <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
              Thrive Analytics
            </div>
    
            <h1 className="text-5xl font-semibold mt-4">
              Energy Insights
            </h1>
    
            <p className="text-black/50 mt-3">
              Breakdown of your performance and patterns over time.
            </p>
    
          </div>
    
          {/* KPI */}
          <div className="grid grid-cols-3 gap-6 mb-10">
    
            <div className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/5 p-6">
              <div className="text-black/40 text-xs uppercase tracking-[0.2em]">
                Total Entries
              </div>
              <div className="text-4xl mt-3 font-semibold">
                {total}
              </div>
            </div>
    
            <div className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/5 p-6">
              <div className="text-black/40 text-xs uppercase tracking-[0.2em]">
                Avg Energy
              </div>
              <div className="text-4xl mt-3 font-semibold">
                {avgEnergy}
              </div>
            </div>
    
            <div className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/5 p-6">
              <div className="text-black/40 text-xs uppercase tracking-[0.2em]">
                Active Days
              </div>
              <div className="text-4xl mt-3 font-semibold">
                {[...new Set(entries.map(e => e.date))].length}
              </div>
            </div>
    
          </div>
                {/* CHART */}
      <div className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/5 p-8">

<div className="mb-6">
  <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
    Trend
  </div>

  <h2 className="text-3xl font-semibold mt-3">
    Energy Flow
  </h2>
</div>

<div className="h-[380px]">

  <ResponsiveContainer width="100%" height="100%">

    <AreaChart data={data}>

      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 11, fill: "#9ca3af" }}
      />

      <Tooltip
        contentStyle={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: "16px",
          border: "1px solid rgba(106,30,43,0.15)",
        }}
      />

      <Area
        type="monotone"
        dataKey="energy"
        stroke="#6A1E2B"
        strokeWidth={2}
        fill="#6A1E2B"
        fillOpacity={0.08}
      />

    </AreaChart>

  </ResponsiveContainer>

</div>

</div>

</main>
)
}