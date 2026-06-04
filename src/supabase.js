import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  "https://goikzopuuhfjtqosurnr.supabase.co"

const supabaseKey =
  "sb_publishable_4Vg_Y708G-24J-3ce340Ug_xJM4wShO"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)