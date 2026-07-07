import { useState, useEffect, useMemo } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Onboarding from "./components/Onboarding";
import MobileNav from "./components/MobileNav";

import useAppState from "./state/useAppState";
import { buildDashboardData } from "./lib/energyEngine";

import { useTelegram } from "./telegram/useTelegram";

export default function App() {
  console.log("APP IS RUNNING");

  //────────────────────────────
  // TELEGRAM
  //────────────────────────────

  const { telegramUser, isTelegram, initData } = useTelegram();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //────────────────────────────
  // AUTH
  //────────────────────────────

  useEffect(() => {
    async function authenticate() {
      if (!isTelegram || !initData) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/telegram/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              initData,
            }),
          }
        );

        const data = await res.json();

        console.log("Telegram auth response:", data);

        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    authenticate();
  }, [isTelegram, initData]);

  //────────────────────────────
  // APP STATE
  //────────────────────────────

  const [showOnboarding, setShowOnboarding] = useState(false);

  const {
    entries,
    addEntry,
    deleteEntry,
    loadEntries,
  } = useAppState(user);

  const safeEntries = Array.isArray(entries)
    ? entries
    : [];

  const { weeklyData, stats } = useMemo(
    () => buildDashboardData(safeEntries),
    [safeEntries]
  );

  //────────────────────────────
  // LOAD ENTRIES
  //────────────────────────────

  useEffect(() => {
    if (!user?.telegram_id) return;

    loadEntries();
  }, [user?.telegram_id]);

  //────────────────────────────
  // ONBOARDING
  //────────────────────────────

  useEffect(() => {
    if (!user) return;

    if (isTelegram) {
      setShowOnboarding(false);
      return;
    }

    const done = localStorage.getItem(
      "thrive-onboarding"
    );

    if (!done) {
      setShowOnboarding(true);
    }
  }, [user, isTelegram]);

  //────────────────────────────
  // LOADING
  //────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF8]">
        <div className="text-black/40">
          Loading Thrive...
        </div>
      </div>
    );
  }

  //────────────────────────────
  // NOT INSIDE TELEGRAM
  //────────────────────────────

  if (!isTelegram) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF8]">
        <div className="text-black/40 text-center">
          Open this application inside Telegram.
        </div>
      </div>
    );
  }

  //────────────────────────────
  // AUTH FAILED
  //────────────────────────────

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF8]">
        <div className="text-black/40 text-center">
          Telegram authorization failed.
        </div>
      </div>
    );
  }

  //────────────────────────────
  // ONBOARDING
  //────────────────────────────

  if (showOnboarding) {
    return (
      <Onboarding
        completeOnboarding={() => {
          localStorage.setItem(
            "thrive-onboarding",
            "true"
          );
          setShowOnboarding(false);
        }}
      />
    );
  }

  //────────────────────────────
  // APP
  //────────────────────────────

  return (
    <div className="relative min-h-screen bg-[#FBFAF8] overflow-hidden">

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

      <div className="hidden md:flex relative z-10 min-h-screen">

        <Sidebar entries={safeEntries} />

        <Dashboard
          user={user}
          entries={safeEntries}
          weeklyData={weeklyData}
          stats={stats}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

      </div>

      <div className="md:hidden relative z-10">

        <Dashboard
          user={user}
          entries={safeEntries}
          weeklyData={weeklyData}
          stats={stats}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

        <MobileNav />

      </div>

    </div>
  );
}