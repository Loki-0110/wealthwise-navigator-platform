
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDownIcon, ArrowUpIcon, TrendingUp } from "lucide-react";

export const BudgetOverview = () => {
  // Mock data - in a real app, this would come from an API
  const budget = {
    total: 5000,
    spent: 3200,
    remaining: 1800,
    percentSpent: 64,
    income: 6500,
    savingsRate: 20,
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex justify-between">
          <span>Monthly Budget Overview</span>
          <span className="text-finance-blue-dark">April 2025</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Budget Utilized</span>
              <span className="font-medium">${budget.spent} of ${budget.total}</span>
            </div>
            <Progress value={budget.percentSpent} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-medium">${budget.remaining} remaining</span>
              <span className="text-muted-foreground">{budget.percentSpent}% spent</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Monthly Income</span>
              <div className="flex items-center">
                <span className="text-lg font-semibold">${budget.income}</span>
                <ArrowUpIcon className="h-4 w-4 text-green-500 ml-2" />
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Savings Rate</span>
              <div className="flex items-center">
                <span className="text-lg font-semibold">{budget.savingsRate}%</span>
                <TrendingUp className="h-4 w-4 text-finance-blue-dark ml-2" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
