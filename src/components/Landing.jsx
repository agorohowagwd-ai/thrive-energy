export default function Landing({
  setView,
}) {
  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      flex
      items-center
      justify-center
      px-10
      "
    >
      {/* BACKGROUND */}

      <div
        className="
        absolute
        inset-0
        bg-[#f3eee8]
        "
      />

      {/* LIGHT 1 */}

      <div
        className="
        absolute
        top-[-250px]
        left-[-250px]
        w-[800px]
        h-[800px]
        rounded-full
        bg-[#ddd3c6]
        opacity-70
        blur-[180px]
        "
      />

      {/* LIGHT 2 */}

      <div
        className="
        absolute
        bottom-[-250px]
        right-[-250px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-[#ece6dd]
        opacity-90
        blur-[180px]
        "
      />

      {/* LIGHT 3 */}

      <div
        className="
        absolute
        top-[30%]
        right-[15%]
        w-[400px]
        h-[400px]
        rounded-full
        bg-white
        opacity-60
        blur-[120px]
        "
      />

      {/* GRID */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.15) 1px, transparent 1px)",
          backgroundSize:
            "42px 42px",
        }}
      />

      {/* CONTENT */}

      <div
        className="
        relative
        z-10
        text-center
        max-w-6xl
        "
      >
        <div
          className="
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-slate-400
          mb-8
          "
        >
          PERSONAL ENERGY SYSTEM
        </div>

        <h1
          className="
          text-[110px]
          leading-[0.95]
          tracking-[-0.06em]
          font-semibold
          text-slate-900
          "
        >
          Track
          <br />
          what fuels
          <br />
          your life.
        </h1>

        <p
          className="
          mt-10
          max-w-2xl
          mx-auto
          text-xl
          leading-relaxed
          text-slate-500
          "
        >
          Capture moments of focus,
          recovery and growth.

          Build a visual memory of
          your personal energy and
          discover what truly moves
          you forward.
        </p>

        <div
          className="
          flex
          justify-center
          gap-5
          mt-14
          "
        >
          <button
            onClick={() =>
              setView("auth")
            }
            className="
            px-10
            py-5
            rounded-full
            bg-white/55
            backdrop-blur-3xl
            border
            border-white
            text-slate-900
            font-medium
            transition-all
            duration-500
            hover:scale-[1.03]
            hover:bg-white/75
            hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            "
          >
            Start Tracking
          </button>

          <button
            className="
            px-10
            py-5
            rounded-full
            border
            border-white/80
            bg-white/20
            backdrop-blur-3xl
            text-slate-600
            transition-all
            duration-500
            hover:bg-white/40
            "
          >
            Explore
          </button>
        </div>

        {/* FLOATING GLASS CARDS */}

        <div
          className="
          absolute
          left-[-180px]
          top-[150px]
          w-[240px]
          rounded-[32px]
          bg-white/45
          backdrop-blur-[35px]
          border
          border-white
          p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.05)]
          "
        >
          <div className="text-xs text-slate-400">
            ENERGY
          </div>

          <div
            className="
            text-5xl
            font-semibold
            mt-2
            "
          >
            8.4
          </div>

          <div
            className="
            mt-2
            text-sm
            text-emerald-500
            "
          >
            Stable growth
          </div>
        </div>

        <div
          className="
          absolute
          right-[-150px]
          bottom-[40px]
          w-[260px]
          rounded-[32px]
          bg-white/45
          backdrop-blur-[35px]
          border
          border-white
          p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.05)]
          "
        >
          <div className="text-xs text-slate-400">
            INSIGHTS
          </div>

          <div
            className="
            mt-3
            text-lg
            font-medium
            text-slate-900
            "
          >
            Peak focus detected
          </div>

          <div
            className="
            mt-2
            text-sm
            text-slate-500
            "
          >
            Your best performance
            happens after exercise.
          </div>
        </div>
      </div>
    </div>
  )
}