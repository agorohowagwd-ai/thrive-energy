import { useState, useCallback, useEffect } from "react"

import {
  getEntries,
  createEntry,
  removeEntry,
} from "../core/entries"

export default function useAppState(user) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)

  //────────────────────────────
  // AUTO LOAD WHEN USER APPEARS
  //────────────────────────────

  useEffect(() => {
    if (!user?.telegram_id) return

    loadEntries()
  }, [user])

  //────────────────────────────
  // LOAD
  //────────────────────────────

  const loadEntries = useCallback(async () => {
    if (!user?.telegram_id) return

    setLoading(true)

    try {
      const data = await getEntries(user.telegram_id)

      setEntries(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("loadEntries error:", err)
      setEntries([])
    } finally {
      setLoading(false)
    }
  }, [user])

  //────────────────────────────
  // ADD ENTRY
  //────────────────────────────

  const addEntry = async (entry) => {
    if (!user?.telegram_id) return

    try {
      await createEntry(user.telegram_id, entry)
      await loadEntries()
    } catch (err) {
      console.error("addEntry error:", err)
    }
  }

  //────────────────────────────
  // DELETE ENTRY
  //────────────────────────────

  const deleteEntry = async (id) => {
    try {
      await removeEntry(id)
      await loadEntries()
    } catch (err) {
      console.error("deleteEntry error:", err)
    }
  }

  return {
    entries,
    setEntries,
    loadEntries,
    addEntry,
    deleteEntry,
    loading,
  }
}