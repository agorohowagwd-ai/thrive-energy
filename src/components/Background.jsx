import { useEffect, useState } from "react"

export default function AnimatedBackground({ focus }) {
  const [t, setT] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setT((v) => v + 1)
    }, 30)

    return () => clearInterval(id)
  }, [])

  // intensity reacts to input focus
  const intensity = focus ? 1.8 : 1

  const breath = Math.sin(t * 0.01) * intensity
  const drift = Math.sin(t * 0.003) * intensity
  const flow = Math.cos(t * 0.008) * intensity

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FAFAF8]">

      {/* BASE FIELD */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(106,30,43,0.10), transparent 60%)",
        }}
      />

      {/* MAIN ORGANIC BLOOM */}
      <div
        className="absolute left-1/2 top-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(160,90,100,0.14), transparent 65%)",
          transform: `
            translate(-50%, -50%)
            scale(${1.1 + breath * 0.05})
            translateX(${drift * 20}px)
            translateY(${flow * 15}px)
          `,
        }}
      />

      {/* SECOND LAYER */}
      <div
        className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(120,60,70,0.10), transparent 60%)",
          transform: `
            translate(-50%, -50%)
            scale(${1 + flow * 0.06})
            rotate(${t * 0.02}deg)
          `,
        }}
      />

      {/* CORE ENERGY (ANCHOR) */}
      <div
        className="absolute left-1/2 top-1/2 w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 blur-[70px]"
        style={{
          background: `rgba(106,30,43,${focus ? 0.22 : 0.12 + breath * 0.18})`,
          boxShadow: `0 0 ${80 + breath * 80}px rgba(106,30,43,0.25)`,
          transform: `
            translate(-50%, -50%)
            scale(${1 + breath * 0.08})
          `,
        }}
      />

      {/* MATTE GLASS OVERLAY */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[70px]" />

      {/* NOISE */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/noise.png')",
        }}
      />
    </div>
  )
}