import { useState } from "react"

export default function Onboarding({ completeOnboarding }) {

  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Thrive",
      desc: "Your personal energy operating system.",
    },
    {
      title: "Track your energy",
      desc: "Log daily activity, mood and energy levels.",
    },
    {
      title: "Understand patterns",
      desc: "Get insights into your focus and performance.",
    },
    {
      title: "Build consistency",
      desc: "Create habits that improve your energy over time.",
    },
  ]

  function next() {
    if (step === steps.length - 1) {
      completeOnboarding()
    } else {
      setStep(step + 1)
    }
  }

  function back() {
    if (step > 0) setStep(step - 1)
  }

  const current = steps[step]

  return (
    <div className="min-h-screen bg-[#FBFAF8] flex items-center justify-center relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#6A1E2B]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-black/5 blur-[160px] rounded-full" />
      <div className="relative z-10 w-full max-w-2xl">

{/* PROGRESS */}
<div className="flex gap-2 mb-10 justify-center">
  {steps.map((_, i) => (
    <div
      key={i}
      className={`h-1 w-10 rounded-full transition-all ${
        i <= step ? "bg-[#6A1E2B]" : "bg-black/10"
      }`}
    />
  ))}
</div>

{/* CARD */}
<div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-black/5 p-10 text-center">

  <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
    Thrive Onboarding
  </div>

  <h1 className="mt-6 text-4xl font-semibold tracking-tight">
    {current.title}
  </h1>

  <p className="mt-4 text-black/50 leading-7">
    {current.desc}
  </p>

</div>
        {/* CONTROLS */}
        <div className="flex justify-between mt-8">

          <button
            onClick={back}
            className="px-6 py-3 rounded-2xl bg-white/60 border border-black/5 text-black/60 hover:text-black hover:border-[#6A1E2B]/30 transition"
          >
            Back
          </button>

          <button
            onClick={next}
            className="px-6 py-3 rounded-2xl bg-[#6A1E2B] text-white hover:shadow-[0_20px_60px_rgba(106,30,43,0.25)] transition"
          >
            {step === steps.length - 1 ? "Start Thrive" : "Continue"}
          </button>

        </div>

      </div>
    </div>
  )
}