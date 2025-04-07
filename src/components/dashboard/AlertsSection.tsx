
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AlertItemProps {
  type: "warning" | "info" | "success";
  message: string;
  date: string;
}

const AlertItem = ({ type, message, date }: AlertItemProps) => {
  return (
    <div className="flex items-start p-3 border-b last:border-b-0">
      <div className="flex-shrink-0 mr-3">
        {type === "warning" && (
          <AlertCircle className="h-5 w-5 text-amber-500" />
        )}
        {type === "info" && (
          <AlertCircle className="h-5 w-5 text-blue-500" />
        )}
        {type === "success" && (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">{date}</p>
      </div>
    </div>
  );
};

export const AlertsSection = () => {
  // Mock data - in a real app this would come from your API
  const alerts = [
    {
      type: "warning" as const,
      message: "Your credit card bill is due in 3 days",
      date: "2025-04-10",
    },
    {
      type: "info" as const,
      message: "You've spent 85% of your dining budget this month",
      date: "2025-04-05",
    },
    {
      type: "success" as const,
      message: "Congratulations! You've reached your emergency fund goal",
      date: "2025-04-02",
    },
  ];

  return (
    <Card className="card-hover h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Latest Alerts</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/alerts" className="flex items-center gap-1 text-finance-blue">
            View All <ArrowRight size={16} />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {alerts.map((alert, index) => (
            <AlertItem
              key={index}
              type={alert.type}
              message={alert.message}
              date={alert.date}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
