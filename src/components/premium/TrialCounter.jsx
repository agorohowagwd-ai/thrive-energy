import useSubscription from "../../hooks/useSubscription"

export default function TrialCounter({ user }) {
  const {
    premium,
    trialActive,
    trialDaysLeft,
  } = useSubscription(user)

  if (premium || !trialActive) return null

  return (
    <div className="pill pill-sm pointer-events-none">
      Trial • {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left
    </div>
  )
}