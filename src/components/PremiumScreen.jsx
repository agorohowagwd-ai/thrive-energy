export default function PremiumScreen({ onClose }) {

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
  
        <div className="w-[420px] rounded-[32px] bg-white p-8 shadow-2xl">
  
          <div className="text-xs uppercase tracking-[0.3em] text-black/40">
            Premium
          </div>
  
          <h2 className="mt-3 text-2xl font-semibold">
            Unlock Energy Intelligence
          </h2>
  
          <p className="mt-4 text-black/60 text-sm leading-6">
            Get AI insights, deep analytics, trends and personalized energy optimization.
          </p>
  
          <div className="mt-6 space-y-3 text-sm text-black/60">
  
            <div>✔ Advanced AI Coach</div>
            <div>✔ Weekly energy predictions</div>
            <div>✔ Productivity patterns</div>
            <div>✔ Export reports</div>
  
          </div>
  
          <button className="w-full mt-6 py-4 rounded-2xl bg-[#6A1E2B] text-white font-medium">
            Upgrade Now
          </button>
  
          <button
            onClick={onClose}
            className="w-full mt-3 text-sm text-black/40"
          >
            Maybe later
          </button>
  
        </div>
  
      </div>
    )
  }