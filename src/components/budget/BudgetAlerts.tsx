
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, CheckCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBudget } from "@/contexts/BudgetContext";
import { toast } from "sonner";

export const BudgetAlerts = () => {
  const { alerts, dismissAlert } = useBudget();

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
        return <CheckCircle className="h-4 w-4" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  const handleViewAllAlerts = () => {
    toast.info("View all alerts feature coming soon");
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Budget Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div 
                key={alert.id}
                className={cn(
                  "p-3 border rounded-md flex items-start gap-2 group relative",
                  getSeverityStyles(alert.severity)
                )}
              >
                {getSeverityIcon(alert.severity)}
                <span className="text-sm">{alert.message}</span>
                <button 
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => dismissAlert(alert.id)}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>No alerts to show</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
          {alerts.length > 0 && (
            <button 
              className="flex items-center text-sm mt-2 text-finance-blue-dark hover:underline"
              onClick={handleViewAllAlerts}
            >
              <span>View all alerts</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
