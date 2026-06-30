import { supabase } from "../supabase"

//────────────────────────────
// LOAD ENTRIES
//────────────────────────────

export async function getEntries(userId) {
  if (!userId) return []

  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("getEntries error:", error)
    return []
  }

  return data
}

//────────────────────────────
// ADD ENTRY
//────────────────────────────

export async function createEntry(userId, entry) {
  const { error } = await supabase.from("entries").insert({
    user_id: userId,
    ...entry,
  })

  if (error) {
    console.error("createEntry error:", error)
    return false
  }

  return true
}

//────────────────────────────
// DELETE ENTRY
//────────────────────────────

export async function removeEntry(id) {
  const { error } = await supabase
    .from("entries")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("deleteEntry error:", error)
    return false
  }

  return true
}