
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Landmark, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
}

const StatCard = ({ title, value, icon, change }: StatCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-finance-blue-light flex items-center justify-center text-finance-blue-dark">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={cn(
              "text-xs flex items-center",
              change.trend === "up" && "text-green-600",
              change.trend === "down" && "text-red-600",
              change.trend === "neutral" && "text-gray-500"
            )}
          >
            {change.trend === "up" && <ArrowUp size={12} className="mr-1" />}
            {change.trend === "down" && <ArrowDown size={12} className="mr-1" />}
            {change.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Total Balance"
        value="$12,560.80"
        icon={<DollarSign size={16} />}
        change={{ value: "+2.5% from last month", trend: "up" }}
      />
      <StatCard
        title="Monthly Income"
        value="$5,240.00"
        icon={<Landmark size={16} />}
        change={{ value: "Same as last month", trend: "neutral" }}
      />
      <StatCard
        title="Monthly Expenses"
        value="$3,890.20"
        icon={<CreditCard size={16} />}
        change={{ value: "+5.2% from last month", trend: "down" }}
      />
      <StatCard
        title="Savings"
        value="$1,349.80"
        icon={<PiggyBank size={16} />}
        change={{ value: "-8.1% from last month", trend: "down" }}
      />
    </div>
  );
};
