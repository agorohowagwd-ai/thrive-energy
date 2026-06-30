export function buildDashboardData(entries = []) {
    if (!entries.length) {
      return {
        weeklyData: [],
        stats: {
          average: 0,
          highest: 0,
          lowest: 0,
        },
      }
    }
  
    //────────────────────────────
    // NORMALIZE
    //────────────────────────────
  
    const normalized = entries.map((e) => ({
      ...e,
      energy: Number(e.energy || 0),
      date: new Date(e.date),
    }))
  
    //────────────────────────────
    // STATS
    //────────────────────────────
  
    const energies = normalized.map((e) => e.energy)
  
    const average =
      energies.reduce((a, b) => a + b, 0) / energies.length
  
    const highest = Math.max(...energies)
    const lowest = Math.min(...energies)
  
    //────────────────────────────
    // WEEK DATA (chart base)
    //────────────────────────────
  
    const weeklyData = normalized
      .slice(-14)
      .map((e) => ({
        date: e.date.toISOString().split("T")[0],
        energy: e.energy,
        activity: e.activity,
        category: e.category,
        notes: e.notes,
      }))
  
    //────────────────────────────
    // PEAK MARKERS (for AI + UX)
    //────────────────────────────
  
    const peaks = normalized.filter((e) => e.energy === highest)
  
    //────────────────────────────
    // RETURN ENGINE
    //────────────────────────────
  
    return {
      weeklyData,
      stats: {
        average: Number(average.toFixed(1)),
        highest,
        lowest,
        peaks,
      },
    }
  }