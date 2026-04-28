import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// creating supabase client
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_SECRET_KEY,
);

export const supabaseStorage = supabase.storage;
