import { useEffect, useState } from "react"

export default function useTelegramAuth() {
  const [telegramUser, setTelegramUser] = useState(null)

  useEffect(() => {
    if (!window.Telegram?.WebApp) return

    const tg = window.Telegram.WebApp

    tg.ready()
    tg.expand()

    if (tg.initDataUnsafe?.user) {
      setTelegramUser(tg.initDataUnsafe.user)
    }
  }, [])

  return telegramUser
}