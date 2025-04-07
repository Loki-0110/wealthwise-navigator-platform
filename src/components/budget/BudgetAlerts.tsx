
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const BudgetAlerts = () => {
  // Mock data - in a real app, this would come from an API
  const alerts = [
    {
      id: 1,
      message: "Dining Out category is at 95% of budget",
      severity: "warning"
    },
    {
      id: 2,
      message: "Housing expenses paid for this month",
      severity: "info"
    },
    {
      id: 3,
      message: "You've saved $350 in Transportation this month",
      severity: "success"
    },
    {
      id: 4,
      message: "Subscription renewal coming up in 3 days",
      severity: "info"
    }
  ];

  const getSeverityStyles = (severity: string) => {
    switch(severity) {
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "success":
        return "bg-green-100 text-green-800 border-green-300";
      case "error":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "success":
        return <AlertTriangle className="h-4 w-4" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Budget Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "p-3 border rounded-md flex items-start gap-2",
                getSeverityStyles(alert.severity)
              )}
            >
              {getSeverityIcon(alert.severity)}
              <span className="text-sm">{alert.message}</span>
            </div>
          ))}
          <button className="flex items-center text-sm mt-2 text-finance-blue-dark hover:underline">
            <span>View all alerts</span>
            <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
