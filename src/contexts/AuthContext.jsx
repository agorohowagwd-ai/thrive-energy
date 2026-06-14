import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import { supabase } from "../supabase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        loadSession()

        const { data } = supabase.auth.onAuthStateChange(
            (_event, session) => {

                setUser(session?.user || null)
                setLoading(false)

                if (session?.user) {
                    ensureProfile(session.user)
                }

            }
        )

        return () => {
            data.subscription.unsubscribe()
        }

    }, [])

    async function loadSession() {

        const { data } = await supabase.auth.getSession()

        const session = data?.session

        setUser(session?.user || null)

        if (session?.user) {
            await ensureProfile(session.user)
        }

        setLoading(false)

    }

    async function ensureProfile(user) {

        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle()

        if (!data) {

            await supabase.from("profiles").insert({
                id: user.id,
                name: user.user_metadata?.name || "User",
            })

        }

    }

    async function signOut() {
        await supabase.auth.signOut()
        setUser(null)
    }

    const value = {
        user,
        loading,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context

}if (!user) {
    setLoading(false)
    return
}