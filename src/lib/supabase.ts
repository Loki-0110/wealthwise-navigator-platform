
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

const supabaseUrl = "https://rpjurazuqeycxghpyypu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwanVyYXp1cWV5Y3hnaHB5eXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjA0NDcsImV4cCI6MjA2MDEzNjQ0N30.AUs5Mo2-dNg5a9bplEpS6DHmMzt5aJ8WuOXvZFmVQ7Q";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true
  }
});
