export default function Insights({
    entries,
    avgEnergy,
  }) {
    const bestCategory = (() => {
      const groups = {}
  
      entries.forEach((e) => {
        if (!groups[e.category])
          groups[e.category] = []
  
        groups[e.category].push(e.energy)
      })
  
      let best = "No data"
      let bestAvg = 0
  
      Object.keys(groups).forEach((cat) => {
        const avg =
          groups[cat].reduce(
            (a, b) => a + b,
            0
          ) / groups[cat].length
  
        if (avg > bestAvg) {
          bestAvg = avg
          best = cat
        }
      })
  
      return best
    })()
  
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm">
  
        <h2 className="text-2xl font-semibold mb-6">
          AI Insights
        </h2>
  
        <div className="space-y-4">
  
          <div>
            Average Energy:
            <strong> {avgEnergy}</strong>
          </div>
  
          <div>
            Best Category:
            <strong> {bestCategory}</strong>
          </div>
  
          <div>
            Total Activities:
            <strong> {entries.length}</strong>
          </div>
  
        </div>
  
      </div>
    )
  }