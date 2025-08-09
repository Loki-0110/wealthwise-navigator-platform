
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileLock, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { validateEmail, validatePassword, validateFullName } from "./validation";
import { FormInputField } from "./FormInputField";
import { TermsCheckbox } from "./TermsCheckbox";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const { signUp, signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Trim the email and fullName to remove any accidental spaces
    const trimmedEmail = email.trim();
    const trimmedFullName = fullName.trim();
    
    if (!validateEmail(trimmedEmail)) {
      setFormError("Please enter a valid email address");
      return;
    }
    
    if (!validateFullName(trimmedFullName)) {
      setFormError("Please enter your full name (first and last name)");
      return;
    }
    
    if (!validatePassword(password)) {
      setFormError("Password must be at least 8 characters and include letters, numbers, and special characters");
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    
    if (!agreeToTerms) {
      setFormError("You must agree to the terms and conditions");
      return;
    }
    
    // Create user metadata with full name
    const userMetadata = {
      full_name: trimmedFullName
    };
    
    const result = await signUp(trimmedEmail, password, userMetadata);
    
    if (!result.error && result.data?.user) {
      // AuthContext handles session + redirect to dashboard
      return;
    }
  };

  const handleGoogleSignIn = async () => {
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
        {formError && (
          <div className="bg-red-50 p-3 rounded-md mb-4 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{formError}</p>
          </div>
        )}
        
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
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Creating account...</span>
              </div>
            ) : "Create account"}
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
        
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04"/>
            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
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
