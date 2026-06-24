export default function DashboardHeader({ stats }) {
    const hour = new Date().getHours()
  
    const greeting =
      hour < 12
        ? "Good Morning"
        : hour < 18
        ? "Good Afternoon"
        : "Good Evening"
  
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  
    const trend =
      Number(stats.average) >= 7
        ? "Your energy trend is improving."
        : Number(stats.average) >= 5
        ? "Your energy remains stable."
        : "Your energy may need recovery."
  
    return (
      <div className="relative z-10 mb-12 md:mb-16">
  
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
  
          <div>
  
            <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
              Thrive Dashboard
            </div>
  
            <h1
              className="
                mt-4
                text-4xl
                md:text-5xl
                xl:text-6xl
                font-semibold
                tracking-tight
              "
            >
              {greeting}
            </h1>
  
            <div className="mt-3 text-black/40">
              {today}
            </div>
  
            <p className="mt-4 text-black/55 max-w-xl leading-7">
              {trend}
            </p>
  
          </div>
  
          <div
            className="
              rounded-[28px]
              bg-white/70
              backdrop-blur-2xl
              border
              border-black/5
              px-6
              py-5
              min-w-[260px]
            "
          >
  
            <div className="text-xs uppercase tracking-[0.25em] text-black/40">
              Energy Status
            </div>
  
            <div className="mt-3 text-3xl font-semibold">
              {stats.average}
            </div>
  
            <div className="mt-2 text-sm text-black/50">
              Average energy score
            </div>
  
          </div>
  
        </div>
  
      </div>
    )
  }