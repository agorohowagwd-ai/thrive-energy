import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import { supabase } from "../supabase"
import { useAuth } from "./AuthContext"

const BillingContext = createContext(null)

export function BillingProvider({ children }) {

    const { user } = useAuth()

    const [subscription, setSubscription] = useState(null)
    const [isPremium, setIsPremium] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!user) {
            setSubscription(null)
            setIsPremium(false)
            setLoading(false)
            return
        }

        loadSubscription()

    }, [user])

    async function loadSubscription() {

        setLoading(true)

        const { data } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle()

        setSubscription(data)

        const premium =
            data?.status === "active" ||
            data?.plan === "premium"

        setIsPremium(premium)

        setLoading(false)

    }

    async function createCheckout() {

        if (!user) return

        const res = await fetch(
            "/api/create-checkout-session",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    email: user.email,
                }),
            }
        )

        const data = await res.json()

        if (data.url) {
            window.location.href = data.url
        }

    }

    const value = {
        subscription,
        isPremium,
        loading,
        createCheckout,
        refresh: loadSubscription,
    }

    return (
        <BillingContext.Provider value={value}>
            {children}
        </BillingContext.Provider>
    )

}

export function useBilling() {

    const context = useContext(BillingContext)

    if (!context) {
        throw new Error("useBilling must be used inside BillingProvider")
    }

    return context

}
if (!user) {
    setSubscription(null)
    setIsPremium(false)
    setLoading(false)
    return
}