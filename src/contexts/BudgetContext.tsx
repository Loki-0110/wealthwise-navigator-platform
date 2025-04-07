
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our budget data
export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  percentage: number;
  icon: React.ElementType;
  color: string;
}

export interface BudgetGoal {
  id: number;
  name: string;
  current: number;
  target: number;
  percentage: number;
  icon: React.ElementType;
  deadline: string;
  color: string;
}

export interface BudgetAlert {
  id: number;
  message: string;
  severity: "warning" | "info" | "success" | "error";
}

interface BudgetContextType {
  // Budget Overview Data
  budgetTotal: number;
  budgetSpent: number;
  budgetRemaining: number;
  percentSpent: number;
  income: number;
  savingsRate: number;
  
  // Budget Categories
  categories: BudgetCategory[];
  updateCategory: (name: string, allocated: number) => void;
  
  // Budget Goals
  goals: BudgetGoal[];
  updateGoal: (id: number, current: number, target: number) => void;
  addGoal: (goal: Omit<BudgetGoal, "id" | "percentage">) => void;
  
  // Budget Alerts
  alerts: BudgetAlert[];
  dismissAlert: (id: number) => void;
  
  // Budget Chart Data
  monthlyData: {
    name: string;
    budget: number;
    spent: number;
  }[];
  
  // Budget Actions
  createBudgetEntry: (categoryName: string, amount: number) => void;
  importBudget: (file: File) => Promise<void>;
  exportBudget: () => void;
  updateMonth: (month: string) => void;
  currentMonth: string;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

interface BudgetProviderProps {
  children: ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  // Budget Overview
  const [budgetTotal, setBudgetTotal] = useState(5000);
  const [budgetSpent, setBudgetSpent] = useState(3200);
  const [income, setIncome] = useState(6500);
  const [savingsRate, setSavingsRate] = useState(20);
  const [currentMonth, setCurrentMonth] = useState("April 2025");
  
  // Calculate derived values
  const budgetRemaining = budgetTotal - budgetSpent;
  const percentSpent = Math.round((budgetSpent / budgetTotal) * 100);
  
  // Budget Categories
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { 
      name: "Housing", 
      allocated: 1500, 
      spent: 1500, 
      percentage: 100,
      icon: () => null, // This will be imported in the component that uses it
      color: "bg-blue-500"
    },
    { 
      name: "Groceries", 
      allocated: 600, 
      spent: 450, 
      percentage: 75,
      icon: () => null,
      color: "bg-green-500"
    },
    { 
      name: "Dining Out", 
      allocated: 400, 
      spent: 380, 
      percentage: 95,
      icon: () => null,
      color: "bg-yellow-500"
    },
    { 
      name: "Transportation", 
      allocated: 300, 
      spent: 220, 
      percentage: 73,
      icon: () => null,
      color: "bg-purple-500"
    },
    { 
      name: "Travel", 
      allocated: 200, 
      spent: 0, 
      percentage: 0,
      icon: () => null,
      color: "bg-indigo-500"
    },
    { 
      name: "Health", 
      allocated: 150, 
      spent: 75, 
      percentage: 50,
      icon: () => null,
      color: "bg-red-500"
    },
  ]);
  
  // Budget Goals
  const [goals, setGoals] = useState<BudgetGoal[]>([
    {
      id: 1,
      name: "Down Payment for House",
      current: 45000,
      target: 60000,
      percentage: 75,
      icon: () => null,
      deadline: "Mar 2026",
      color: "bg-blue-600"
    },
    {
      id: 2,
      name: "Education Fund",
      current: 28000,
      target: 50000,
      percentage: 56,
      icon: () => null,
      deadline: "Aug 2027",
      color: "bg-purple-600"
    },
    {
      id: 3,
      name: "New Car",
      current: 12000,
      target: 35000,
      percentage: 34,
      icon: () => null,
      deadline: "Dec 2025",
      color: "bg-green-600"
    },
    {
      id: 4,
      name: "Emergency Fund",
      current: 15000,
      target: 25000,
      percentage: 60,
      icon: () => null,
      deadline: "Jun 2025",
      color: "bg-yellow-600"
    }
  ]);
  
  // Budget Alerts
  const [alerts, setAlerts] = useState<BudgetAlert[]>([
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
  ]);
  
  // Budget Chart Data
  const [monthlyData, setMonthlyData] = useState([
    {
      name: "Jan",
      budget: 4800,
      spent: 4200,
    },
    {
      name: "Feb",
      budget: 4800,
      spent: 3800,
    },
    {
      name: "Mar",
      budget: 5000,
      spent: 4600,
    },
    {
      name: "Apr",
      budget: 5000,
      spent: 3200,
    },
    {
      name: "May",
      budget: 5200,
      spent: 0,
    },
    {
      name: "Jun",
      budget: 5200,
      spent: 0,
    },
  ]);
  
  // Actions
  const updateCategory = (name: string, allocated: number) => {
    setCategories(prev => prev.map(category => {
      if (category.name === name) {
        const newPercentage = category.spent > 0 ? Math.round((category.spent / allocated) * 100) : 0;
        return { ...category, allocated, percentage: newPercentage };
      }
      return category;
    }));
    
    // Update total budget
    const newTotal = categories.reduce((sum, cat) => {
      if (cat.name === name) {
        return sum + allocated;
      }
      return sum + cat.allocated;
    }, 0);
    
    setBudgetTotal(newTotal);
  };
  
  const updateGoal = (id: number, current: number, target: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const percentage = Math.round((current / target) * 100);
        return { ...goal, current, target, percentage };
      }
      return goal;
    }));
  };
  
  const addGoal = (goal: Omit<BudgetGoal, "id" | "percentage">) => {
    const percentage = Math.round((goal.current / goal.target) * 100);
    const newId = goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1;
    
    setGoals(prev => [...prev, { ...goal, id: newId, percentage }]);
  };
  
  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };
  
  const createBudgetEntry = (categoryName: string, amount: number) => {
    setCategories(prev => prev.map(category => {
      if (category.name === categoryName) {
        const newSpent = category.spent + amount;
        const newPercentage = Math.round((newSpent / category.allocated) * 100);
        
        // Create an alert if over budget
        if (newPercentage > 90 && category.percentage <= 90) {
          const alertId = Math.max(...alerts.map(a => a.id), 0) + 1;
          setAlerts(prev => [...prev, {
            id: alertId,
            message: `${categoryName} category is at ${newPercentage}% of budget`,
            severity: "warning"
          }]);
        }
        
        return { ...category, spent: newSpent, percentage: newPercentage };
      }
      return category;
    }));
    
    // Update total spent
    setBudgetSpent(prev => prev + amount);
  };
  
  const importBudget = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (event.target && event.target.result) {
            const importedData = JSON.parse(event.target.result as string);
            
            if (importedData.categories) {
              setCategories(importedData.categories);
            }
            
            if (importedData.monthlyData) {
              setMonthlyData(importedData.monthlyData);
            }
            
            if (importedData.budgetTotal) {
              setBudgetTotal(importedData.budgetTotal);
            }
            
            if (importedData.budgetSpent) {
              setBudgetSpent(importedData.budgetSpent);
            }
            
            resolve();
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      
      reader.readAsText(file);
    });
  };
  
  const exportBudget = () => {
    const exportData = {
      budgetTotal,
      budgetSpent,
      budgetRemaining,
      percentSpent,
      income,
      savingsRate,
      categories,
      goals,
      monthlyData,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-export-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  const updateMonth = (month: string) => {
    setCurrentMonth(month);
  };
  
  const value = {
    budgetTotal,
    budgetSpent,
    budgetRemaining,
    percentSpent,
    income,
    savingsRate,
    categories,
    updateCategory,
    goals,
    updateGoal,
    addGoal,
    alerts,
    dismissAlert,
    monthlyData,
    createBudgetEntry,
    importBudget,
    exportBudget,
    updateMonth,
    currentMonth,
  };
  
  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};
