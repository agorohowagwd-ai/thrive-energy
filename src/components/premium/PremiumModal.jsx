export default function PremiumModal({
    open,
    onClose,
  }) {
    if (!open) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
  
        <div className="w-[90%] max-w-md bg-paper p-[34px] reveal">

          <div className="eyebrow">Premium</div>
  
          <h2 className="mt-4 text-[45px] font-light leading-[1.05]">
            Thrive Premium
          </h2>
  
          <div className="mt-8 border-t border-obsidian text-[18px] [&>div]:py-3 [&>div]:border-b [&>div]:border-black/15">
  
            <div>✓ AI Coach</div>
  
            <div>✓ Pattern Detection</div>
  
            <div>✓ Weekly Reports</div>
  
            <div>✓ Calendar Analytics</div>
  
            <div>✓ Future Predictions</div>
  
          </div>
  
          <button
            className="pill pill-active mt-10 w-full"
          >
            Coming Soon
          </button>
  
          <button
            onClick={onClose}
            className="mt-4 w-full text-[12px] uppercase text-felt hover:text-obsidian transition-colors"
          >
            Close
          </button>
  
        </div>
  
      </div>
    )
  }