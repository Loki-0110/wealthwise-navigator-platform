import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileLock } from "lucide-react";
import { toast } from "sonner";

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return password.length >= minLength && hasLetter && hasNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters and include both letters and numbers");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ 
        password: password
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password updated successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error("An error occurred while resetting your password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated for password reset
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Invalid or expired password reset link");
        navigate("/login");
      }
    };
    
    checkSession();
  }, [navigate]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <FileLock className="absolute left-3 top-3 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters and include both letters and numbers.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <FileLock className="absolute left-3 top-3 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-finance-blue-dark hover:bg-finance-blue"
            disabled={loading}
          >
            {loading ? "Setting new password..." : "Set new password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
