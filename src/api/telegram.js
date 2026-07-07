const API =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:3001"

export async function telegramLogin(initData) {
  const res = await fetch(`${API}/telegram/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      initData,
    }),
  })

  if (!res.ok) {
    throw new Error("Telegram auth failed")
  }

  return await res.json()
}