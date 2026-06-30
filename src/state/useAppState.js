import { useState } from "react"
import { getEntries } from "../core/entries"

export default function useAppState(user) {
  const [entries, setEntries] = useState([])

  const [loading, setLoading] = useState(false)

  //────────────────────────────
  // LOAD
  //────────────────────────────

  const loadEntries = async () => {
    if (!user) return

    setLoading(true)

    const data = await getEntries(user.id)

    setEntries(data)

    setLoading(false)
  }

  return {
    entries,
    setEntries,
    loadEntries,
    loading,
  }
}