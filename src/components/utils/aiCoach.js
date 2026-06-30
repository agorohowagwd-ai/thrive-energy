export function generateInsight(entries) {
    if (!entries || entries.length === 0) {
      return {
        insight: "Start logging your energy to unlock AI insights.",
        pattern: "No Data",
        recovery: "Unknown",
      }
    }
  
    const values = entries.map((e) => Number(e.energy))
    const avg =
      values.reduce((a, b) => a + b, 0) / values.length
  
    const max = Math.max(...values)
  
    const lowDays = values.filter((v) => v <= 4).length
    const highDays = values.filter((v) => v >= 7).length
  
    let insight = ""
    let pattern = ""
    let recovery = ""
  
    if (avg >= 7) {
      insight =
        "Your energy is consistently high. You perform best with structured routines and clear goals."
      pattern = "High Stability"
      recovery = "Strong"
    } else if (avg >= 5) {
      insight =
        "Your energy is stable but fluctuates. Improving consistency could increase performance."
      pattern = "Moderate Stability"
      recovery = "Moderate"
    } else {
      insight =
        "Your energy is currently low and inconsistent. Focus on recovery, sleep and workload balance."
      pattern = "Low Stability"
      recovery = "Needs Attention"
    }
  
    return {
      insight,
      pattern,
      recovery,
      avg: avg.toFixed(1),
      highest: max,
      lowDays,
      highDays,
    }
  }