import express from "express";
import crypto from "crypto";
import { supabaseAdmin } from "../supabase.js";

const router = express.Router();

//────────────────────────────
// VERIFY TELEGRAM SIGNATURE
//────────────────────────────

function verifyTelegram(initData) {
  const params = new URLSearchParams(initData);

  const hash = params.get("hash");

  if (!hash) {
    console.log("Hash is missing.");
    return false;
  }

  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(process.env.BOT_TOKEN)
    .digest();

  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest("hex");

  return computedHash === hash;
}

//────────────────────────────
// TELEGRAM AUTH
//────────────────────────────

router.post("/auth", async (req, res) => {
  try {
    const { initData } = req.body;

    //----------------------------------
    // CHECK INIT DATA
    //----------------------------------

    if (!initData) {
      return res.status(400).json({
        success: false,
        error: "Missing initData",
      });
    }

    //----------------------------------
    // VERIFY SIGNATURE
    //----------------------------------

    const isValid = verifyTelegram(initData);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid Telegram signature",
      });
    }

    //----------------------------------
    // GET TELEGRAM USER
    //----------------------------------

    const params = new URLSearchParams(initData);

    const userString = params.get("user");

    if (!userString) {
      return res.status(400).json({
        success: false,
        error: "Telegram user not found",
      });
    }

    const tgUser = JSON.parse(userString);

    //----------------------------------
    // USER DATA FOR SUPABASE
    //----------------------------------

    const payload = {
      telegram_id: tgUser.id,
      username: tgUser.username ?? null,
      first_name: tgUser.first_name ?? "",
      last_name: tgUser.last_name ?? "",
      photo_url: tgUser.photo_url ?? null,
      language_code: tgUser.language_code ?? "ru",
      updated_at: new Date().toISOString(),
    };

    //----------------------------------
    // UPSERT USER
    //----------------------------------

    const { data, error } = await supabaseAdmin
      .from("app_users")
      .upsert(payload, {
        onConflict: "telegram_id",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase upsert error:", error);

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    //----------------------------------
    // SUCCESS
    //----------------------------------

    return res.json({
      success: true,
      user: data,
    });
  } catch (err) {
    console.error("Telegram auth error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;