
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Upload, Download, Settings } from "lucide-react";

export const BudgetActions = () => {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-finance-blue-dark hover:bg-finance-blue flex gap-1">
              <Plus className="h-4 w-4" />
              <span>New Budget Entry</span>
            </Button>
            <Button variant="outline" className="flex gap-1">
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </Button>
            <Button variant="outline" className="flex gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
          <Button variant="ghost" className="flex gap-1">
            <Settings className="h-4 w-4" />
            <span>Budget Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
