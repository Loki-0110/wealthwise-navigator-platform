
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBudget } from "@/contexts/BudgetContext";
import { toast } from "sonner";

interface NewBudgetEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewBudgetEntryDialog = ({ open, onOpenChange }: NewBudgetEntryDialogProps) => {
  const { categories, createBudgetEntry } = useBudget();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    
    const amountValue = parseFloat(amount);
    
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    createBudgetEntry(selectedCategory, amountValue);
    toast.success(`Added $${amountValue} to ${selectedCategory}`);
    
    // Reset form and close dialog
    setSelectedCategory("");
    setAmount("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Budget Entry</DialogTitle>
            <DialogDescription>
              Record a new expense in your budget.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3">
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                className="col-span-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" className="bg-finance-blue-dark hover:bg-finance-blue">
              Add Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
