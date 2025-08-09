// Supabase Edge Function: auth-signup
// Handles POST /auth-signup to create a user WITHOUT email verification and returns a session JWT
// Requires SUPABASE_SERVICE_ROLE_KEY secret to be set in the project
// CORS enabled for browser requests

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://rpjurazuqeycxghpyypu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwanVyYXp1cWV5Y3hnaHB5eXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjA0NDcsImV4cCI6MjA2MDEzNjQ0N30.AUs5Mo2-dNg5a9bplEpS6DHmMzt5aJ8WuOXvZFmVQ7Q";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const cors = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors(origin) });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...cors(origin) },
    });
  }

  if (!SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: "Service role key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...cors(origin) },
    });
  }

  try {
    const { email, password, full_name } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors(origin) },
      });
    }

    // Create user with email confirmed using service role
    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data: created, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: full_name || "",
      },
    });

    if (createError || !created.user) {
      const message = createError?.message || "Failed to create user";
      const code = message.includes("duplicate key value") || message.includes("already registered") ? 409 : 400;
      return new Response(JSON.stringify({ error: message }), {
        status: code,
        headers: { "Content-Type": "application/json", ...cors(origin) },
      });
    }

    // Immediately sign the user in to return a session
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: login, error: loginError } = await anonClient.auth.signInWithPassword({ email, password });

    if (loginError || !login.session) {
      return new Response(JSON.stringify({ error: loginError?.message || "Failed to create session" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...cors(origin) },
      });
    }

    const responseBody = {
      user: login.user,
      session: {
        access_token: login.session.access_token,
        refresh_token: login.session.refresh_token,
        expires_in: login.session.expires_in,
        token_type: login.session.token_type,
      },
    };

    return new Response(JSON.stringify(responseBody), {
      status: 201,
      headers: { "Content-Type": "application/json", ...cors(origin) },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message || "Unexpected error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...cors(origin) },
    });
  }
});
