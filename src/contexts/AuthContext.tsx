
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Ensure there's a profile row for the authenticated user
  const ensureUserProfile = async (u: User) => {
    try {
      const { data: existing, error: selectError } = await supabase
        .from("user_profiles")
        .select("user_id")
        .eq("user_id", u.id)
        .maybeSingle();

      if (selectError) {
        console.warn("Profile check error:", selectError);
        return;
      }

      if (!existing) {
        const fullName =
          (u.user_metadata?.full_name as string) ||
          (u.user_metadata?.name as string) ||
          "";
        const { error: insertError } = await supabase
          .from("user_profiles")
          .insert({ user_id: u.id, full_name: fullName });
        if (insertError) {
          console.warn("Profile insert error:", insertError);
        }
      }
    } catch (e) {
      console.error("ensureUserProfile failed:", e);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST to avoid missing auth events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
      if (session?.user) {
        setTimeout(() => {
          ensureUserProfile(session.user as User);
        }, 0);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    setIsLoading(true);
    try {
      // Use Edge Function to create a confirmed user and return JWT immediately
      const { data, error } = await supabase.functions.invoke("auth-signup", {
        body: {
          email,
          password,
          full_name: metadata?.full_name || "",
        },
      });

      if (error) {
        toast.error(error.message || "Failed to sign up");
        return { error, data: null };
      }

      if (data?.session?.access_token && data?.session?.refresh_token) {
        const { error: setErr } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        if (setErr) {
          toast.error(setErr.message || "Failed to start session");
          return { error: setErr, data: null };
        }

        toast.success("Account created! You're now signed in.");
        navigate("/dashboard");
        return { error: null, data };
      }

      toast.error("Unexpected signup response");
      return { error: new Error("Unexpected signup response"), data: null };
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign up");
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("auth-login", {
        body: { email, password },
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
        return { error, data: null };
      }

      if (data?.session?.access_token && data?.session?.refresh_token) {
        const { error: setErr } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        if (setErr) {
          toast.error(setErr.message || "Failed to start session");
          return { error: setErr, data: null };
        }

        toast.success("Successfully signed in!");
        navigate("/dashboard");
        return { error: null, data };
      }

      toast.error("Unexpected sign-in response");
      return { error: new Error("Unexpected sign-in response"), data: null };
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign in");
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error("Google sign-in error:", error);
        if (error.message.includes("provider is not enabled")) {
          toast.error("Google authentication is not enabled. Please use email/password login or contact the administrator.");
        } else {
          toast.error(error.message || "Failed to sign in with Google");
        }
      }
    } catch (err: any) {
      console.error("Unexpected error during Google sign-in:", err);
      toast.error(err.message || "An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Successfully signed out!");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign out");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Password reset email sent. Please check your inbox.");
      }
      
      return result;
    } catch (error: any) {
      toast.error(error.message || "An error occurred during password reset");
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
