
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddAccountForm } from "@/components/accounts/AddAccountForm";
import { useUserAccounts } from "@/hooks/useSupabaseData";
import { CreditCard, DollarSign, PlusCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const Accounts = () => {
  const { toast } = useToast();
  const { accounts, loading, error } = useUserAccounts();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    toast({
      title: "Refreshing accounts",
      description: "Your account data is being updated.",
    });
  };

  const getTotalBalance = () => {
    return accounts.reduce((sum, account) => {
      // For credit accounts, we might want to subtract since it's debt
      const value = account.is_credit ? -account.balance : account.balance;
      return sum + value;
    }, 0);
  };
  
  const totalBalance = accounts.length ? getTotalBalance() : 0;
  const accountTypeCount = accounts.reduce((acc, curr) => {
    acc[curr.account_type] = (acc[curr.account_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getAccountTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'checking':
        return <DollarSign className="h-5 w-5" />;
      case 'savings':
        return <DollarSign className="h-5 w-5" />;
      case 'credit':
        return <CreditCard className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Your Accounts</h1>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accounts.length}</div>
            </CardContent>
          </Card>
          
          {Object.entries(accountTypeCount).slice(0, 2).map(([type, count]) => (
            <Card key={type}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground capitalize">{type} Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <Card className="col-span-full h-40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-finance-blue-dark"></div>
            </Card>
          ) : accounts.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="pt-6 flex flex-col items-center justify-center gap-4">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">No accounts found</h3>
                  <p className="text-sm text-muted-foreground">Add your financial accounts to start tracking your finances</p>
                </div>
                <AddAccountForm onSuccess={() => setRefreshTrigger(prev => prev + 1)} />
              </CardContent>
            </Card>
          ) : (
            <>
              {accounts.map(account => (
                <Card key={account.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        {getAccountTypeIcon(account.account_type)}
                        <span className="ml-2">{account.name}</span>
                      </CardTitle>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
                        {account.account_type}
                      </span>
                    </div>
                    {account.institution && (
                      <p className="text-sm text-muted-foreground">{account.institution}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${account.is_credit ? 'text-red-600' : ''}`}>
                      {formatCurrency(account.balance)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last updated: {new Date(account.last_updated || account.created_at || '').toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-gray-50 pt-2 pb-2">
                    <Button variant="ghost" size="sm" className="w-full">View Transactions</Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="bg-gray-50 border-dashed">
                <CardContent className="flex items-center justify-center h-full">
                  <AddAccountForm onSuccess={() => setRefreshTrigger(prev => prev + 1)} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
