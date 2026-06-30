import crypto from "crypto"
import { supabase } from "../supabase.js"

export async function telegramAuth(req, res) {
  try {
    const { initData } = req.body

    if (!initData) {
      return res.status(400).json({
        error: "No initData",
      })
    }

    //────────────────────────────
    // 1. PARSE INIT DATA
    //────────────────────────────

    const urlParams = new URLSearchParams(initData)

    const hash = urlParams.get("hash")
    urlParams.delete("hash")

    const dataCheckString = [...urlParams.entries()]
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join("\n")

    //────────────────────────────
    // 2. VERIFY SIGNATURE
    //────────────────────────────

    const secret = crypto
      .createHmac("sha256", "WebAppData")
      .update(process.env.TELEGRAM_BOT_TOKEN)
      .digest()

    const checkHash = crypto
      .createHmac("sha256", secret)
      .update(dataCheckString)
      .digest("hex")

    if (checkHash !== hash) {
      return res.status(403).json({
        error: "Invalid Telegram signature",
      })
    }

    //────────────────────────────
    // 3. GET USER
    //────────────────────────────

    const userData = JSON.parse(
      urlParams.get("user")
    )

    const telegramId = userData.id

    //────────────────────────────
    // 4. UPSERT USER IN SUPABASE
    //────────────────────────────

    const { data, error } = await supabase
      .from("users")
      .upsert({
        telegram_id: telegramId,
        name: userData.first_name,
        username: userData.username,
        updated_at: new Date(),
      })
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error })
    }

    //────────────────────────────
    // 5. CREATE SUPABASE SESSION (OPTION A)
    //────────────────────────────

    const { data: session } =
      await supabase.auth.admin.generateLink({
        type: "magiclink",
        email: `${telegramId}@telegram.local`,
      })

    return res.json({
      user: data,
      session,
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      error: "Server error",
    })
  }
}