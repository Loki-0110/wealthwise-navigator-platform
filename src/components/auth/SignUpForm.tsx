
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileLock, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { validateEmail, validatePassword, validateFullName, sanitizeEmail } from "./validation";
import { FormInputField } from "./FormInputField";
import { TermsCheckbox } from "./TermsCheckbox";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const { signUp, isLoading } = useAuth();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Trim and sanitize inputs
    const trimmedEmail = email.trim();
    const sanitizedEmail = sanitizeEmail(trimmedEmail);
    const trimmedFullName = fullName.trim();

    // Reflect sanitized email back into the field if it changed
    if (sanitizedEmail !== email) setEmail(sanitizedEmail);
    
    if (!validateEmail(sanitizedEmail)) {
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
    
    const result = await signUp(sanitizedEmail, password, userMetadata);
    
    if (!result.error && result.data?.user) {
      // AuthContext handles session + redirect to dashboard
      return;
    }
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
