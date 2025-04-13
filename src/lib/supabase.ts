
import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = import.meta.env.https://rpjurazuqeycxghpyypu.supabase.co;
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwanVyYXp1cWV5Y3hnaHB5eXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjA0NDcsImV4cCI6MjA2MDEzNjQ0N30.AUs5Mo2-dNg5a9bplEpS6DHmMzt5aJ8WuOXvZFmVQ7Q;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
