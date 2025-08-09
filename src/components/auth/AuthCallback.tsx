
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Surface any provider error messages passed via URL
        const hashParams = new URLSearchParams(window.location.hash.replace('#',''));
        const searchParams = new URLSearchParams(window.location.search);
        const providerError = hashParams.get('error_description') || searchParams.get('error_description') || searchParams.get('error');
        if (providerError) {
          setError(providerError);
          toast.error(`Authentication error: ${providerError}`);
          setIsProcessing(false);
          return;
        }
        // Handling the hash fragment if it exists (OAuth providers typically use hash fragments)
        if (window.location.hash) {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Auth callback error:", error);
            setError(error.message);
            toast.error("Authentication error: " + error.message);
            setIsProcessing(false);
            return;
          }
          
          if (data.session) {
            toast.success("Successfully signed in!");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
            return;
          }
        }
        
        // Fallback to getSession without hash
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth session error:", error);
          setError(error.message);
          toast.error("Session error: " + error.message);
        } else if (data.session) {
          toast.success("Successfully authenticated");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setError("No session found. The authentication might have failed.");
          toast.error("Authentication failed. Please try again.");
        }
      } catch (err: any) {
        console.error("Unexpected error during auth callback:", err);
        setError(err.message || "An unexpected error occurred");
        toast.error("Authentication process failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center text-red-500">
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <button 
            onClick={() => navigate("/login")} 
            className="text-primary hover:underline"
          >
            Return to login
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isProcessing ? "Processing Authentication..." : "Authentication Successful"}
        </CardTitle>
        <CardDescription className="text-center">
          {isProcessing 
            ? "Please wait while we complete the authentication process."
            : "Redirecting you to the dashboard..."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-finance-blue-dark"></div>
      </CardContent>
    </Card>
  );
};
