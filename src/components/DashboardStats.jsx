export default function DashboardStats({ stats }) {
    const cards = [
      {
        title: "Average",
        value: stats.average,
        subtitle: "Energy level",
      },
      {
        title: "Peak",
        value: stats.highest,
        subtitle: "Highest value",
      },
      {
        title: "Low",
        value: stats.lowest,
        subtitle: "Minimum energy",
      },
      {
        title: "Streak",
        value: stats.streak,
        subtitle: "Active days",
      },
    ]
  
    return (
      <div
        className="
          relative
          z-10
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-4
          md:gap-5
          mb-10
          md:mb-12
        "
      >
        {cards.map((card) => (
          <div
            key={card.title}
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
  
            <div className="text-xs uppercase tracking-[0.3em] text-black/40">
              {card.title}
            </div>
  
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
  
            <div className="text-sm text-black/40 mt-2">
              {card.subtitle}
            </div>
  
          </div>
        ))}
      </div>
    )
  }