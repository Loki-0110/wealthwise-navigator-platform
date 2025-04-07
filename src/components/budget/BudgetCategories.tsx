
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  ShoppingCart, 
  Utensils, 
  Car, 
  Plane, 
  Heart 
} from "lucide-react";

export const BudgetCategories = () => {
  // Mock data - in a real app, this would come from an API
  const categories = [
    { 
      name: "Housing", 
      allocated: 1500, 
      spent: 1500, 
      percentage: 100,
      icon: Home,
      color: "bg-blue-500"
    },
    { 
      name: "Groceries", 
      allocated: 600, 
      spent: 450, 
      percentage: 75,
      icon: ShoppingCart,
      color: "bg-green-500"
    },
    { 
      name: "Dining Out", 
      allocated: 400, 
      spent: 380, 
      percentage: 95,
      icon: Utensils,
      color: "bg-yellow-500"
    },
    { 
      name: "Transportation", 
      allocated: 300, 
      spent: 220, 
      percentage: 73,
      icon: Car,
      color: "bg-purple-500"
    },
    { 
      name: "Travel", 
      allocated: 200, 
      spent: 0, 
      percentage: 0,
      icon: Plane,
      color: "bg-indigo-500"
    },
    { 
      name: "Health", 
      allocated: 150, 
      spent: 75, 
      percentage: 50,
      icon: Heart,
      color: "bg-red-500"
    },
  ];

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Budget Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-1.5 rounded-full mr-2 ${category.color}`}>
                    <category.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-sm">${category.spent} / ${category.allocated}</span>
              </div>
              <Progress value={category.percentage} className="h-1.5" />
            </div>
          ))}
          <div className="pt-2">
            <button className="text-sm text-finance-blue-dark hover:underline">
              Manage Budget Categories
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
