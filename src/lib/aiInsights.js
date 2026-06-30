export function generateInsights(entries = []) {
    if (!Array.isArray(entries) || entries.length === 0) {
      return {
        insight: "Start logging entries to unlock AI insights.",
        pattern: "No data",
        recommendation: "Begin tracking daily energy.",
        avg: 0,
        max: 0,
        min: 0,
        trend: 0,
      }
    }
  
    const energies = entries
      .map((e) => Number(e.energy))
      .filter((n) => !isNaN(n))
  
    if (!energies.length) {
      return {
        insight: "Invalid energy data detected.",
        pattern: "No valid data",
        recommendation: "Fix energy input values.",
        avg: 0,
        max: 0,
        min: 0,
        trend: 0,
      }
    }
  
    const avg =
      energies.reduce((a, b) => a + b, 0) / energies.length
  
    const max = Math.max(...energies)
    const min = Math.min(...energies)
  
    const last3 = entries
      .slice(-3)
      .map((e) => Number(e.energy))
      .filter((n) => !isNaN(n))
  
    const trend =
      last3.length >= 2
        ? last3[last3.length - 1] - last3[0]
        : 0
  
    let insight = ""
    let recommendation = ""
    let pattern = ""
  
    if (avg >= 7) {
      insight =
        "Your energy is highly stable with strong performance patterns."
      recommendation = "Maintain current routine."
      pattern = "High Stability"
    } else if (avg >= 5) {
      insight =
        "Your energy is moderate with fluctuations."
      recommendation =
        "Improve consistency and recovery cycles."
      pattern = "Moderate Stability"
    } else {
      insight =
        "Your energy is unstable and needs recovery focus."
      recommendation = "Prioritize sleep and reduce load."
      pattern = "Low Stability"
    }
  
    if (trend > 1) insight += " Trend is improving."
    if (trend < -1) insight += " Trend is declining."
  
    return {
      avg,
      max,
      min,
      trend,
      insight,
      recommendation,
      pattern,
    }
  }