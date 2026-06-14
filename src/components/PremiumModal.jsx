export default function PremiumModal({ onClose, onUpgrade }) {

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
  
        <div className="w-[420px] rounded-3xl bg-white p-8 shadow-2xl border border-black/5">
  
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/40">
            Thrive Premium
          </div>
  
          <h2 className="text-3xl font-semibold mt-4">
            Unlock Deep Insights
          </h2>
  
          <p className="text-black/50 mt-3 leading-6">
            Get access to advanced analytics, energy trends,
            and AI-generated recommendations.
          </p>
  
          <div className="mt-6 space-y-3">
  
            <div className="text-sm text-black/60">
              ✔ Weekly energy breakdown
            </div>
  
            <div className="text-sm text-black/60">
              ✔ Performance trends
            </div>
  
            <div className="text-sm text-black/60">
              ✔ Smart insights
            </div>
  
          </div>
  
          <button
            onClick={onUpgrade}
            className="w-full mt-8 py-4 rounded-2xl bg-[#6A1E2B] text-white hover:shadow-lg transition"
          >
            Upgrade for $9/mo
          </button>
  
          <button
            onClick={onClose}
            className="w-full mt-3 py-3 text-sm text-black/40 hover:text-black transition"
          >
            Maybe later
          </button>
  
        </div>
  
      </div>
    )
  }