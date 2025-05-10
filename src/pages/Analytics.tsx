
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpensePredictor } from "@/components/analytics/ExpensePredictor";

// Mock data for the charts
const monthlyData = [
  { name: 'Jan', income: 4000, expenses: 2400, savings: 1600 },
  { name: 'Feb', income: 3500, expenses: 2100, savings: 1400 },
  { name: 'Mar', income: 4500, expenses: 2800, savings: 1700 },
  { name: 'Apr', income: 3800, expenses: 2600, savings: 1200 },
  { name: 'May', income: 4200, expenses: 2900, savings: 1300 },
  { name: 'Jun', income: 4800, expenses: 3200, savings: 1600 },
];

const categoryData = [
  { name: 'Housing', amount: 1200 },
  { name: 'Food', amount: 600 },
  { name: 'Transportation', amount: 400 },
  { name: 'Health', amount: 300 },
  { name: 'Entertainment', amount: 200 },
  { name: 'Other', amount: 200 },
];

const predictiveData = [
  { name: 'Jul', projected: 4700, best: 5100, worst: 4300 },
  { name: 'Aug', projected: 4800, best: 5200, worst: 4400 },
  { name: 'Sep', projected: 5000, best: 5500, worst: 4600 },
  { name: 'Oct', projected: 5100, best: 5700, worst: 4800 },
  { name: 'Nov', projected: 5300, best: 6000, worst: 4900 },
  { name: 'Dec', projected: 5500, best: 6300, worst: 5100 },
];

const insightsList = [
  "Your spending in the Entertainment category has decreased by 15% compared to last month",
  "You've maintained a consistent savings rate of 25-30% over the past 6 months",
  "Based on your current savings rate, you'll reach your emergency fund goal by October",
  "You could save an additional $175 monthly by refinancing your current loans"
];

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">AI Financial Analytics</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-finance-blue" />
                  Income vs Expenses Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="income" stroke="#0284c7" fillOpacity={1} fill="url(#colorIncome)" />
                    <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-finance-yellow" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insightsList.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-finance-blue-light flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-finance-blue-dark">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm">{insight}</p>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" className="mt-4 text-finance-blue flex items-center gap-1 mx-auto">
                Get Personalized Analysis <ArrowRight size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Add the ML-based ExpensePredictor component */}
        <ExpensePredictor />

        <Card>
          <CardHeader>
            <CardTitle>Financial Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly">
              <TabsList className="mb-4">
                <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
                <TabsTrigger value="category">Category Analysis</TabsTrigger>
                <TabsTrigger value="predictive">Predictive Model</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#0284c7" name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    <Bar dataKey="savings" fill="#10b981" name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="category" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#eab308" name="Amount ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="predictive" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="projected" stroke="#3b82f6" activeDot={{ r: 8 }} name="Projected" />
                    <Line type="monotone" dataKey="best" stroke="#10b981" name="Best Case" />
                    <Line type="monotone" dataKey="worst" stroke="#f59e0b" name="Worst Case" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
