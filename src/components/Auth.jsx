import { useState } from "react"
import { motion } from "framer-motion"

import AnimatedBackground from "./AnimatedBackground"
import BrandTitle from "./BrandTitle"
import GlassCard from "./GlassCard"
import LanguageSelector from "./LanguageSelector"

import { supabase } from "../supabase"
import { useLanguage } from "../contexts/LanguageContext"

export default function Auth({
  onSuccess,
  language,
  setLanguage,
}) {
  const { t } = useLanguage()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function login() {
    if (!email) return

    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("Check your email for the login link.")
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      <AnimatedBackground />

      <div className="absolute inset-0 flex items-center justify-center px-5">

        <GlassCard>

          <BrandTitle />

          <p className="mt-4 text-center text-black/45">
            AI Energy Coach
          </p>

          <div className="mt-8">
            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
            />
          </div>

          <div className="mt-8 space-y-4">

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              className="
                w-full
                rounded-2xl
                border
                border-black/10
                bg-white/70
                p-4
                outline-none
              "
            />

            <button
              onClick={login}
              disabled={loading}
              className="
                w-full
                rounded-2xl
                bg-[#6A1E2B]
                py-4
                text-white
                font-medium
              "
            >
              {loading ? "Sending..." : "Continue"}
            </button>

          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-sm text-black/45"
            >
              {message}
            </motion.div>
          )}

          <div className="mt-10 border-t border-black/5 pt-6 text-center text-xs text-black/30">
            Soon you'll be able to sign in instantly via Telegram Mini App.
          </div>

        </GlassCard>

      </div>

    </div>
  )
}