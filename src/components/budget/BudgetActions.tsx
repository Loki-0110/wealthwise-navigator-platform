
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Upload, Download, Settings } from "lucide-react";
import { useBudget } from "@/contexts/BudgetContext";
import { NewBudgetEntryDialog } from "./NewBudgetEntryDialog";
import { toast } from "sonner";

export const BudgetActions = () => {
  const { importBudget, exportBudget } = useBudget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      try {
        await importBudget(files[0]);
        toast.success("Budget data imported successfully");
      } catch (error) {
        toast.error("Failed to import budget data");
        console.error(error);
      }
      
      // Reset file input
      e.target.value = '';
    }
  };
  
  const handleExport = () => {
    exportBudget();
    toast.success("Budget data exported successfully");
  };
  
  const handleBudgetSettings = () => {
    toast.info("Budget settings feature coming soon");
  };
  
  return (
    <>
      <Card className="bg-white shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Button 
                className="bg-finance-blue-dark hover:bg-finance-blue flex gap-1"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span>New Budget Entry</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex gap-1"
                onClick={handleImportClick}
              >
                <Upload className="h-4 w-4" />
                <span>Import</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Button>
              <Button 
                variant="outline" 
                className="flex gap-1"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
            <Button 
              variant="ghost" 
              className="flex gap-1"
              onClick={handleBudgetSettings}
            >
              <Settings className="h-4 w-4" />
              <span>Budget Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <NewBudgetEntryDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
};
