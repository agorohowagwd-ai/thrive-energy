import { useMemo } from "react"

export default function useSubscription(user) {
  const profile = user?.profile ?? {}

  const premium = profile.premium === true

  const trialEnds = profile.trialEnds
    ? new Date(profile.trialEnds)
    : null

  const now = new Date()

  const trialActive =
    !premium &&
    trialEnds &&
    trialEnds > now

  const trialDaysLeft = useMemo(() => {
    if (!trialActive) return 0

    const diff =
      trialEnds.getTime() - now.getTime()

    return Math.max(
      0,
      Math.ceil(diff / (1000 * 60 * 60 * 24))
    )
  }, [trialEnds, premium])

  return {
    premium,
    trialActive,
    trialDaysLeft,
    locked: !premium && !trialActive,
  }
}