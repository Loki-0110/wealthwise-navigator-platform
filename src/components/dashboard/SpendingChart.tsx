
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export const SpendingChart = () => {
  // Mock data - in a real app this would come from your API
  const data = [
    { name: "Housing", value: 1200, color: "#0A2463" },
    { name: "Food", value: 800, color: "#3E92CC" },
    { name: "Transportation", value: 400, color: "#FFD700" },
    { name: "Entertainment", value: 300, color: "#D8315B" },
    { name: "Utilities", value: 250, color: "#1E847F" },
    { name: "Other", value: 350, color: "#7D7C84" },
  ];

  return (
    <Card className="card-hover h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Monthly Spending</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${value}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
