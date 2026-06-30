import { useEffect, useState } from "react"
import { supabase } from "./supabase"

import Auth from "./components/Auth"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Onboarding from "./components/Onboarding"
import MobileNav from "./components/MobileNav"

import useAppState from "./state/useAppState"
import { buildDashboardData } from "./lib/energyEngine"

import { initTelegram } from "./telegram/telegram"
import { useTelegram } from "./telegram/useTelegram"

export default function App() {
  //────────────────────────────
  // TELEGRAM
  //────────────────────────────

  const { isTelegram, telegramUser } = useTelegram()

  //────────────────────────────
  // APP STATE
  //────────────────────────────

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)

  //────────────────────────────
  // DATA
  //────────────────────────────

  const {
    entries,
    setEntries,
    loadEntries,
    addEntry,
    deleteEntry,
  } = useAppState(user)

  const safeEntries = Array.isArray(entries) ? entries : []

  //────────────────────────────
  // AI ENGINE
  //────────────────────────────

  const {
    weeklyData,
    stats,
  } = buildDashboardData(safeEntries)

  const safeWeeklyData = Array.isArray(weeklyData)
    ? weeklyData
    : []

  const safeStats = stats ?? null

  //────────────────────────────
  // INIT
  //────────────────────────────

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        //--------------------------------
        // TELEGRAM
        //--------------------------------

        if (isTelegram && window.Telegram?.WebApp) {
          initTelegram()

          window.Telegram.WebApp.ready()
          window.Telegram.WebApp.expand()

          console.log("Telegram Mini App")
          console.log(telegramUser)

          /**
           * Следующий этап:
           *
           * POST /telegram/auth
           *
           * backend:
           * validate initData
           * create/get user
           * return Supabase Session
           *
           * await supabase.auth.setSession(...)
           *
           */
        }

        //--------------------------------
        // WEB SESSION
        //--------------------------------

        const { data } =
          await supabase.auth.getSession()

        if (!mounted) return

        const sessionUser = data?.session?.user

        if (sessionUser) {
          setUser(sessionUser)

          await loadEntries(sessionUser)

          const onboarding =
            localStorage.getItem(
              "thrive-onboarding"
            )

          if (!onboarding) {
            setShowOnboarding(true)
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    init()

    //--------------------------------
    // AUTH LISTENER
    //--------------------------------

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        async (_event, session) => {
          const sessionUser =
            session?.user ?? null

          if (sessionUser) {
            setUser(sessionUser)

            await loadEntries(sessionUser)
          } else {
            setUser(null)
            setEntries([])
            setShowOnboarding(false)
          }
        }
      )

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [isTelegram])

  //────────────────────────────
  // LOGOUT
  //────────────────────────────

  async function logout() {
    await supabase.auth.signOut()

    setUser(null)
    setEntries([])
    setShowOnboarding(false)
  }

  //────────────────────────────
  // ONBOARDING
  //────────────────────────────

  function completeOnboarding() {
    localStorage.setItem(
      "thrive-onboarding",
      "true"
    )

    setShowOnboarding(false)
  }

  //────────────────────────────
  // LOADING
  //────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF8]">
        <div className="text-black/40">
          Loading...
        </div>
      </div>
    )
  }

  //────────────────────────────
  // WEB AUTH
  //────────────────────────────

  if (!user && !isTelegram) {
    return <Auth />
  }

  //────────────────────────────
  // TELEGRAM WAIT
  //────────────────────────────

  if (!user && isTelegram) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF8]">
        <div className="text-center">

          <div className="text-3xl font-semibold">
            Thrive
          </div>

          <div className="mt-4 text-black/40">
            Connecting Telegram...
          </div>

        </div>
      </div>
    )
  }

  //────────────────────────────
  // ONBOARDING
  //────────────────────────────

  if (showOnboarding) {
    return (
      <Onboarding
        completeOnboarding={completeOnboarding}
      />
    )
  }

  //────────────────────────────
  // MAIN APP
  //────────────────────────────

  return (
    <div className="relative min-h-screen bg-[#FBFAF8] overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] bg-[#6A1E2B]/10 blur-[160px] rounded-full" />

        <div className="absolute bottom-[-300px] left-[-250px] w-[700px] h-[700px] bg-black/5 blur-[180px] rounded-full" />

      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Desktop */}

      <div className="hidden md:flex relative z-10 min-h-screen">

        <Sidebar
          entries={safeEntries}
          logout={logout}
        />

        <Dashboard
          user={user}
          entries={safeEntries}
          weeklyData={safeWeeklyData}
          stats={safeStats}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

      </div>

      {/* Mobile */}

      <div className="md:hidden relative z-10">

        <Dashboard
          user={user}
          entries={safeEntries}
          weeklyData={safeWeeklyData}
          stats={safeStats}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

        <MobileNav
          logout={logout}
        />

      </div>

    </div>
  )
}