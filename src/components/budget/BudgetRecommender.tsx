
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, BadgePercent } from "lucide-react";
import { toast } from "sonner";

// Categories with recommended budget allocations based on income
const budgetRecommendations = {
  conservative: {
    housing: 30,
    food: 15,
    transportation: 10,
    utilities: 10,
    healthcare: 10,
    savings: 15,
    personal: 5,
    entertainment: 5
  },
  moderate: {
    housing: 35,
    food: 15,
    transportation: 15,
    utilities: 10,
    healthcare: 5,
    savings: 10,
    personal: 5,
    entertainment: 5
  },
  aggressive: {
    housing: 40,
    food: 20,
    transportation: 15,
    utilities: 10,
    healthcare: 5,
    savings: 5,
    personal: 2,
    entertainment: 3
  }
};

// ML algorithm to determine which budget model fits user's spending patterns
const determineBudgetModel = (income: number, currentSpending: Record<string, number>) => {
  // Calculate total spending
  const totalSpending = Object.values(currentSpending).reduce((sum, val) => sum + val, 0);
  
  // Calculate savings rate
  const savingsRate = (income - totalSpending) / income * 100;
  
  // Housing percentage of income
  const housingPercentage = (currentSpending.housing / income) * 100;
  
  // Determine the model based on financial metrics
  if (savingsRate >= 15 && housingPercentage <= 30) {
    return "conservative";
  } else if (savingsRate >= 5 && housingPercentage <= 35) {
    return "moderate";
  } else {
    return "aggressive";
  }
};

// Sample user financial data (in a real app, this would come from the user's actual data)
const userData = {
  monthlyIncome: 5000,
  currentSpending: {
    housing: 1750,
    food: 800,
    transportation: 600,
    utilities: 400,
    healthcare: 300,
    savings: 650,
    personal: 300,
    entertainment: 200
  }
};

export const BudgetRecommender = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Record<string, number> | null>(null);
  const [savingsOpportunity, setSavingsOpportunity] = useState(0);
  
  const generateRecommendations = () => {
    setIsAnalyzing(true);
    
    // Simulate ML processing delay
    setTimeout(() => {
      try {
        // Determine which budget model fits the user
        const recommendedModel = determineBudgetModel(
          userData.monthlyIncome,
          userData.currentSpending
        );
        
        // Get the percentage allocations from the model
        const percentages = budgetRecommendations[recommendedModel as keyof typeof budgetRecommendations];
        
        // Convert percentages to dollar amounts
        const dollarRecommendations: Record<string, number> = {};
        let totalRecommended = 0;
        
        for (const category in percentages) {
          const amount = Math.round(userData.monthlyIncome * (percentages[category as keyof typeof percentages] / 100));
          dollarRecommendations[category] = amount;
          totalRecommended += amount;
        }
        
        // Calculate potential savings opportunity
        const currentTotal = Object.values(userData.currentSpending).reduce((sum, val) => sum + val, 0);
        const savingsOpp = currentTotal - totalRecommended;
        
        setRecommendations(dollarRecommendations);
        setSavingsOpportunity(Math.max(0, savingsOpp));
        
        toast.success("Budget recommendations generated successfully!");
        setIsAnalyzing(false);
      } catch (error) {
        console.error("Error generating recommendations:", error);
        toast.error("Failed to generate recommendations. Please try again.");
        setIsAnalyzing(false);
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Budget Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Our intelligent algorithm analyzes your spending patterns and income to recommend an optimal budget allocation.
        </p>
        
        {!recommendations ? (
          <Button
            onClick={generateRecommendations}
            disabled={isAnalyzing}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {isAnalyzing ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Analyzing your finances...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <span>Generate Smart Budget Plan</span>
              </div>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(recommendations).map(([category, amount]) => (
                <div key={category} className="p-2 bg-yellow-50 rounded-md">
                  <div className="text-xs font-medium text-gray-500 capitalize">{category}</div>
                  <div className="font-semibold text-yellow-700">${amount}</div>
                </div>
              ))}
            </div>
            
            {savingsOpportunity > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-start gap-2">
                <BadgePercent className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Savings Opportunity: ${savingsOpportunity}
                  </p>
                  <p className="text-xs text-gray-600">
                    Follow this budget plan to potentially save ${savingsOpportunity} more each month!
                  </p>
                </div>
              </div>
            )}
            
            <Button
              onClick={() => {
                toast.success("Budget recommendations applied! Your budget has been updated.");
              }}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Apply Recommendations</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
