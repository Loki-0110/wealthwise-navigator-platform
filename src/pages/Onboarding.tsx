
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

type OnboardingStep = {
  title: string;
  description: string;
  component: React.ReactNode;
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // User profile data
  const [fullName, setFullName] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(15); // Default 15%

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to WealthWise",
      description: "Let's get your financial journey started with a few simple steps.",
      component: (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-24 h-24 rounded-full bg-finance-blue-dark flex items-center justify-center text-white mb-6">
            <div className="text-4xl font-bold">W</div>
          </div>
          <p className="text-center text-gray-600 max-w-md">
            WealthWise helps you track your spending, set budgets, save for your goals, and make smarter financial decisions.
          </p>
        </div>
      ),
    },
    {
      title: "Personal Information",
      description: "Tell us a bit about yourself.",
      component: (
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Your Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="John Doe" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Financial Information",
      description: "Add some basic financial details to get started.",
      component: (
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
            <Input 
              id="monthlyIncome" 
              type="number" 
              placeholder="5000" 
              value={monthlyIncome || ""}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2 pt-4">
            <div className="flex justify-between">
              <Label htmlFor="savingsGoal">Monthly Savings Goal</Label>
              <span className="text-sm font-medium">{savingsGoal}%</span>
            </div>
            <Slider 
              id="savingsGoal"
              defaultValue={[savingsGoal]}
              max={50}
              step={1}
              onValueChange={(values) => setSavingsGoal(values[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "You're All Set!",
      description: "Let's start your financial journey.",
      component: (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
            <Check size={32} />
          </div>
          <p className="text-center text-gray-600 max-w-md">
            Great job! You've completed the initial setup. Your personalized dashboard is ready.
          </p>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  const handleFinish = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to save your preferences",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: fullName,
          monthly_income: monthlyIncome,
          savings_goal_percent: savingsGoal,
        })
        .select();

      if (error) throw error;

      toast({
        title: "Setup complete!",
        description: "Your profile has been successfully updated.",
      });
      
      // Create default budget categories
      const defaultCategories = [
        { name: "Housing", monthly_limit: monthlyIncome * 0.3, color: "#2563eb", icon: "home", user_id: user.id },
        { name: "Food", monthly_limit: monthlyIncome * 0.15, color: "#16a34a", icon: "utensils", user_id: user.id },
        { name: "Transportation", monthly_limit: monthlyIncome * 0.15, color: "#ca8a04", icon: "car", user_id: user.id },
        { name: "Entertainment", monthly_limit: monthlyIncome * 0.1, color: "#9333ea", icon: "film", user_id: user.id },
        { name: "Utilities", monthly_limit: monthlyIncome * 0.1, color: "#dc2626", icon: "zap", user_id: user.id }
      ];
      
      await supabase.from('budget_categories').upsert(defaultCategories);
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {currentStepData.title}
            <span className="text-sm font-normal text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </CardTitle>
          <p className="text-gray-500 text-sm">{currentStepData.description}</p>
        </CardHeader>
        <CardContent>
          {currentStepData.component}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={loading}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            {isLastStep ? "Finish" : "Next"} {isLastStep ? <Check className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
