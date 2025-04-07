
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  ShoppingCart, 
  Utensils, 
  Car, 
  Plane, 
  Heart,
  Edit2
} from "lucide-react";
import { useBudget } from "@/contexts/BudgetContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const BudgetCategories = () => {
  const { categories, updateCategory } = useBudget();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  
  // Map category names to icons
  const categoryIcons: Record<string, React.ElementType> = {
    "Housing": Home,
    "Groceries": ShoppingCart,
    "Dining Out": Utensils,
    "Transportation": Car,
    "Travel": Plane,
    "Health": Heart,
  };
  
  const handleEditClick = (category: string, allocated: number) => {
    setSelectedCategory(category);
    setBudgetAmount(String(allocated));
    setIsEditDialogOpen(true);
  };
  
  const handleSaveCategory = () => {
    const amount = parseFloat(budgetAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    updateCategory(selectedCategory, amount);
    setIsEditDialogOpen(false);
    toast.success(`Updated budget for ${selectedCategory}`);
  };

  return (
    <>
      <Card className="shadow-md h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Budget Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const CategoryIcon = categoryIcons[category.name] || Home;
              
              return (
                <div key={category.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-full mr-2 ${category.color}`}>
                        <CategoryIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">${category.spent} / ${category.allocated}</span>
                      <button 
                        className="text-gray-500 hover:text-gray-700" 
                        onClick={() => handleEditClick(category.name, category.allocated)}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-1.5" />
                </div>
              );
            })}
            <div className="pt-2">
              <button className="text-sm text-finance-blue-dark hover:underline">
                Manage Budget Categories
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Budget for {selectedCategory}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budgetAmount" className="text-right">
                Budget Amount ($)
              </Label>
              <Input
                id="budgetAmount"
                type="number"
                min="1"
                step="1"
                className="col-span-3"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveCategory} className="bg-finance-blue-dark hover:bg-finance-blue">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
