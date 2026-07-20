import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

//────────────────────────────
// VERIFY TELEGRAM SIGNATURE
//────────────────────────────

function verifyTelegram(initData, botToken) {
  const params = new URLSearchParams(initData);

  const hash = params.get("hash");
  if (!hash) return false;

  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest("hex");

  return computedHash === hash;
}

//────────────────────────────
// TELEGRAM AUTH ENDPOINT
//────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { initData } = req.body;

    if (!initData) {
      return res.status(400).json({ success: false, error: "Missing initData" });
    }

    const valid = verifyTelegram(initData, process.env.TELEGRAM_BOT_TOKEN);

    if (!valid) {
      return res.status(401).json({ success: false, error: "Invalid Telegram signature" });
    }

    const params = new URLSearchParams(initData);
    const userString = params.get("user");

    if (!userString) {
      return res.status(400).json({ success: false, error: "No user in initData" });
    }

    const tgUser = JSON.parse(userString);

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
        { onConflict: "telegram_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase upsert error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, user: data });
  } catch (err) {
    console.error("Telegram auth error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}