
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDownIcon, ArrowUpIcon, TrendingUp, PieChart } from "lucide-react";
import { useBudget } from "@/contexts/BudgetContext";
import { useProfile } from "@/hooks/useSupabaseData";

export const BudgetOverview = () => {
  const { 
    budgetTotal, 
    budgetSpent, 
    budgetRemaining, 
    percentSpent, 
    income, 
    savingsRate,
    currentMonth 
  } = useBudget();

  const { profile } = useProfile();

  // Calculate dynamic insights based on user profile
  const userSavingsGoal = profile?.savings_goal_percent || savingsRate;
  const savingsGapPercentage = userSavingsGoal - savingsRate;
  const savingsStatus = savingsGapPercentage > 0 ? 'below' : 'above';

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between">
          <span>Monthly Budget Overview</span>
          <span className="text-finance-blue-dark">{currentMonth}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Budget Utilized</span>
              <span className="font-medium">${budgetSpent} of ${budgetTotal}</span>
            </div>
            <Progress value={percentSpent} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-medium">${budgetRemaining} remaining</span>
              <span className="text-muted-foreground">{percentSpent}% spent</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Monthly Income</span>
              <div className="flex items-center">
                <span className="text-lg font-semibold">${income}</span>
                <ArrowUpIcon className="h-4 w-4 text-green-500 ml-2" />
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Savings Rate</span>
              <div className="flex items-center">
                <span className="text-lg font-semibold">{savingsRate}%</span>
                <TrendingUp className="h-4 w-4 text-finance-blue-dark ml-2" />
              </div>
              {profile && Math.abs(savingsGapPercentage) > 1 && (
                <span className={`text-xs ${savingsGapPercentage > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {Math.abs(savingsGapPercentage).toFixed(1)}% {savingsStatus} your {userSavingsGoal}% goal
                </span>
              )}
            </div>
          </div>
          
          {profile?.risk_tolerance && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Profile</span>
                <div className="flex items-center gap-1.5">
                  <PieChart className="h-3.5 w-3.5 text-finance-blue-dark" />
                  <span className="text-sm font-medium capitalize">
                    {profile.risk_tolerance}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
