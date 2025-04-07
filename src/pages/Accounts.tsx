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
  CreditCard, 
  Building, 
  PiggyBank, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  EyeOff, 
  Eye,
  Lock,
  LineChart as LineChartIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const bankAccounts = [
  {
    id: "bank-1",
    name: "Main Checking",
    institution: "WealthWise Bank",
    balance: 12450.76,
    type: "checking",
    number: "****4567",
    trend: [
      { date: "Mar 01", balance: 11200 },
      { date: "Mar 08", balance: 12100 },
      { date: "Mar 15", balance: 11800 },
      { date: "Mar 22", balance: 12300 },
      { date: "Mar 29", balance: 12450 },
    ]
  },
  {
    id: "bank-2",
    name: "Savings Account",
    institution: "WealthWise Bank",
    balance: 25780.33,
    type: "savings",
    number: "****2390",
    trend: [
      { date: "Mar 01", balance: 23500 },
      { date: "Mar 08", balance: 24000 },
      { date: "Mar 15", balance: 24500 },
      { date: "Mar 22", balance: 25200 },
      { date: "Mar 29", balance: 25780 },
    ]
  },
];

const creditCards = [
  {
    id: "cc-1",
    name: "Blue Cash Preferred",
    institution: "American Express",
    balance: 1750.25,
    limit: 10000,
    dueDate: "2025-04-15",
    minPayment: 35,
    number: "****1234",
    rewards: 125
  },
  {
    id: "cc-2",
    name: "Freedom Unlimited",
    institution: "Chase Bank",
    balance: 450.80,
    limit: 8000,
    dueDate: "2025-04-20",
    minPayment: 25,
    number: "****5678",
    rewards: 87
  }
];

const investments = [
  {
    id: "inv-1",
    name: "401(k) Retirement",
    institution: "Fidelity",
    balance: 145780.50,
    changePercent: 2.3,
    allocation: {
      stocks: 70,
      bonds: 25,
      cash: 5
    }
  },
  {
    id: "inv-2",
    name: "Brokerage Account",
    institution: "Vanguard",
    balance: 32450.75,
    changePercent: -0.8,
    allocation: {
      stocks: 85,
      bonds: 10,
      cash: 5
    }
  }
];

export default function Accounts() {
  const [hideBalances, setHideBalances] = useState(false);
  const [activeTab, setActiveTab] = useState("bank-accounts");
  
  const totalBalance = [...bankAccounts, ...investments].reduce(
    (total, account) => total + account.balance, 0
  );
  
  const totalDebt = creditCards.reduce(
    (total, card) => total + card.balance, 0
  );
  
  const netWorth = totalBalance - totalDebt;

  const handleAddAccount = () => {
    toast.info("Add account functionality coming soon!");
  };

  const handleLinkAccount = () => {
    toast.info("Account linking functionality coming soon!");
  };

  const handleRefresh = () => {
    toast.success("Accounts refreshed successfully!");
  };

  const toggleHideBalances = () => {
    setHideBalances(!hideBalances);
    toast(hideBalances ? "Balances visible" : "Balances hidden");
  };

  const formatCurrency = (amount: number) => {
    return hideBalances 
      ? "****" 
      : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleHideBalances}
              className="flex items-center gap-1"
            >
              {hideBalances ? <Eye size={16} /> : <EyeOff size={16} />}
              <span className="hidden sm:inline">{hideBalances ? "Show" : "Hide"} Balances</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-1"
            >
              <LineChartIcon size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button onClick={handleAddAccount} className="flex items-center gap-1">
              <Plus size={16} />
              <span>Add Account</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-finance-blue">{formatCurrency(netWorth)}</div>
              <div className="text-sm text-muted-foreground mt-1">Total across all accounts</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{formatCurrency(totalBalance)}</div>
              <div className="text-sm text-muted-foreground mt-1">Bank accounts & investments</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Liabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{formatCurrency(totalDebt)}</div>
              <div className="text-sm text-muted-foreground mt-1">Credit cards & loans</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="bank-accounts" className="flex gap-2">
              <Building size={16} />
              <span>Bank Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="credit-cards" className="flex gap-2">
              <CreditCard size={16} />
              <span>Credit Cards</span>
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex gap-2">
              <LineChartIcon size={16} />
              <span>Investments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bank-accounts" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bankAccounts.map(account => (
                <Card key={account.id} className="border-l-4 border-l-finance-blue-dark">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{account.name}</CardTitle>
                        <CardDescription>{account.institution} • {account.number}</CardDescription>
                      </div>
                      <Badge variant={account.type === "checking" ? "outline" : "secondary"}>
                        {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-baseline mb-4">
                      <div className="text-3xl font-bold">
                        {formatCurrency(account.balance)}
                      </div>
                      <div className="text-green-600 text-sm flex items-center">
                        <ArrowUp size={16} className="mr-1" />
                        2.5% this month
                      </div>
                    </div>
                    <div className="h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={account.trend}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" tick={{fontSize: 12}} />
                          <YAxis 
                            domain={['dataMin - 500', 'dataMax + 500']} 
                            tick={{fontSize: 12}}
                            width={50}
                            tickFormatter={(value) => `$${value/1000}k`}
                          />
                          <Tooltip formatter={(value) => [`$${value}`, 'Balance']} />
                          <Line 
                            type="monotone" 
                            dataKey="balance" 
                            stroke="#2563eb" 
                            strokeWidth={2} 
                            dot={false} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button variant="outline" size="sm">View Transactions</Button>
                    <Button variant="ghost" size="sm">Export</Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 mb-4"
                  onClick={handleLinkAccount}
                >
                  <Plus size={48} className="text-muted-foreground" />
                </Button>
                <h3 className="font-medium text-lg mb-1">Link a bank account</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Connect your external bank accounts to track your finances in one place
                </p>
                <Button onClick={handleLinkAccount}>Connect Account</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="credit-cards" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {creditCards.map(card => (
                <Card key={card.id} className="border-l-4 border-l-amber-500">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{card.name}</CardTitle>
                        <CardDescription>{card.institution} • {card.number}</CardDescription>
                      </div>
                      <CreditCard className="h-6 w-6 text-amber-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Balance</p>
                          <p className="text-2xl font-bold">{formatCurrency(card.balance)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Credit Limit</p>
                          <p className="text-xl">{formatCurrency(card.limit)}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Credit Utilization</span>
                          <span>{Math.round((card.balance / card.limit) * 100)}%</span>
                        </div>
                        <Progress value={(card.balance / card.limit) * 100} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Due Date</p>
                          <p className="font-medium">{new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Min Payment</p>
                          <p className="font-medium">{formatCurrency(card.minPayment)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Rewards Balance</p>
                        <div className="flex items-center gap-2">
                          <PiggyBank className="h-5 w-5 text-amber-500" />
                          <p className="font-medium">{card.rewards} points (≈ {formatCurrency(card.rewards * 0.01)})</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button className="bg-amber-500 hover:bg-amber-600">Pay Balance</Button>
                    <Button variant="outline">View Statement</Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 mb-4"
                  onClick={handleAddAccount}
                >
                  <Plus size={48} className="text-muted-foreground" />
                </Button>
                <h3 className="font-medium text-lg mb-1">Add a credit card</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Link your credit cards to track balances, payments and rewards in one place
                </p>
                <Button onClick={handleAddAccount}>Add Card</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="investments" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {investments.map(investment => (
                <Card key={investment.id} className="border-l-4 border-l-green-600">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{investment.name}</CardTitle>
                        <CardDescription>{investment.institution}</CardDescription>
                      </div>
                      <Badge variant="outline" className={cn(
                        investment.changePercent >= 0 ? "border-green-500 text-green-600" : "border-red-500 text-red-600"
                      )}>
                        <span className="flex items-center">
                          {investment.changePercent >= 0 ? (
                            <ArrowUp size={14} className="mr-1" />
                          ) : (
                            <ArrowDown size={14} className="mr-1" />
                          )}
                          {Math.abs(investment.changePercent)}% YTD
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="text-3xl font-bold">{formatCurrency(investment.balance)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Asset Allocation</p>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Stocks</span>
                              <span>{investment.allocation.stocks}%</span>
                            </div>
                            <Progress value={investment.allocation.stocks} className="h-2 bg-slate-200" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Bonds</span>
                              <span>{investment.allocation.bonds}%</span>
                            </div>
                            <Progress value={investment.allocation.bonds} className="h-2 bg-slate-200" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Cash</span>
                              <span>{investment.allocation.cash}%</span>
                            </div>
                            <Progress value={investment.allocation.cash} className="h-2 bg-slate-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Lock size={16} />
                      <span>View on {investment.institution}</span>
                    </Button>
                    <Button variant="ghost">Performance</Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 mb-4"
                  onClick={handleAddAccount}
                >
                  <Plus size={48} className="text-muted-foreground" />
                </Button>
                <h3 className="font-medium text-lg mb-1">Add an investment account</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Connect your investment accounts to monitor performance and allocations
                </p>
                <Button onClick={handleAddAccount}>Connect Account</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
