export function buildWeeklyEnergy(entries) {
    const map = {}
  
    for (const e of entries) {
      const day = e.date
  
      if (!map[day]) {
        map[day] = { day, total: 0, count: 0 }
      }
  
      map[day].total += Number(e.energy || 0)
      map[day].count += 1
    }
  
    return Object.values(map)
      .map(d => ({
        day: d.day,
        energy: Math.round(d.total / d.count),
      }))
      .slice(-7)
  }
  
  export function calculateInsights(entries) {
    if (!entries.length) {
      return {
        avg: 0,
        peak: 0,
        low: 0,
        streak: 0,
      }
    }
  
    const energies = entries.map(e => Number(e.energy))
  
    const avg =
      energies.reduce((a, b) => a + b, 0) / energies.length
  
    return {
      avg: Number(avg.toFixed(1)),
      peak: Math.max(...energies),
      low: Math.min(...energies),
      streak: new Set(entries.map(e => e.date)).size,
    }
  }