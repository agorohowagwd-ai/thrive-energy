import { motion } from "framer-motion"

export default function GlassCard({
  children,
  exiting = false,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 30,
      }}
      animate={{
        opacity: exiting ? 0 : 1,
        scale: exiting ? 1.03 : 1,
        y: exiting ? -12 : 0,
        filter: exiting
          ? "blur(10px)"
          : "blur(0px)",
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        w-full
        max-w-[460px]

        rounded-[40px]

        /* GLASS BASE */
        bg-white/30

        backdrop-blur-[70px]

        /* BORDER DEPTH */
        border border-white/60

        /* SOFT SHADOW (more depth) */
        shadow-[0_70px_200px_rgba(0,0,0,0.12)]

        overflow-hidden
      "
    >
      {/* =========================
          TOP LIGHT SHEEN (premium glass highlight)
      ========================= */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-white/50
          via-white/10
          to-transparent
          pointer-events-none
        "
      />

      {/* =========================
          CORNER LIGHT ORB (adds life)
      ========================= */}
      <div
        className="
          absolute
          -top-24
          -left-24
          w-[220px]
          h-[220px]
          bg-white/40
          blur-[90px]
          rounded-full
          opacity-60
        "
      />

      {/* =========================
          SECOND LIGHT DEPTH ORB
      ========================= */}
      <div
        className="
          absolute
          -bottom-28
          -right-28
          w-[260px]
          h-[260px]
          bg-[#6A1E2B]/10
          blur-[100px]
          rounded-full
          opacity-40
        "
      />

      {/* =========================
          INNER BORDER LAYER (more realistic glass edge)
      ========================= */}
      <div
        className="
          absolute
          inset-[1px]
          rounded-[39px]
          border border-white/30
          pointer-events-none
        "
      />

      {/* =========================
          MICRO NOISE / MATTE TEXTURE FEEL
          (fake noise via gradient layering)
      ========================= */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.06]
          bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 p-10">
        {children}
      </div>

    </motion.div>
  )
}