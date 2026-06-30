import { useEffect, useState } from "react"

import {
  initTelegram,
  getTelegramUser,
} from "./telegram"

export function useTelegram() {
  const [telegramUser, setTelegramUser] =
    useState(null)

  const [isTelegram, setIsTelegram] =
    useState(false)

  useEffect(() => {
    if (!window.Telegram?.WebApp) return

    initTelegram()

    setIsTelegram(true)

    setTelegramUser(getTelegramUser())
  }, [])

  return {
    telegramUser,
    isTelegram,
  }
}