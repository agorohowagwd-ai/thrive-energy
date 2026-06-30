export function getTelegram() {
    if (typeof window === "undefined") return null
  
    return window.Telegram?.WebApp ?? null
  }
  
  export function initTelegram() {
    const tg = getTelegram()
  
    if (!tg) return
  
    tg.ready()
    tg.expand()
  
    return tg
  }
  
  export function getTelegramUser() {
    const tg = getTelegram()
  
    if (!tg) return null
  
    return tg.initDataUnsafe?.user ?? null
  }
  
  export function isTelegram() {
    return !!getTelegram()
  }
  
  export function haptic(type = "light") {
    const tg = getTelegram()
  
    if (!tg) return
  
    tg.HapticFeedback?.impactOccurred(type)
  }
  
  export function mainButton(text, callback) {
    const tg = getTelegram()
  
    if (!tg) return
  
    tg.MainButton.setText(text)
    tg.MainButton.show()
  
    tg.MainButton.onClick(callback)
  }
  
  export function hideMainButton() {
    const tg = getTelegram()
  
    if (!tg) return
  
    tg.MainButton.hide()
  }
  
  export function backButton(callback) {
    const tg = getTelegram()
  
    if (!tg) return
  
    tg.BackButton.show()
  
    tg.BackButton.onClick(callback)
  }