
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { BudgetOverview } from "@/components/budget/BudgetOverview";
import { BudgetCategories } from "@/components/budget/BudgetCategories";
import { MonthlyBudgetChart } from "@/components/budget/MonthlyBudgetChart";
import { BudgetAlerts } from "@/components/budget/BudgetAlerts";
import { BudgetGoals } from "@/components/budget/BudgetGoals";
import { BudgetActions } from "@/components/budget/BudgetActions";
import { BudgetRecommender } from "@/components/budget/BudgetRecommender";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { useProfile } from "@/hooks/useSupabaseData";

const Budget = () => {
  const { profile } = useProfile();
  
  const getPersonalizedGreeting = () => {
    if (!profile?.full_name) return "Budget Management";
    
    return `${profile.full_name}'s Budget`;
  };
  
  return (
    <Layout>
      <BudgetProvider>
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold tracking-tight">{getPersonalizedGreeting()}</h1>
            {profile?.monthly_income && (
              <div className="text-sm text-gray-600">
                Income: ${profile.monthly_income} | Target Savings: {profile.savings_goal_percent || 15}%
              </div>
            )}
          </div>
          
          <BudgetActions />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BudgetOverview />
            </div>
            <div>
              <BudgetAlerts />
            </div>
          </div>
          
          {/* Add the ML-based budget recommender */}
          <BudgetRecommender />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlyBudgetChart />
            <BudgetCategories />
          </div>
          
          <BudgetGoals />
        </div>
      </BudgetProvider>
    </Layout>
  );
};

export default Budget;
