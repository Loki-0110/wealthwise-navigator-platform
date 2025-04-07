
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Home, GraduationCap, Car, Umbrella } from "lucide-react";

export const BudgetGoals = () => {
  // Mock data - in a real app, this would come from an API
  const goals = [
    {
      id: 1,
      name: "Down Payment for House",
      current: 45000,
      target: 60000,
      percentage: 75,
      icon: Home,
      deadline: "Mar 2026",
      color: "bg-blue-600"
    },
    {
      id: 2,
      name: "Education Fund",
      current: 28000,
      target: 50000,
      percentage: 56,
      icon: GraduationCap,
      deadline: "Aug 2027",
      color: "bg-purple-600"
    },
    {
      id: 3,
      name: "New Car",
      current: 12000,
      target: 35000,
      percentage: 34,
      icon: Car,
      deadline: "Dec 2025",
      color: "bg-green-600"
    },
    {
      id: 4,
      name: "Emergency Fund",
      current: 15000,
      target: 25000,
      percentage: 60,
      icon: Umbrella,
      deadline: "Jun 2025",
      color: "bg-yellow-600"
    }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Financial Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-full ${goal.color}`}>
                    <goal.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-medium text-sm truncate flex-1">{goal.name}</h3>
                </div>
                <div className="space-y-2">
                  <Progress value={goal.percentage} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">${goal.current} of ${goal.target}</span>
                    <span className="font-medium text-finance-blue-dark">{goal.percentage}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Target date</span>
                    <span>{goal.deadline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button className="text-sm font-medium text-finance-blue-dark hover:underline">
            + Add New Financial Goal
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
