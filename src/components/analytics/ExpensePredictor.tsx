
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp } from "lucide-react";

// This is a simplified ML model for expense prediction
// In a real application, this would use a more sophisticated model or API
class SimpleRegressionModel {
  private weights: number[];
  private bias: number;

  constructor() {
    // Pre-trained weights based on historical financial data patterns
    this.weights = [0.7, 0.2, 0.1];
    this.bias = 100;
  }

  predict(pastExpenses: number[]): number[] {
    if (pastExpenses.length < 3) {
      throw new Error("Need at least 3 past expense data points");
    }

    const predictions: number[] = [];
    
    // Make predictions for the next 3 months
    for (let i = 0; i < 3; i++) {
      const pastThree = pastExpenses.slice(-(3 + i), pastExpenses.length + i);
      let prediction = this.bias;
      
      // Apply weights to the past 3 months
      for (let j = 0; j < 3; j++) {
        prediction += (pastThree[j] * this.weights[j]);
      }
      
      // Add some randomness to simulate market fluctuations
      prediction += (Math.random() * 100) - 50;
      predictions.push(Math.max(0, Math.round(prediction)));
      
      // Add the prediction to use for next prediction
      pastExpenses.push(prediction);
    }
    
    return predictions;
  }
}

// Past expense data (monthly totals)
const pastExpenseData = [
  { month: 'Jan', amount: 2400 },
  { month: 'Feb', amount: 2100 },
  { month: 'Mar', amount: 2800 },
  { month: 'Apr', amount: 2600 },
  { month: 'May', amount: 2900 },
  { month: 'Jun', amount: 3200 },
];

export const ExpensePredictor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<{month: string, amount: number}[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIndex = new Date().getMonth();
  
  const predictExpenses = () => {
    setIsLoading(true);
    
    // Simulate ML model processing time
    setTimeout(() => {
      try {
        const model = new SimpleRegressionModel();
        const pastAmounts = pastExpenseData.map(item => item.amount);
        const predictedAmounts = model.predict(pastAmounts);
        
        const newPredictions = predictedAmounts.map((amount, index) => {
          const monthIndex = (currentMonthIndex + 1 + index) % 12;
          return {
            month: months[monthIndex],
            amount
          };
        });
        
        setPredictions(newPredictions);
        setShowPredictions(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Prediction error:", error);
        setIsLoading(false);
      }
    }, 1500);
  };
  
  // Combine past data with predictions for display
  const chartData = showPredictions 
    ? [...pastExpenseData, ...predictions] 
    : pastExpenseData;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          AI Expense Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Our machine learning model analyzes your past spending patterns to predict future expenses.
          </p>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                name="Monthly Expenses" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              {showPredictions && (
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#82ca9d" 
                  name="Predicted Expenses"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, strokeWidth: 2 }}
                  data={predictions}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            onClick={predictExpenses}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Analyzing data...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>Predict Future Expenses</span>
              </div>
            )}
          </Button>
        </div>
        
        {showPredictions && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800 font-medium">AI Prediction:</p>
            <p className="text-sm text-gray-700">
              Based on your spending patterns, we predict your expenses will 
              {predictions[2].amount > pastExpenseData[5].amount ? " increase" : " decrease"} to approximately 
              ${predictions[2].amount} by {predictions[2].month}.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
