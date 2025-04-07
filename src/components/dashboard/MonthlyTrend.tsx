
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const MonthlyTrend = () => {
  // Mock data - in a real app this would come from your API
  const data = [
    { name: "Jan", income: 4000, expenses: 2400 },
    { name: "Feb", income: 4200, expenses: 2600 },
    { name: "Mar", income: 4100, expenses: 2900 },
    { name: "Apr", income: 4500, expenses: 3100 },
    { name: "May", income: 4600, expenses: 2800 },
    { name: "Jun", income: 4800, expenses: 3300 },
  ];

  return (
    <Card className="card-hover h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Income vs. Expenses</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => `$${value}`}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #E8ECF1',
                }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#0A2463"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#D8315B"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
