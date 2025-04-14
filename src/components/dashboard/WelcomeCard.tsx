
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useSupabaseData";

export const WelcomeCard = () => {
  const { user } = useAuth();
  const { profile, loading } = useProfile();

  const isReturningUser = !!user;
  const username = profile?.full_name || "there";
  const hasCompletedProfile = profile?.monthly_income > 0;

  return (
    <Card className="card-hover bg-gradient-to-br from-finance-blue-dark to-finance-blue text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isReturningUser ? `Welcome back, ${username}!` : "Welcome to WealthWise!"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          {isReturningUser && hasCompletedProfile
            ? "Your financial journey is on track. Here's a summary of your current status."
            : isReturningUser && !hasCompletedProfile
            ? "Let's complete your profile to get personalized financial insights."
            : "Get started with personalized financial planning in just a few steps."}
        </p>
        
        {!isReturningUser && (
          <Button className="bg-finance-yellow text-finance-blue-dark hover:bg-white" asChild>
            <Link to="/signup" className="flex items-center">
              Get Started <ChevronRight size={16} className="ml-2" />
            </Link>
          </Button>
        )}
        
        {isReturningUser && !hasCompletedProfile && (
          <Button className="bg-finance-yellow text-finance-blue-dark hover:bg-white" asChild>
            <Link to="/onboarding" className="flex items-center">
              Complete Your Profile <ChevronRight size={16} className="ml-2" />
            </Link>
          </Button>
        )}

        {isReturningUser && hasCompletedProfile && (
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-white/20 hover:bg-white/30 text-white" asChild>
              <Link to="/budget" className="flex items-center justify-center">
                View Budget <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white" asChild>
              <Link to="/accounts" className="flex items-center justify-center">
                Manage Accounts <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
