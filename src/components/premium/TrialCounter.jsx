import useSubscription from "../../hooks/useSubscription"

export default function TrialCounter({ user }) {
  const {
    premium,
    trialActive,
    trialDaysLeft,
  } = useSubscription(user)

  if (premium || !trialActive) return null

  return (
    <div className="rounded-full bg-[#6A1E2B]/10 px-4 py-2 text-sm text-[#6A1E2B]">
      Trial • {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left
    </div>
  )
}