import { createContext, useContext } from "react"

export const TelegramContext =
  createContext(null)

export function useTelegram() {
  return useContext(TelegramContext)
}