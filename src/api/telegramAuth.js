export async function telegramAuth(initData) {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initData,
        }),
      }
    )
  
    if (!response.ok) {
      throw new Error("Telegram auth failed")
    }
  
    return await response.json()
  }