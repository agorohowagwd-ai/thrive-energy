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
      <div className="grid grid-cols-2 xl:grid-cols-4 border-t border-obsidian">

        {cards.map((card, i) => (
          <div
            key={card.label}
            className={`
              group
              py-8
              pr-4
              ${i % 2 === 1 ? "pl-5 border-l border-black/15" : ""}
              ${i >= 2 ? "border-t xl:border-t-0 border-black/15" : ""}
              ${i === 2 ? "xl:pl-5 xl:border-l" : ""}
            `}
          >
            {/* LABEL */}
            <div className="eyebrow">
              {card.label}
            </div>

            {/* VALUE */}
            <div className="mt-6 text-[54px] md:text-[78px] font-light leading-[0.9] transition-transform duration-800 ease-expo group-hover:translate-x-1">
              {card.value}
            </div>

            {/* SUBTITLE */}
            <div className="text-[12px] text-felt mt-4">
              {card.subtitle}
            </div>
          </div>
        ))}

      </div>
    )
  }
