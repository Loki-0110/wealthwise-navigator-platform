
import { Layout } from "@/components/layout/Layout";
import { BudgetOverview } from "@/components/budget/BudgetOverview";
import { BudgetCategories } from "@/components/budget/BudgetCategories";
import { MonthlyBudgetChart } from "@/components/budget/MonthlyBudgetChart";
import { BudgetAlerts } from "@/components/budget/BudgetAlerts";
import { BudgetGoals } from "@/components/budget/BudgetGoals";
import { BudgetActions } from "@/components/budget/BudgetActions";

const Budget = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">Budget Management</h1>
        
        <BudgetActions />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BudgetOverview />
          </div>
          <div>
            <BudgetAlerts />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyBudgetChart />
          <BudgetCategories />
        </div>
        
        <BudgetGoals />
      </div>
    </Layout>
  );
};

export default Budget;
