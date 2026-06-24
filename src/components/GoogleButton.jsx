import { motion } from "framer-motion"

export default function GoogleButton({
  onClick,
  loading = false,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      disabled={loading}
      className="
        relative

        w-full

        overflow-hidden

        rounded-2xl

        border

        border-white/70

        bg-white/45

        backdrop-blur-xl

        transition-all

        duration-500

        hover:bg-white/65

        hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)]

        disabled:opacity-60
      "
    >

      {/* light reflection */}

      <div
        className="
          absolute

          inset-0

          bg-gradient-to-b

          from-white/35

          via-transparent

          to-transparent

          pointer-events-none
        "
      />

      <div
        className="
          relative

          flex

          items-center

          justify-center

          gap-3

          py-3
        "
      >

        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.6 20H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.7-.4-4z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4C16.3 4 9.7 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.6 39.5 16.1 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20H42V20H24v8h11.3c-1 2.8-3 5.1-5.7 6.5l6.3 5.3C39.5 36.3 44 30.8 44 24c0-1.3-.1-2.7-.4-4z"
          />
        </svg>

        <span
          className="
            font-medium

            text-slate-700
          "
        >
          {loading
            ? "Connecting..."
            : "Continue with Google"}
        </span>

      </div>

    </motion.button>
  )
}