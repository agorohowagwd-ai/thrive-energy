import { useEffect, useState } from "react"
import { supabase } from "./supabase"

import Landing from "./components/Landing"
import Auth from "./components/Auth"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Onboarding from "./components/Onboarding"
import MobileNav from "./components/MobileNav"

export default function App() {

  const [view, setView] = useState("landing")
  const [mode, setMode] = useState("login")

  const [entries, setEntries] = useState([])

  const [activity, setActivity] = useState("")
  const [notes, setNotes] = useState("")
  const [energy, setEnergy] = useState("")
  const [category, setCategory] = useState("Work")
  const [mood, setMood] = useState("Focused")

  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {

      if (data.session) {
        setView("app")
        loadEntries()

        const completed = localStorage.getItem("thrive-onboarding")
        if (!completed) setShowOnboarding(true)

        const premium = localStorage.getItem("thrive-premium")
        if (premium === "true") setIsPremium(true)
      }

    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {

      if (session) {
        setView("app")
        loadEntries()
      } else {
        setView("auth")
      }

    })

    return () => data.subscription.unsubscribe()

  }, [])
  async function loadEntries() {

    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) return

    const { data } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })

    setEntries(data || [])
  }

  async function addEntry() {

    const value = Number(energy)

    if (!activity || value < 1 || value > 10) return

    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) return

    await supabase.from("entries").insert({
      user_id: userData.user.id,
      activity,
      notes,
      energy: value,
      category,
      mood,
      date: new Date().toISOString().split("T")[0],
    })

    setActivity("")
    setNotes("")
    setEnergy("")

    loadEntries()
  }

  async function logout() {
    await supabase.auth.signOut()
    setView("landing")
  }

  function completeOnboarding() {
    localStorage.setItem("thrive-onboarding", "true")
    setShowOnboarding(false)
  }

  // ROUTES
  if (view === "landing") return <Landing setView={setView} />

  if (view === "auth")
    return (
      <Auth
        mode={mode}
        setMode={setMode}
        signIn={async (email, password) =>
          supabase.auth.signInWithPassword({ email, password })
        }
        signUp={async (name, email, password) =>
          supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
          })
        }
      />
    )

  if (showOnboarding)
    return <Onboarding completeOnboarding={completeOnboarding} />

  return (
    <div className="relative min-h-screen bg-[#FBFAF8] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] bg-[#6A1E2B]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-300px] left-[-250px] w-[700px] h-[700px] bg-black/5 blur-[180px] rounded-full" />
      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex relative z-10 min-h-screen">
        <Sidebar entries={entries} logout={logout} />
        <Dashboard
          entries={entries}
          activity={activity}
          setActivity={setActivity}
          notes={notes}
          setNotes={setNotes}
          energy={energy}
          setEnergy={setEnergy}
          category={category}
          setCategory={setCategory}
          mood={mood}
          setMood={setMood}
          addEntry={addEntry}
        />
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden relative z-10">
        <Dashboard
          entries={entries}
          activity={activity}
          setActivity={setActivity}
          notes={notes}
          setNotes={setNotes}
          energy={energy}
          setEnergy={setEnergy}
          category={category}
          setCategory={setCategory}
          mood={mood}
          setMood={setMood}
          addEntry={addEntry}
        />

        <MobileNav logout={logout} />
      </div>

    </div>
  )
}