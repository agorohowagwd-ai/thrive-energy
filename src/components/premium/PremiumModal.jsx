export default function PremiumModal({
    open,
    onClose,
  }) {
    if (!open) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
  
        <div className="w-[90%] max-w-md rounded-[30px] bg-white p-8">
  
          <h2 className="text-2xl font-semibold">
            Thrive Premium
          </h2>
  
          <div className="mt-6 space-y-3 text-black/65">
  
            <div>✓ AI Coach</div>
  
            <div>✓ Pattern Detection</div>
  
            <div>✓ Weekly Reports</div>
  
            <div>✓ Calendar Analytics</div>
  
            <div>✓ Future Predictions</div>
  
          </div>
  
          <button
            className="mt-8 w-full rounded-xl bg-[#6A1E2B] py-3 text-white"
          >
            Coming Soon
          </button>
  
          <button
            onClick={onClose}
            className="mt-3 w-full text-black/40"
          >
            Close
          </button>
  
        </div>
  
      </div>
    )
  }