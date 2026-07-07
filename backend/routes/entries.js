import express from "express"
import { supabaseAdmin } from "../supabase.js"

const router = express.Router()

//────────────────────────────
// GET ENTRIES
//────────────────────────────

router.get("/:telegramId", async (req, res) => {
  const { telegramId } = req.params

  const { data, error } = await supabaseAdmin
    .from("entries")
    .select("*")
    .eq("telegram_id", telegramId)
    .order("created_at", { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json(data)
})

//────────────────────────────
// CREATE ENTRY
//────────────────────────────

router.post("/", async (req, res) => {
  const { telegram_id, ...entry } = req.body

  const { data, error } = await supabaseAdmin
    .from("entries")
    .insert([{ telegram_id, ...entry }])
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json(data)
})

//────────────────────────────
// DELETE ENTRY
//────────────────────────────

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const { error } = await supabaseAdmin
    .from("entries")
    .delete()
    .eq("id", id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json({ success: true })
})

export default router