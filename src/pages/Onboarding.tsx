
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  
  // Extended financial details
  const [employmentStatus, setEmploymentStatus] = useState("full-time");
  const [expenseBreakdown, setExpenseBreakdown] = useState({
    housing: 30,
    transportation: 15,
    food: 15,
    utilities: 10,
    entertainment: 5,
    other: 10
  });
  const [financialGoals, setFinancialGoals] = useState([
    { goal: "emergency_fund", active: true },
    { goal: "retirement", active: false },
    { goal: "home_purchase", active: false },
    { goal: "debt_payoff", active: false },
    { goal: "vacation", active: false },
  ]);
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  
  const updateExpenseBreakdown = (category: keyof typeof expenseBreakdown, value: number) => {
    setExpenseBreakdown(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const toggleFinancialGoal = (goalIndex: number) => {
    setFinancialGoals(prev => 
      prev.map((goal, index) => 
        index === goalIndex ? { ...goal, active: !goal.active } : goal
      )
    );
  };

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
          
          <div className="space-y-2 pt-2">
            <Label htmlFor="employmentStatus">Employment Status</Label>
            <Select 
              value={employmentStatus} 
              onValueChange={setEmploymentStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time employed</SelectItem>
                <SelectItem value="part-time">Part-time employed</SelectItem>
                <SelectItem value="self-employed">Self-employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
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
      title: "Expense Allocation",
      description: "How do you typically allocate your expenses?",
      component: (
        <div className="space-y-4 py-4">
          {Object.entries(expenseBreakdown).map(([category, percentage]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor={`expense-${category}`} className="capitalize">{category}</Label>
                <span className="text-sm font-medium">{percentage}%</span>
              </div>
              <Slider 
                id={`expense-${category}`}
                defaultValue={[percentage]}
                max={100}
                step={1}
                onValueChange={(values) => updateExpenseBreakdown(category as keyof typeof expenseBreakdown, values[0])}
                className="w-full"
              />
            </div>
          ))}
          <p className="text-xs text-gray-500 pt-2">
            Note: These percentages are estimates and should add up to around 85% (with ~15% for savings).
          </p>
        </div>
      ),
    },
    {
      title: "Financial Goals",
      description: "What are your primary financial goals?",
      component: (
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-3">
            {financialGoals.map((goal, index) => (
              <div 
                key={goal.goal}
                className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between ${
                  goal.active ? 'bg-finance-blue-light border-finance-blue-dark' : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => toggleFinancialGoal(index)}
              >
                <span className="capitalize">{goal.goal.replace('_', ' ')}</span>
                <div className={`w-4 h-4 rounded-full ${goal.active ? 'bg-finance-blue-dark' : 'bg-gray-300'}`}></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Risk Profile",
      description: "What's your approach to financial risk?",
      component: (
        <div className="space-y-4 py-4">
          <Label>Select your risk tolerance level:</Label>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {["conservative", "moderate", "aggressive"].map((risk) => (
              <div 
                key={risk}
                className={`p-3 border rounded-lg cursor-pointer ${
                  riskTolerance === risk ? 'bg-finance-blue-light border-finance-blue-dark' : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => setRiskTolerance(risk)}
              >
                <div className="font-medium capitalize">{risk}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {risk === "conservative" && "Lower risk, stable returns, minimal volatility"}
                  {risk === "moderate" && "Balanced risk and return, moderate volatility"}
                  {risk === "aggressive" && "Higher risk, potential for higher returns, significant volatility"}
                </div>
              </div>
            ))}
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
      // Get active financial goals
      const activeGoals = financialGoals
        .filter(g => g.active)
        .map(g => g.goal);
      
      // Save user profile data
      // Update profile if exists; otherwise insert (avoids unique constraint violation)
      const profilePayload = {
        full_name: fullName,
        monthly_income: monthlyIncome,
        savings_goal_percent: savingsGoal,
        employment_status: employmentStatus,
        expense_breakdown: expenseBreakdown, // JSONB
        financial_goals: activeGoals,
        risk_tolerance: riskTolerance
      };

      const { data: updated, error: updateErr } = await supabase
        .from('user_profiles')
        .update(profilePayload)
        .eq('user_id', user.id)
        .select();

      if (updateErr) throw updateErr;

      if (!updated || updated.length === 0) {
        const { error: insertErr } = await supabase
          .from('user_profiles')
          .insert({ user_id: user.id, ...profilePayload });
        if (insertErr && !String(insertErr.message).toLowerCase().includes('duplicate key')) {
          throw insertErr;
        }
      }

      

      toast({
        title: "Setup complete!",
        description: "Your profile has been successfully updated.",
      });
      
      // Create default budget categories based on expense breakdown
      const categoryColors = {
        housing: "bg-blue-600",
        transportation: "bg-yellow-600",
        food: "bg-green-600",
        utilities: "bg-red-600",
        entertainment: "bg-purple-600",
        other: "bg-gray-600"
      };
      
      const categoryIcons = {
        housing: "home",
        transportation: "car",
        food: "utensils",
        utilities: "zap",
        entertainment: "film",
        other: "package"
      };
      
      const defaultCategories = Object.entries(expenseBreakdown).map(([category, percentage]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        monthly_limit: monthlyIncome * (percentage / 100),
        color: categoryColors[category as keyof typeof categoryColors],
        icon: categoryIcons[category as keyof typeof categoryIcons],
        user_id: user.id
      }));
      
      await supabase.from('budget_categories').upsert(defaultCategories);
      
      // Create financial goals based on user selections
      if (activeGoals.length > 0) {
        const goalDefaults = {
          emergency_fund: { target: monthlyIncome * 6, name: "Emergency Fund", category: "Savings" },
          retirement: { target: monthlyIncome * 12 * 10, name: "Retirement Fund", category: "Investment" },
          home_purchase: { target: monthlyIncome * 12 * 2, name: "Home Down Payment", category: "Savings" },
          debt_payoff: { target: monthlyIncome * 6, name: "Debt Payoff", category: "Debt" },
          vacation: { target: monthlyIncome * 3, name: "Vacation Fund", category: "Travel" }
        };
        
        const goalEntries = activeGoals.map(goal => ({
          user_id: user.id,
          title: goalDefaults[goal as keyof typeof goalDefaults].name,
          description: `Goal for ${goalDefaults[goal as keyof typeof goalDefaults].name}`,
          target_amount: goalDefaults[goal as keyof typeof goalDefaults].target,
          current_amount: 0,
          target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString().split('T')[0],
          category: goalDefaults[goal as keyof typeof goalDefaults].category,
          priority: 1
        }));
        
        await supabase.from('financial_goals').upsert(goalEntries);
      }
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
      console.error("Profile update error:", error);
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
