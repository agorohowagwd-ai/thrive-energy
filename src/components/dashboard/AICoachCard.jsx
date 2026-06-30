export default function AICoachCard({ entries, stats }) {
    const hasData = entries.length > 0
    
    const insight = hasData
    ? stats.average >= 7
    ? "Your recent entries show consistently strong energy levels. You perform best when activity remains structured and predictable."
    : stats.average >= 5
    ? "Your energy remains stable but fluctuates throughout the week. Small improvements in routine consistency could increase performance."
    : "Recent entries indicate lower energy patterns. Recovery, sleep quality and workload balance may require attention."
    : "Start logging entries to unlock personalized AI-powered energy insights."
    
    const pattern =
    stats.average >= 7
    ? "High Stability"
    : stats.average >= 5
    ? "Moderate Stability"
    : "Variable Energy"
    
    const recovery =
    stats.average >= 7
    ? "Strong"
    : stats.average >= 5
    ? "Moderate"
    : "Needs Attention"
    
    return ( <section className="relative z-10 mb-12">
    
       <div
        className="
        rounded-[32px]
        bg-white/70
        backdrop-blur-2xl
        border
        border-black/5
        p-6
        md:p-8
        transition-all
        duration-500
        hover:border-[#6A1E2B]/20
        hover:shadow-[0_30px_90px_rgba(106,30,43,0.10)]
      "
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
    
          <div>
    
            <div className="text-[11px] uppercase tracking-[0.35em] text-black/40">
              AI Coach
            </div>
    
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
              Energy Intelligence
            </h2>
    
          </div>
    
          <div
            className="
            self-start
            px-3
            py-2
            rounded-full
            bg-[#6A1E2B]/5
            text-[#6A1E2B]
            text-xs
            font-medium
          "
          >
            Live Analysis
          </div>
    
        </div>
    
        <div
          className="
          mt-6
          text-black/60
          leading-7
          max-w-4xl
        "
        >
          {insight}
        </div>
    
        <div
          className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        "
        >
    
          <div
            className="
            rounded-2xl
            bg-white/50
            border
            border-black/5
            p-5
            transition
            hover:border-[#6A1E2B]/20
          "
          >
            <div className="text-xs uppercase tracking-[0.2em] text-black/40">
              Pattern
            </div>
    
            <div className="mt-3 text-lg font-medium">
              {pattern}
            </div>
          </div>
    
          <div
            className="
            rounded-2xl
            bg-white/50
            border
            border-black/5
            p-5
            transition
            hover:border-[#6A1E2B]/20
          "
          >
            <div className="text-xs uppercase tracking-[0.2em] text-black/40">
              Peak Energy
            </div>
    
            <div className="mt-3 text-lg font-medium">
              {stats.highest || 0}/10
            </div>
          </div>
    
          <div
            className="
            rounded-2xl
            bg-white/50
            border
            border-black/5
            p-5
            transition
            hover:border-[#6A1E2B]/20
          "
          >
            <div className="text-xs uppercase tracking-[0.2em] text-black/40">
              Recovery
            </div>
    
            <div className="mt-3 text-lg font-medium">
              {recovery}
            </div>
          </div>
    
        </div>
      </div>
    
    </section>
   
    
    )
    }
    