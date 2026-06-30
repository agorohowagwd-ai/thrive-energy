export function generateInsights(entries) {

    if (!entries?.length) {
      return {
        summary: "No data yet",
        moodTrend: "neutral",
        energyTrend: "neutral",
        tips: [],
      }
    }
  
    const energies = entries.map(e => Number(e.energy))
  
    const avg = energies.reduce((a, b) => a + b, 0) / energies.length
  
    const last5 = entries.slice(0, 5)
    const lastAvg =
      last5.reduce((a, b) => a + Number(b.energy), 0) / last5.length
  
    const trend =
      lastAvg > avg ? "improving"
      : lastAvg < avg ? "declining"
      : "stable"
  
    const lowEnergyDays = entries.filter(e => Number(e.energy) <= 4)
  
    const categories = {}
    for (const e of entries) {
      categories[e.category] = (categories[e.category] || 0) + 1
    }
  
    const topCategory =
      Object.entries(categories)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown"
  
    const tips = []
  
    if (trend === "declining") {
      tips.push("Your energy is dropping recently — consider reducing workload.")
    }
  
    if (lowEnergyDays.length > 3) {
      tips.push("Frequent low-energy days detected — check sleep & recovery.")
    }
  
    tips.push(`Your dominant activity category is ${topCategory}`)
  
    if (avg < 5) {
      tips.push("Overall energy is low — focus on recovery habits.")
    }
  
    return {
      summary:
        trend === "improving"
          ? "Your energy is improving 📈"
          : trend === "declining"
          ? "Your energy is declining 📉"
          : "Your energy is stable ⚖️",
  
      moodTrend: trend,
      energyTrend: trend,
  
      avg: Number(avg.toFixed(1)),
  
      tips,
    }
  }