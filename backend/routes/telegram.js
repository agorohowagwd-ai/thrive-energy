import express from "express"
import crypto from "crypto"
import { supabaseAdmin } from "../supabase.js"
const router = express.Router()

//────────────────────────────
// VERIFY TELEGRAM SIGNATURE
//────────────────────────────

function verifyTelegram(initData) {
  const params = new URLSearchParams(initData)

  const hash = params.get("hash")

  if (!hash) return false

  params.delete("hash")

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n")

  const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(process.env.BOT_TOKEN)
    .digest()

  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest("hex")

  return computedHash === hash
}

//────────────────────────────
// TELEGRAM AUTH
//────────────────────────────

router.post("/auth", async (req, res) => {
  try {
    const { initData } = req.body

    if (!initData) {
      return res.status(400).json({
        success: false,
        error: "Missing initData",
      })
    }

    //----------------------------------
    // VERIFY
    //----------------------------------

    const valid = verifyTelegram(initData)

    if (!valid) {
      return res.status(401).json({
        success: false,
        error: "Invalid Telegram signature",
      })
    }

    //----------------------------------
    // USER
    //----------------------------------

    const params = new URLSearchParams(initData)

    const tgUser = JSON.parse(params.get("user"))

    //----------------------------------
    // UPSERT USER
    //----------------------------------

    const { data, error } = await supabaseAdmin
      .from("users")
      .upsert(
        {
          telegram_id: tgUser.id,
          username: tgUser.username ?? null,
          first_name: tgUser.first_name ?? "",
          last_name: tgUser.last_name ?? "",
          photo_url: tgUser.photo_url ?? null,
          language_code: tgUser.language_code ?? "en",
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "telegram_id",
        }
      )
      .select()
      .single()

    if (error) {
      console.error(error)

      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }

    //----------------------------------
    // SUCCESS
    //----------------------------------

    return res.json({
      success: true,
      user: data,
    })

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

export default router