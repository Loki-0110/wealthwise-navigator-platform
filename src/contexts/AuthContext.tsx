
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
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
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { full_name: metadata?.full_name || "" },
        },
      });

      if (signUpError) {
        toast.error(signUpError.message || "Failed to sign up");
        return { error: signUpError, data: null };
      }

      const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        toast.error(signInError.message || "Failed to sign in after sign up");
        return { error: signInError, data: null };
      }

      toast.success("Account created! You're now signed in.");
      navigate("/dashboard");
      return { error: null, data: sessionData };
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
        return { error, data: null };
      }

      toast.success("Successfully signed in!");
      navigate("/dashboard");
      return { error: null, data };
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign in");
      return { error, data: null };
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
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
