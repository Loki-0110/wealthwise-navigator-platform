
import { createClient } from "@supabase/supabase-js";

// Get environment variables using Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
