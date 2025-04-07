
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Home, GraduationCap, Car, Umbrella, Plus, PlusCircle, Edit2, Calendar } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const BudgetGoals = () => {
  const { goals, updateGoal, addGoal } = useBudget();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    current: "",
    target: ""
  });
  const [newGoalForm, setNewGoalForm] = useState({
    name: "",
    current: "",
    target: "",
    deadline: "",
    icon: "Home"
  });
  
  // Map goal types to icons
  const goalIcons: Record<string, React.ElementType> = {
    "Home": Home,
    "Education": GraduationCap,
    "Car": Car,
    "Emergency": Umbrella,
  };
  
  const goalColors: Record<string, string> = {
    "Home": "bg-blue-600",
    "Education": "bg-purple-600",
    "Car": "bg-green-600",
    "Emergency": "bg-yellow-600",
  };
  
  const handleEditGoal = (goal: typeof goals[0]) => {
    setSelectedGoal(goal.id);
    setEditForm({
      current: String(goal.current),
      target: String(goal.target)
    });
    setIsEditDialogOpen(true);
  };
  
  const handleSaveGoal = () => {
    if (selectedGoal === null) return;
    
    const current = parseFloat(editForm.current);
    const target = parseFloat(editForm.target);
    
    if (isNaN(current) || isNaN(target) || current < 0 || target <= 0 || current > target) {
      toast.error("Please enter valid amounts");
      return;
    }
    
    updateGoal(selectedGoal, current, target);
    setIsEditDialogOpen(false);
    toast.success("Goal updated successfully");
  };
  
  const handleAddGoal = () => {
    const { name, icon, deadline } = newGoalForm;
    const current = parseFloat(newGoalForm.current);
    const target = parseFloat(newGoalForm.target);
    
    if (!name || !icon || !deadline) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (isNaN(current) || isNaN(target) || current < 0 || target <= 0 || current > target) {
      toast.error("Please enter valid amounts");
      return;
    }
    
    const IconComponent = goalIcons[icon] || Home;
    
    addGoal({
      name,
      current,
      target,
      deadline,
      icon: IconComponent,
      color: goalColors[icon] || "bg-blue-600"
    });
    
    setIsAddDialogOpen(false);
    setNewGoalForm({
      name: "",
      current: "",
      target: "",
      deadline: "",
      icon: "Home"
    });
    
    toast.success("New financial goal added");
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal) => {
              const GoalIcon = goalIcons[goal.name.includes("House") ? "Home" : 
                               goal.name.includes("Education") ? "Education" :
                               goal.name.includes("Car") ? "Car" : "Emergency"] || Home;
              
              return (
                <Card key={goal.id} className="shadow-sm relative group">
                  <CardContent className="p-4">
                    <button 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEditGoal(goal)}
                    >
                      <Edit2 className="h-3.5 w-3.5 text-gray-500 hover:text-gray-700" />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-full ${goal.color}`}>
                        <GoalIcon className="h-4 w-4 text-white" />
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
              );
            })}
          </div>
          <div className="mt-4 flex justify-center">
            <Button 
              variant="ghost"
              className="text-sm font-medium text-finance-blue-dark hover:bg-finance-blue-dark/10 flex items-center gap-1"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              Add New Financial Goal
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Financial Goal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current" className="text-right">
                Current Amount ($)
              </Label>
              <Input
                id="current"
                type="number"
                min="0"
                step="1"
                className="col-span-3"
                value={editForm.current}
                onChange={(e) => setEditForm({...editForm, current: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target" className="text-right">
                Target Amount ($)
              </Label>
              <Input
                id="target"
                type="number"
                min="1"
                step="1"
                className="col-span-3"
                value={editForm.target}
                onChange={(e) => setEditForm({...editForm, target: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveGoal} className="bg-finance-blue-dark hover:bg-finance-blue">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Goal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Financial Goal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goalName" className="text-right">
                Goal Name
              </Label>
              <Input
                id="goalName"
                className="col-span-3"
                value={newGoalForm.name}
                onChange={(e) => setNewGoalForm({...newGoalForm, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goalType" className="text-right">
                Goal Type
              </Label>
              <Select
                value={newGoalForm.icon}
                onValueChange={(value) => setNewGoalForm({...newGoalForm, icon: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Car">Car</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentAmount" className="text-right">
                Current Amount ($)
              </Label>
              <Input
                id="currentAmount"
                type="number"
                min="0"
                step="1"
                className="col-span-3"
                value={newGoalForm.current}
                onChange={(e) => setNewGoalForm({...newGoalForm, current: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="targetAmount" className="text-right">
                Target Amount ($)
              </Label>
              <Input
                id="targetAmount"
                type="number"
                min="1"
                step="1"
                className="col-span-3"
                value={newGoalForm.target}
                onChange={(e) => setNewGoalForm({...newGoalForm, target: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline" className="text-right">
                Target Date
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="deadline"
                  placeholder="e.g., Jun 2025"
                  value={newGoalForm.deadline}
                  onChange={(e) => setNewGoalForm({...newGoalForm, deadline: e.target.value})}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddGoal} className="bg-finance-blue-dark hover:bg-finance-blue">
              Add Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
