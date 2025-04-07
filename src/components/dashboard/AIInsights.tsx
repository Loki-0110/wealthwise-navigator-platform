
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export const AIInsights = () => {
  // Mock data - in a real app this would come from your API
  const insights = [
    {
      id: 1,
      text: "You could save $210 monthly by refinancing your mortgage at current rates.",
    },
    {
      id: 2,
      text: "Your dining expenses increased by 34% compared to your monthly average.",
    },
    {
      id: 3,
      text: "At your current saving rate, you'll reach your vacation goal by September.",
    },
  ];

  return (
    <Card className="card-hover border-t-4 border-t-finance-yellow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-finance-yellow" />
          AI-Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight) => (
            <li key={insight.id} className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-finance-blue-light flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-finance-blue-dark">
                  {insight.id}
                </span>
              </div>
              <p className="text-sm">{insight.text}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
