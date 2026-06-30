import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase"
import { useTelegram } from "../telegram/useTelegram"

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const { telegramUser, isTelegram } = useTelegram()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        // На следующем этапе здесь будет:
        //
        // POST /telegram/auth
        // backend проверит initData
        // backend создаст пользователя
        // backend вернет Supabase Session
        // await supabase.auth.setSession(...)
        //
        // Пока просто читаем существующую Supabase-сессию.

        const { data } = await supabase.auth.getSession()

        if (!mounted) return

        if (data.session?.user) {
          setUser(data.session.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error("User init:", err)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [telegramUser, isTelegram])

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        telegramUser,
        isTelegram,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be used inside UserProvider")
  }

  return context
}