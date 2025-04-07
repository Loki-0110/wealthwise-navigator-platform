
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Share2, 
  Mail,
  Printer,
  PieChart,
  BarChart
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast } from "sonner";

// Mock data for reports
const monthlyOverviewData = [
  { month: 'Jan', income: 5200, expenses: 4100, savings: 1100 },
  { month: 'Feb', income: 5200, expenses: 3900, savings: 1300 },
  { month: 'Mar', income: 5500, expenses: 4200, savings: 1300 },
  { month: 'Apr', income: 5300, expenses: 4400, savings: 900 },
  { month: 'May', income: 5300, expenses: 4000, savings: 1300 },
  { month: 'Jun', income: 5800, expenses: 4200, savings: 1600 }
];

const expenseCategoriesData = [
  { name: 'Housing', value: 1850 },
  { name: 'Food', value: 750 },
  { name: 'Transportation', value: 450 },
  { name: 'Utilities', value: 320 },
  { name: 'Entertainment', value: 280 },
  { name: 'Healthcare', value: 220 },
  { name: 'Other', value: 330 }
];

// Mock reports list
const savedReports = [
  {
    id: "report-1",
    title: "Q1 Financial Summary",
    description: "January to March income, expenses and savings",
    date: "2025-04-01",
    type: "quarterly",
    format: "pdf"
  },
  {
    id: "report-2",
    title: "Monthly Budget Review",
    description: "Detailed budget vs. actual spending for March",
    date: "2025-04-01",
    type: "monthly",
    format: "excel"
  },
  {
    id: "report-3",
    title: "Investment Performance",
    description: "Portfolio growth and dividend analysis",
    date: "2025-03-15",
    type: "investment",
    format: "pdf"
  },
  {
    id: "report-4",
    title: "Annual Tax Summary",
    description: "Income and deductible expenses for 2024",
    date: "2025-01-10",
    type: "tax",
    format: "pdf"
  }
];

export default function Reports() {
  const [reportPeriod, setReportPeriod] = useState("last-6-months");
  const [reportType, setReportType] = useState("all");
  
  const filteredReports = reportType === "all" 
    ? savedReports 
    : savedReports.filter(report => report.type === reportType);

  const handleDownload = (reportId: string) => {
    toast.success(`Report downloaded successfully`);
  };

  const handleShare = (reportId: string) => {
    toast.info(`Share functionality coming soon`);
  };

  const handleEmail = (reportId: string) => {
    toast.success(`Report sent to your email`);
  };

  const handleCreateReport = () => {
    toast.info("Create report functionality coming soon!");
  };

  const getFormatBadge = (format: string) => {
    switch(format) {
      case 'pdf':
        return <Badge variant="destructive">PDF</Badge>;
      case 'excel':
        return <Badge variant="secondary" className="bg-green-600">Excel</Badge>;
      default:
        return <Badge variant="outline">{format.toUpperCase()}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
          <Button onClick={handleCreateReport} className="flex items-center gap-1">
            <FileText size={16} />
            <span>Create New Report</span>
          </Button>
        </div>

        <Card className="border-t-4 border-t-finance-blue">
          <CardHeader>
            <CardTitle>Current Period Report</CardTitle>
            <CardDescription>Key financial metrics for your selected time period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-40">
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Current Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                      <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      <SelectItem value="year-to-date">Year to Date</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Custom Range</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={16} />
                  <span>Download PDF</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer size={16} />
                  <span>Print</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Mail size={16} />
                  <span>Email</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-finance-blue">$32,300.00</div>
                  <div className="flex items-center mt-1 text-sm text-green-600">
                    <span className="font-medium">+5.2%</span>
                    <span className="text-muted-foreground ml-2">from previous period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">$24,800.00</div>
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <span className="font-medium">+3.8%</span>
                    <span className="text-muted-foreground ml-2">from previous period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Net Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">$7,500.00</div>
                  <div className="flex items-center mt-1 text-sm text-green-600">
                    <span className="font-medium">+10.5%</span>
                    <span className="text-muted-foreground ml-2">from previous period</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-finance-blue" />
                      <span>Monthly Overview</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart
                        data={monthlyOverviewData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" stackId="a" fill="#2563eb" name="Income" />
                        <Bar dataKey="expenses" stackId="a" fill="#ef4444" name="Expenses" />
                        <Bar dataKey="savings" stackId="a" fill="#10b981" name="Savings" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-finance-yellow" />
                      <span>Expense Categories</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart
                        layout="vertical"
                        data={expenseCategoriesData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 60,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                        <Bar dataKey="value" fill="#eab308" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Saved Reports</h2>
            <div className="flex items-center gap-2">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="tax">Tax</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-finance-blue" />
                          <span>{report.title}</span>
                        </CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </div>
                      {getFormatBadge(report.format)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Created on {new Date(report.date).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(report.id)}
                        className="flex items-center gap-1"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEmail(report.id)}
                        className="flex items-center gap-1"
                      >
                        <Mail size={16} />
                        <span>Email</span>
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleShare(report.id)}
                      className="flex items-center gap-1"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center p-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">No reports found</h3>
                <p className="text-muted-foreground">
                  There are no saved reports matching your filter criteria.
                </p>
                <Button className="mt-4" onClick={() => setReportType("all")}>View All Reports</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
