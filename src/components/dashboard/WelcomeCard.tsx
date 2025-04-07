
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const WelcomeCard = () => {
  const isReturningUser = false;
  const username = "there";

  return (
    <Card className="card-hover bg-gradient-to-br from-finance-blue-dark to-finance-blue text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isReturningUser ? `Welcome back, ${username}!` : "Welcome to WealthWise!"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          {isReturningUser 
            ? "Your financial journey is on track. Here's a summary of your current status."
            : "Get started with personalized financial planning in just a few steps."}
        </p>
        {!isReturningUser && (
          <Button className="bg-finance-yellow text-finance-blue-dark hover:bg-white" asChild>
            <Link to="/onboarding" className="flex items-center">
              Get Started <ChevronRight size={16} className="ml-2" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
