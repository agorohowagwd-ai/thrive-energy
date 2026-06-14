export default function StatsCards({
    avgEnergy,
    streak,
    bestDay,
    totalEntries,
  }) {
    return (
      <div className="grid md:grid-cols-4 gap-5 mb-8">
  
        <div className="glass p-6">
          <div className="text-4xl font-semibold text-slate-900">
            ⚡ {avgEnergy}
          </div>
  
          <div className="text-slate-500 mt-2">
            Average Energy
          </div>
        </div>
  
        <div className="glass p-6">
          <div className="text-4xl font-semibold text-slate-900">
            🔥 {streak}
          </div>
  
          <div className="text-slate-500 mt-2">
            Day Streak
          </div>
        </div>
  
        <div className="glass p-6">
          <div className="text-4xl font-semibold text-slate-900">
            🏆 {bestDay}
          </div>
  
          <div className="text-slate-500 mt-2">
            Best Day
          </div>
        </div>
  
        <div className="glass p-6">
          <div className="text-4xl font-semibold text-slate-900">
            📖 {totalEntries}
          </div>
  
          <div className="text-slate-500 mt-2">
            Entries
          </div>
        </div>
  
      </div>
    )
  }