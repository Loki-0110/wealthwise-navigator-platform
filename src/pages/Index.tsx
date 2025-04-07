
import { Layout } from "@/components/layout/Layout";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { AlertsSection } from "@/components/dashboard/AlertsSection";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { MonthlyTrend } from "@/components/dashboard/MonthlyTrend";
import { AIInsights } from "@/components/dashboard/AIInsights";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeCard />
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Financial Overview</h2>
          <StatsGrid />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart />
          <MonthlyTrend />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AlertsSection />
          </div>
          <div>
            <AIInsights />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
