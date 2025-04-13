
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
  throw new Error("Missing Supabase environment variables. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true
  }
});

