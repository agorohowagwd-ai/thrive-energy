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
    
    return (
      <section>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

          <div>

            <div className="eyebrow !text-ash">
              AI Coach
            </div>

            <h2 className="mt-5 text-[45px] md:text-[78px] font-light leading-[1.05]">
              Energy Intelligence
            </h2>

          </div>

          <div className="pill pill-dark pill-sm self-start pointer-events-none">
            <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-mint" />
            Live Analysis
          </div>

        </div>

        <p className="mt-10 max-w-3xl text-[18px] md:text-[29px] font-light leading-[1.4] text-white/85">
          {insight}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 border-t border-white/30">

          {[
            ["Pattern", pattern],
            ["Peak Energy", `${stats.highest || 0}/10`],
            ["Recovery", recovery],
          ].map(([label, value], i) => (

            <div
              key={label}
              className={`py-7 ${i > 0 ? "border-t md:border-t-0 md:border-l border-white/30 md:pl-6" : ""}`}
            >
              <div className="eyebrow !text-ash">
                {label}
              </div>

              <div className="mt-3 text-[29px] font-light">
                {value}
              </div>
            </div>

          ))}

        </div>

      </section>
    )
    }
