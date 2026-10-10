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
    <div className="border-t border-b border-obsidian py-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>

      {trialActive ? (
        <>
          <div className="eyebrow flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
            Trial
          </div>

          <h2 className="mt-4 text-[29px] md:text-[39px] font-light leading-[1.1]">
            {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} remaining
          </h2>

          <p className="mt-3 text-[16px] leading-[1.58] text-felt max-w-xl">
            Enjoy all Premium features during your free trial.
          </p>
        </>
      ) : (
        <>
          <div className="eyebrow flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
            Premium
          </div>

          <h2 className="mt-4 text-[29px] md:text-[39px] font-light leading-[1.1]">
            Your free trial has ended
          </h2>

          <p className="mt-3 text-[16px] leading-[1.58] text-felt max-w-xl">
            Unlock AI Coach, Predictions, Calendar Analytics and Weekly Reports.
          </p>
        </>
      )}

      {locked && (
        <div className="mt-3 text-[12px] text-ash">
          AI features are currently locked.
        </div>
      )}
      </div>

      <button
        onClick={onUpgrade}
        className="pill self-start md:self-end shrink-0"
      >
        Upgrade
      </button>

    </div>
  )
}