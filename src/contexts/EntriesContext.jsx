import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react"
  
  import { supabase } from "../supabase"
  import { useAuth } from "./AuthContext"
  
  const EntriesContext = createContext(null)
  
  export function EntriesProvider({ children }) {
  
    const { user } = useAuth()
  
    const [entries, setEntries] = useState([])
  
    const [loading, setLoading] = useState(true)
  
    const [filters, setFilters] = useState({
      category: "all",
      mood: "all",
      search: "",
    })
  
    useEffect(() => {
  
      if (!user) {
  
        setEntries([])
        setLoading(false)
  
        return
  
      }
  
      loadEntries()
  
    }, [user])
  
    async function loadEntries() {
  
      setLoading(true)
  
      const { data, error } = await supabase
  
        .from("entries")
  
        .select("*")
  
        .eq("user_id", user.id)
  
        .order("date", { ascending: false })
  
        .order("created_at", { ascending: false })
  
      if (!error) {
  
        setEntries(data || [])
  
      }
  
      setLoading(false)
  
    }
  
    async function addEntry(entry) {
  
      if (!user) return
  
      const payload = {
  
        user_id: user.id,
  
        activity: entry.activity,
  
        notes: entry.notes,
  
        energy: Number(entry.energy),
  
        category: entry.category,
  
        mood: entry.mood,
  
        date: entry.date,
  
      }
  
      const { data, error } = await supabase
  
        .from("entries")
  
        .insert(payload)
  
        .select()
  
        .single()
  
      if (error) return error
  
      setEntries((prev) => [data, ...prev])
  
      return data
  
    }
  
    async function updateEntry(id, values) {
  
      const { data, error } = await supabase
  
        .from("entries")
  
        .update(values)
  
        .eq("id", id)
  
        .select()
  
        .single()
  
      if (error) return error
  
      setEntries((prev) =>
        prev.map((item) =>
          item.id === id ? data : item
        )
      )
  
      return data
  
    }
  
    async function deleteEntry(id) {
  
      const { error } = await supabase
  
        .from("entries")
  
        .delete()
  
        .eq("id", id)
  
      if (error) return error
  
      setEntries((prev) =>
        prev.filter((item) => item.id !== id)
      )
  
    }
  
    const filteredEntries = useMemo(() => {
  
      return entries.filter((entry) => {
  
        const categoryOk =
          filters.category === "all" ||
          entry.category === filters.category
  
        const moodOk =
          filters.mood === "all" ||
          entry.mood === filters.mood
  
        const searchOk =
          filters.search === "" ||
  
          entry.activity
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
  
          entry.notes
            ?.toLowerCase()
            .includes(filters.search.toLowerCase())
  
        return categoryOk && moodOk && searchOk
  
      })
  
    }, [entries, filters])
  
    const averageEnergy = useMemo(() => {
  
      if (!entries.length) return 0
  
      return (
  
        entries.reduce(
          (sum, item) => sum + item.energy,
          0
        ) / entries.length
  
      ).toFixed(1)
  
    }, [entries])
  
    const thisWeekEntries = useMemo(() => {
  
      const today = new Date()
  
      const weekAgo = new Date()
  
      weekAgo.setDate(today.getDate() - 7)
  
      return entries.filter((entry) => {
  
        return new Date(entry.date) >= weekAgo
  
      })
  
    }, [entries])
  
    const value = {
  
      entries,
  
      filteredEntries,
  
      loading,
  
      filters,
  
      setFilters,
  
      averageEnergy,
  
      thisWeekEntries,
  
      loadEntries,
  
      addEntry,
  
      updateEntry,
  
      deleteEntry,
  
    }
  
    return (
  
      <EntriesContext.Provider value={value}>
  
        {children}
  
      </EntriesContext.Provider>
  
    )
  
  }
  
  export function useEntries() {
  
    const context = useContext(EntriesContext)
  
    if (!context) {
  
      throw new Error(
  
        "useEntries must be used inside EntriesProvider"
  
      )
  
    }
  
    return context
  
  }