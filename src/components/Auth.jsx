import { useEffect, useMemo, useState } from "react"

import AnimatedBackground from "./AnimatedBackground"
import BrandTitle from "./BrandTitle"
import GlassCard from "./GlassCard"
import GoogleButton from "./GoogleButton"
import LanguageSelector from "./LanguageSelector"

import { supabase } from "../supabase"

import useLanguage from "../hooks/useLanguage"

export default function Auth({ onSuccess }) {

  //────────────────────────────────────
  // LANGUAGE
  //────────────────────────────────────

  const {
    language,
    setLanguage,
    t,
  } = useLanguage()

  //────────────────────────────────────
  // FORM
  //────────────────────────────────────

  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")

  const [step, setStep] = useState("email")

  //────────────────────────────────────
  // LOADING
  //────────────────────────────────────

  const [loadingSend, setLoadingSend] = useState(false)
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  //────────────────────────────────────
  // UI
  //────────────────────────────────────

  const [message, setMessage] = useState("")

  const [focus, setFocus] = useState(false)

  const [success, setSuccess] = useState(false)

  const [stage, setStage] = useState("auth")

  //────────────────────────────────────
  // GREETING
  //────────────────────────────────────

  const greeting = useMemo(() => {

    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) return t.morning

    if (hour >= 12 && hour < 18) return t.afternoon

    if (hour >= 18 && hour < 23) return t.evening

    return t.night

  }, [t])

  //────────────────────────────────────
  // SESSION RESTORE
  //────────────────────────────────────

  useEffect(() => {

    let mounted = true

    async function restoreSession() {

      const {
        data,
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (data.session) {

        setSuccess(true)

        setStage("dashboard")

        onSuccess?.()

      }

    }

    restoreSession()

    return () => {

      mounted = false

    }

  }, [onSuccess])

  //────────────────────────────────────
  // AUTH LISTENER
  //────────────────────────────────────

  useEffect(() => {

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        if (!session) return

        setSuccess(true)

        setStage("dashboard")

        onSuccess?.()

      }
    )

    return () => {

      listener.subscription.unsubscribe()

    }

  }, [onSuccess])

  //────────────────────────────────────
  // SEND OTP
  //────────────────────────────────────

  const sendCode = async () => {

    if (!email) return

    setLoadingSend(true)

    setMessage("")

    const { error } =
      await supabase.auth.signInWithOtp({

        email,

        options: {

          shouldCreateUser: true,

        },

      })

    setLoadingSend(false)

    if (error) {

      setMessage(error.message)

      return

    }

    setStep("code")

    setMessage(t.checkEmail)

  }

  //────────────────────────────────────
  // VERIFY OTP
  //────────────────────────────────────

  const verifyCode = async () => {

    if (!code) return

    setLoadingVerify(true)

    setMessage("")

    const { error } =
      await supabase.auth.verifyOtp({

        email,

        token: code,

        type: "email",

      })

    setLoadingVerify(false)

    if (error) {

      setMessage(error.message)

      return

    }

    setSuccess(true)

    setMessage(t.welcome)

    setTimeout(() => {

      setStage("dashboard")

      onSuccess?.()

    }, 900)

  }

  //────────────────────────────────────
  // GOOGLE LOGIN
  //────────────────────────────────────

  const signInWithGoogle = async () => {

    setLoadingGoogle(true)

    await supabase.auth.signInWithOAuth({

      provider: "google",

      options: {

        redirectTo:
          import.meta.env.VITE_APP_URL ??
          window.location.origin,

      },

    })

  }
    //────────────────────────────────────
  // RENDER
  //────────────────────────────────────

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">

      {/* BACKGROUND */}

      <AnimatedBackground
        focus={focus}
        success={success}
        step={step}
        stage={stage}
        language={language}
      />

      {/* CONTENT */}

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">

        <GlassCard exiting={success}>

          {/* BRAND */}

          <BrandTitle />

          {/* GREETING */}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-center"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-black/35">

              {greeting}

            </p>

            <p className="mt-2 text-sm text-black/45">

              {t.slogan}

            </p>

          </motion.div>

          {/* LANGUAGE */}

          <div className="mt-7">

            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
            />

          </div>

          {/* GOOGLE */}

          <div className="mt-6">

            <GoogleButton
              loading={loadingGoogle}
              onClick={signInWithGoogle}
            />

          </div>

          {/* DIVIDER */}

          <div className="relative my-7">

            <div className="absolute inset-x-0 top-1/2 h-px bg-black/8" />

            <div className="relative flex justify-center">

              <span className="bg-white/45 px-3 text-xs text-black/30 backdrop-blur-sm">

                {t.or}

              </span>

            </div>

          </div>

          {/* EMAIL */}

          {step === "email" && (

            <div className="space-y-4">

              <input

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                onFocus={() => setFocus(true)}

                onBlur={() => setFocus(false)}

                placeholder={t.email}

                autoComplete="email"

                className="

                  w-full

                  rounded-2xl

                  border

                  border-white/70

                  bg-white/60

                  p-4

                  outline-none

                  transition-all

                  duration-300

                  focus:bg-white/80

                  focus:ring-2

                  focus:ring-[#6A1E2B]/15

                "

              />

              <button

                onClick={sendCode}

                disabled={loadingSend}

                className="

                  w-full

                  rounded-2xl

                  bg-[#6A1E2B]

                  py-3

                  font-medium

                  text-white

                  transition-all

                  duration-300

                  hover:scale-[1.01]

                  active:scale-[0.99]

                  disabled:opacity-60

                "

              >

                {loadingSend

                  ? t.sending

                  : t.sendCode}

              </button>

            </div>

          )}

          {/* CODE */}

          {step === "code" && (

            <div className="space-y-4">

              <input

                value={code}

                onChange={(e) => setCode(e.target.value)}

                placeholder="123456"

                inputMode="numeric"

                autoComplete="one-time-code"

                className="

                  w-full

                  rounded-2xl

                  border

                  border-white/70

                  bg-white/60

                  p-4

                  text-center

                  text-lg

                  tracking-[0.45em]

                  outline-none

                  transition-all

                  duration-300

                  focus:bg-white/80

                  focus:ring-2

                  focus:ring-[#6A1E2B]/15

                "

              />

              <button

                onClick={verifyCode}

                disabled={loadingVerify}

                className="

                  w-full

                  rounded-2xl

                  bg-[#6A1E2B]

                  py-3

                  font-medium

                  text-white

                  transition-all

                  duration-300

                  hover:scale-[1.01]

                  active:scale-[0.99]

                  disabled:opacity-60

                "

              >

                {loadingVerify

                  ? t.verifying

                  : t.verify}

              </button>

            </div>

          )}

          {/* STATUS */}

          {message && (

            <motion.p

              initial={{

                opacity: 0,

                y: 8,

              }}

              animate={{

                opacity: 1,

                y: 0,

              }}

              className="

                mt-6

                text-center

                text-xs

                leading-6

                text-black/45

              "

            >

              {message}

            </motion.p>

          )}

        </GlassCard>

      </div>

    </div>

  )

}