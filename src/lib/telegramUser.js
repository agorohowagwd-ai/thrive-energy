export function normalizeTelegramUser(user) {
    if (!user) return null
  
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name || "",
      username: user.username || "",
      language: user.language_code || "en",
      photo: user.photo_url || "",
    }
  }