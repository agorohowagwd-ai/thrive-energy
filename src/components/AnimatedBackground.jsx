import { useEffect, useRef } from "react"

export default function AnimatedBackground({
  focus,
  success,
  step,
  stage,
  language = "en",
}) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")

    let w, h
    let t = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    // 🌍 LANGUAGE MODIFIER (kept, but slightly refined)
    const langFactor = {
      en: 1,
      ru: 1.15,
      ar: 0.95,
    }[language] || 1

    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, w, h)

      // =========================
      // BASE (SOFTER + MORE MATTE)
      // =========================
      const baseGradient = ctx.createLinearGradient(0, 0, w, h)
      baseGradient.addColorStop(0, "#FBFBF9")
      baseGradient.addColorStop(1, "#F4F2EF")

      ctx.fillStyle = baseGradient
      ctx.fillRect(0, 0, w, h)

      const isDashboard = stage === "dashboard"
      const typing = step === "email" && focus
      const verifying = step === "code"

      const intensity =
        isDashboard ? 2.4 :
        verifying ? 1.9 :
        typing ? 1.7 :
        1

      // =========================
      // 1. ORB SYSTEM (more depth + layering illusion)
      // =========================
      for (let i = 0; i < 9; i++) {
        const depth = i * 0.08

        const x =
          w * (0.18 + i * 0.11) +
          Math.sin(t + i * langFactor) * (isDashboard ? 35 : 95) * intensity

        const y =
          h * (0.25 + i * 0.09) +
          Math.cos(t + i * langFactor) * (isDashboard ? 25 : 80) * intensity

        const r = isDashboard ? 360 : 280

        const g = ctx.createRadialGradient(x, y, 0, x, y, r)

        const a = isDashboard ? 0.09 : 0.13

        g.addColorStop(0, `rgba(106,30,43,${a * intensity})`)
        g.addColorStop(0.5, `rgba(106,30,43,${a * 0.22})`)
        g.addColorStop(1, "rgba(106,30,43,0)")

        ctx.globalAlpha = 1 - depth
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1

      // =========================
      // 2. CORE NODE (energy bloom — more organic)
      // =========================
      const cx = w / 2
      const cy = h / 2

      const coreRadius = isDashboard ? 110 : 280

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius)

      const coreColor =
        success
          ? "rgba(255,255,255,0.7)"
          : `rgba(106,30,43,${0.28 * intensity})`

      core.addColorStop(0, coreColor)
      core.addColorStop(0.6, "rgba(106,30,43,0.08)")
      core.addColorStop(1, "rgba(106,30,43,0)")

      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2)
      ctx.fill()

      // =========================
      // 3. FLOWER / ORGANIC FIELD (kept but softened)
      // =========================
      const petals = isDashboard ? 0 : step === "code" ? 18 : 12

      for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2 + t * 0.35 * langFactor

        const px = cx + Math.cos(angle) * 120
        const py = cy + Math.sin(angle) * 120

        const pr = 80

        const g = ctx.createRadialGradient(px, py, 0, px, py, pr)

        g.addColorStop(0, `rgba(140,60,80,${0.14 * intensity})`)
        g.addColorStop(1, "rgba(140,60,80,0)")

        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2)
        ctx.fill()
      }

      // =========================
      // 4. FOCUS REACTION LAYER (NEW — makes input feel alive)
      // =========================
      if (typing) {
        ctx.fillStyle = "rgba(106,30,43,0.04)"
        ctx.fillRect(0, 0, w, h)
      }

      // =========================
      // 5. MATTE GLASS OVERLAY (stronger depth, less flat)
      // =========================
      const matte = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(w, h)
      )

      matte.addColorStop(0, "rgba(255,255,255,0.18)")
      matte.addColorStop(1, "rgba(255,255,255,0.55)")

      ctx.fillStyle = matte
      ctx.fillRect(0, 0, w, h)

      // =========================
      // 6. DASHBOARD GRID (unchanged but softer)
      // =========================
      if (isDashboard) {
        ctx.strokeStyle = "rgba(0,0,0,0.035)"
        ctx.lineWidth = 1

        const spacing = 110

        for (let x = 0; x < w; x += spacing) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, h)
          ctx.stroke()
        }

        for (let y = 0; y < h; y += spacing) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(w, y)
          ctx.stroke()
        }
      }

      // =========================
      // 7. SUCCESS WASH (more cinematic)
      // =========================
      if (success) {
        ctx.fillStyle = "rgba(255,255,255,0.65)"
        ctx.fillRect(0, 0, w, h)
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => window.removeEventListener("resize", resize)
  }, [focus, success, step, stage, language])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
    />
  )
}