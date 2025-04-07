
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const MonthlyBudgetChart = () => {
  // Mock data - in a real app, this would come from an API
  const monthlyData = [
    {
      name: "Jan",
      budget: 4800,
      spent: 4200,
    },
    {
      name: "Feb",
      budget: 4800,
      spent: 3800,
    },
    {
      name: "Mar",
      budget: 5000,
      spent: 4600,
    },
    {
      name: "Apr",
      budget: 5000,
      spent: 3200,
    },
    {
      name: "May",
      budget: 5200,
      spent: 0,
    },
    {
      name: "Jun",
      budget: 5200,
      spent: 0,
    },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Budget vs. Spending</CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          Last 6 months <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
              <Bar dataKey="spent" fill="#eab308" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
