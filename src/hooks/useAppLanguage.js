import { useLanguage as ctx } from "../contexts/LanguageContext"

export default function useAppLanguage() {
  const { language, setLanguage, t } = ctx()
  return { language, setLanguage, t }
}