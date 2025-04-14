
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileLock, User } from "lucide-react";
import { toast } from "sonner";
import { validateEmail, validatePassword, validateFullName } from "./validation";
import { FormInputField } from "./FormInputField";
import { TermsCheckbox } from "./TermsCheckbox";
import { GoogleSignInButton } from "./GoogleSignInButton";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { signUp, signInWithGoogle, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim the email and fullName to remove any accidental spaces
    const trimmedEmail = email.trim();
    const trimmedFullName = fullName.trim();
    
    if (!validateEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!validateFullName(trimmedFullName)) {
      toast.error("Please enter your full name (first and last name)");
      return;
    }
    
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters and include letters, numbers, and special characters");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    
    // Create user metadata with full name
    const userMetadata = {
      full_name: trimmedFullName
    };
    
    await signUp(trimmedEmail, password, userMetadata);
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signInWithGoogle();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to create your WealthWise account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInputField
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={User}
            required
          />
          
          <FormInputField
            id="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />
          
          <FormInputField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FileLock}
            required
            helpText="Password must be at least 8 characters and include both letters and numbers."
          />
          
          <FormInputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={FileLock}
            required
          />
          
          <TermsCheckbox 
            checked={agreeToTerms} 
            onChange={() => setAgreeToTerms(!agreeToTerms)}
          />
          
          <Button
            type="submit"
            className="w-full bg-finance-blue-dark hover:bg-finance-blue"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <GoogleSignInButton 
          onClick={handleGoogleSignIn}
          isLoading={isLoading}
        />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
