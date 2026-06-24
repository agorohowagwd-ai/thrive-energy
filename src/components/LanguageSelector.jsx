export default function LanguageSelector({
    language,
    setLanguage,
  }) {
    return (
      <div className="flex gap-2 justify-center mb-6">
  
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-full text-xs border transition ${
            language === "en"
              ? "bg-black text-white"
              : "bg-white/40"
          }`}
        >
          EN
        </button>
  
        <button
          onClick={() => setLanguage("ru")}
          className={`px-3 py-1 rounded-full text-xs border transition ${
            language === "ru"
              ? "bg-black text-white"
              : "bg-white/40"
          }`}
        >
          RU
        </button>
  
        <button
          onClick={() => setLanguage("ar")}
          className={`px-3 py-1 rounded-full text-xs border transition ${
            language === "ar"
              ? "bg-black text-white"
              : "bg-white/40"
          }`}
        >
          AR
        </button>
  
      </div>
    )
  }