import { useEffect, useState, useMemo } from "react"
import { supabase } from "./supabase"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

export default function App() {
  // ================= STATE =================
  const [session, setSession] = useState(null)
  const [view, setView] = useState("landing")
  const [mode, setMode] = useState("login")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [activity, setActivity] = useState("")
  const [notes, setNotes] = useState("")
  const [energy, setEnergy] = useState("")
  const [category, setCategory] = useState("Work")
  const [mood, setMood] = useState("🙂")

  const [entries, setEntries] = useState([])

  // ================= AUTH =================
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) {
        setView("app")
        fetchEntries()
      }
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setView("app")
        fetchEntries()
      } else {
        setView("auth")
      }
    })

    return () => data.subscription.unsubscribe()
  }, [])

  // ================= FETCH =================
  async function fetchEntries() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) return

    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })

    if (!error) setEntries(data || [])
  }

  // ================= AUTH FUNCTIONS =================
  async function signUp() {
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    setLoading(false)

    if (error) return alert(error.message)

    setMode("login")
    alert("Check email for confirmation")
  }

  async function signIn() {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) return alert(error.message)

    setView("app")
    fetchEntries()
  }

  async function logout() {
    await supabase.auth.signOut()
    setView("landing")
  }

  // ================= ADD ENTRY (FIXED) =================
  async function addEntry() {
    const val = Number(energy)
    if (!activity || val < 1 || val > 10) return

    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) return

    const { error } = await supabase.from("entries").insert({
      user_id: userData.user.id,
      activity,
      notes,
      energy: val,
      category,
      mood,
      date: new Date().toISOString().split("T")[0],
    })

    if (error) {
      alert(error.message)
      return
    }

    setActivity("")
    setNotes("")
    setEnergy("")

    // IMPORTANT: refresh sidebar instantly
    fetchEntries()
  }

  // ================= STATS =================
  const avgEnergy = useMemo(() => {
    if (!entries.length) return 0
    return (
      entries.reduce((s, e) => s + e.energy, 0) /
      entries.length
    ).toFixed(1)
  }, [entries])

  // MAX ENERGY PER DAY (your “anchors”)
  const dailyMax = useMemo(() => {
    const map = {}

    entries.forEach((e) => {
      if (!map[e.date] || e.energy > map[e.date]) {
        map[e.date] = e.energy
      }
    })

    return Object.entries(map)
      .map(([date, energy]) => ({
        date,
        energy,
      }))
      .slice(0, 7)
      .reverse()
  }, [entries])

  const weeklyData = useMemo(() => {
    return [...Array(7)]
      .map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const iso = d.toISOString().split("T")[0]

        const day = entries.filter((e) => e.date === iso)

        const avg = day.length
          ? day.reduce((s, e) => s + e.energy, 0) / day.length
          : 0

        return {
          day: iso.slice(5),
          energy: Number(avg.toFixed(1)),
        }
      })
      .reverse()
  }, [entries])

  // ================= UI =================

  // LANDING
  if (view === "landing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-center px-6">
        <div>
          <h1 className="text-6xl font-semibold text-gray-900">
            Energy Journal
          </h1>

          <p className="mt-4 text-gray-500 max-w-xl">
            В самое тёмное время мы вспоминаем самые светлые моменты.
          </p>

          <button
            onClick={() => setView("auth")}
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Start
          </button>
        </div>
      </div>
    )
  }

  // AUTH
  if (view === "auth") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-96 border rounded-2xl p-8">

          {mode === "login" && (
            <>
              <input
                placeholder="email"
                className="w-full border p-3 rounded-xl mb-3"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                className="w-full border p-3 rounded-xl mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={signIn}
                className="w-full bg-blue-600 text-white p-3 rounded-xl"
              >
                Sign in
              </button>

              <p
                onClick={() => setMode("signup")}
                className="text-center mt-3 text-sm text-gray-500 cursor-pointer"
              >
                Create account
              </p>
            </>
          )}

          {mode === "signup" && (
            <>
              <input
                placeholder="name"
                className="w-full border p-3 rounded-xl mb-3"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="email"
                className="w-full border p-3 rounded-xl mb-3"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                className="w-full border p-3 rounded-xl mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={signUp}
                className="w-full bg-blue-600 text-white p-3 rounded-xl"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // APP (WITH SIDEBAR)
  return (
    <div className="min-h-screen bg-white flex">

      {/* LEFT MAIN */}
      <div className="flex-1 p-6">

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Energy Journal
          </h1>

          <button onClick={logout} className="text-gray-500">
            logout
          </button>
        </div>

        {/* INPUT */}
        <div className="border p-4 rounded-xl mb-6">
          <input
            className="w-full border p-2 mb-2 rounded"
            placeholder="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />

          <input
            className="w-full border p-2 mb-2 rounded"
            placeholder="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <input
            className="w-full border p-2 mb-2 rounded"
            type="number"
            placeholder="energy 1-10"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
          />

          <button
            onClick={addEntry}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            add entry
          </button>
        </div>

        {/* CHART */}
        <div className="h-[300px] border rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Area dataKey="energy" stroke="#2563eb" fill="#2563eb" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RIGHT SIDEBAR (CHATGPT STYLE HISTORY) */}
      <div className="w-80 border-l p-4 overflow-auto">

        <h2 className="font-semibold mb-4">
          History
        </h2>

        {entries.map((e, i) => (
          <div
            key={i}
            className="border rounded-lg p-3 mb-2"
          >
            <div className="text-sm font-medium">
              {e.activity}
            </div>

            <div className="text-xs text-gray-500">
              {e.date} • energy {e.energy} • {e.mood}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}