
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        setError(error.message);
        return;
      }
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    };
    
    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-20">
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
    <Card className="w-full max-w-md mx-auto mt-20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Authentication Successful</CardTitle>
        <CardDescription className="text-center">
          Redirecting you to the dashboard...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-finance-blue-dark"></div>
      </CardContent>
    </Card>
  );
};
