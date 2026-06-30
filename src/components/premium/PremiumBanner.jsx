import useSubscription from "../../hooks/useSubscription"

export default function PremiumBanner({ user, onUpgrade }) {
  const {
    premium,
    trialActive,
    trialDaysLeft,
    locked,
  } = useSubscription(user)

  if (premium) return null

  return (
    <div className="mb-8 rounded-[30px] border border-[#6A1E2B]/10 bg-gradient-to-r from-[#6A1E2B]/5 to-white p-6">

      {trialActive ? (
        <>
          <div className="text-xs uppercase tracking-[0.25em] text-[#6A1E2B]">
            Trial
          </div>

          <h2 className="mt-2 text-2xl font-semibold">
            {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} remaining
          </h2>

          <p className="mt-3 text-black/55">
            Enjoy all Premium features during your free trial.
          </p>
        </>
      ) : (
        <>
          <div className="text-xs uppercase tracking-[0.25em] text-[#6A1E2B]">
            Premium
          </div>

          <h2 className="mt-2 text-2xl font-semibold">
            Your free trial has ended
          </h2>

          <p className="mt-3 text-black/55">
            Unlock AI Coach, Predictions, Calendar Analytics and Weekly Reports.
          </p>
        </>
      )}

      <button
        onClick={onUpgrade}
        className="mt-6 rounded-xl bg-[#6A1E2B] px-6 py-3 text-white transition hover:opacity-90"
      >
        Upgrade
      </button>

      {locked && (
        <div className="mt-3 text-sm text-black/40">
          AI features are currently locked.
        </div>
      )}

    </div>
  )
}