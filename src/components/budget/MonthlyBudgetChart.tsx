
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useBudget } from "@/contexts/BudgetContext";

export const MonthlyBudgetChart = () => {
  const { monthlyData } = useBudget();
  const [timeRange, setTimeRange] = useState("Last 6 months");
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // In a real app, we would fetch different data based on the range
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Budget vs. Spending</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              {timeRange} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleTimeRangeChange("Last 3 months")}>
              Last 3 months
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange("Last 6 months")}>
              Last 6 months
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange("Last 12 months")}>
              Last 12 months
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
