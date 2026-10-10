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
    <div className="iridescent min-h-screen flex flex-col text-paper">

      {/* TOP BAR */}
      <div className="h-[66px] px-5 md:px-10 flex items-center justify-between">
        <span className="text-[16px] font-semibold uppercase">Thrive</span>
        <span className="eyebrow !text-white/80">
          Thrive Onboarding
        </span>
        <span className="eyebrow !text-white/80">
          0{step + 1} / 0{steps.length}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center px-5 md:px-10">
        <div key={step} className="reveal max-w-4xl">

          <h1 className="text-[54px] sm:text-[78px] md:text-[94px] font-normal leading-[0.95]">
            {current.title}
          </h1>

          <p className="mt-8 max-w-md text-[18px] md:text-[29px] font-light leading-[1.25] text-white/85">
            {current.desc}
          </p>

        </div>
      </div>

      {/* PROGRESS + CONTROLS */}
      <div className="px-5 md:px-10 pb-10">

        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-px flex-1 transition-colors duration-800 ease-expo ${
                i <= step ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between">

          <button
            onClick={back}
            className="pill pill-dark"
          >
            Back
          </button>

          <button
            onClick={next}
            className="pill pill-dark !border-white"
          >
            {step === steps.length - 1 ? "Start Thrive" : "Continue"}
          </button>

        </div>

      </div>
    </div>
  )
}
