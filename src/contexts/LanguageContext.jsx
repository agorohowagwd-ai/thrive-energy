import { createContext, useContext, useEffect, useState } from "react"

import en from "../locales/en"
import ru from "../locales/ru"
import ar from "../locales/ar"

const LanguageContext = createContext()

const dictionaries = {
  en,
  ru,
  ar,
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en"
  })

  useEffect(() => {
    localStorage.setItem("language", language)

    document.documentElement.lang = language

    // подготовка под арабский RTL
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr"
  }, [language])

  const value = {
    language,
    setLanguage,
    t: dictionaries[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}