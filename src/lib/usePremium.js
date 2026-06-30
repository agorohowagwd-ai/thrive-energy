import { useEffect, useState } from "react"
import { supabase } from "../supabase"

export default function usePremium(user) {

  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (!user) {
      setIsPremium(false)
      setLoading(false)
      return
    }

    const checkPremium = async () => {

      setLoading(true)

      const { data } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .single()

      setIsPremium(data?.is_premium || false)
      setLoading(false)
    }

    checkPremium()

  }, [user])

  return { isPremium, loading }
}