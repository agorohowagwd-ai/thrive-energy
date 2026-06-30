export default function KPIGrid({ stats }) {
    //────────────────────────────
    // SAFETY LAYER (CRASH FIX)
    //────────────────────────────
  
    const safeStats = stats || {
      average: 0,
      highest: 0,
      lowest: 0,
      streak: 0,
    }
  
    const cards = [
      {
        label: "Average",
        value: safeStats.average,
        subtitle: "Energy level",
      },
      {
        label: "Peak",
        value: safeStats.highest,
        subtitle: "Highest value",
      },
      {
        label: "Low",
        value: safeStats.lowest,
        subtitle: "Minimum energy",
      },
      {
        label: "Streak",
        value: safeStats.streak,
        subtitle: "Active days",
      },
    ]
  
    return (
      <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-12">
  
        {cards.map((card) => (
          <div
            key={card.label}
            className="
              group
              rounded-[24px]
              md:rounded-[28px]
              bg-white/60
              backdrop-blur-2xl
              border
              border-black/5
              p-5
              md:p-6
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-[#6A1E2B]/20
              hover:shadow-[0_25px_80px_rgba(106,30,43,0.12)]
            "
          >
            {/* LABEL */}
            <div className="text-xs uppercase tracking-[0.3em] text-black/40">
              {card.label}
            </div>
  
            {/* VALUE */}
            <div
              className="
                mt-4
                text-3xl
                md:text-4xl
                font-semibold
                transition-colors
                group-hover:text-[#6A1E2B]
              "
            >
              {card.value}
            </div>
  
            {/* SUBTITLE */}
            <div className="text-sm text-black/40 mt-2">
              {card.subtitle}
            </div>
          </div>
        ))}
  
      </div>
    )
  }