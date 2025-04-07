
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Bell, 
  Settings, 
  Clock,
  X,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data for alerts
const initialAlerts = [
  {
    id: "1",
    title: "Credit Card Payment Due",
    description: "Your credit card payment of $425 is due in 3 days",
    type: "warning",
    date: "2025-04-10",
    read: false,
    category: "bills"
  },
  {
    id: "2",
    title: "Unusual Activity Detected",
    description: "We noticed a transaction of $199.99 at Electronics Store that doesn't match your spending pattern",
    type: "error",
    date: "2025-04-07",
    read: false,
    category: "security"
  },
  {
    id: "3",
    title: "Budget Goal Reached",
    description: "Congratulations! You've reached your emergency fund goal of $10,000",
    type: "success",
    date: "2025-04-05",
    read: true,
    category: "goals"
  },
  {
    id: "4",
    title: "Monthly Budget Update",
    description: "You've spent 85% of your dining out budget this month",
    type: "info",
    date: "2025-04-02",
    read: true,
    category: "budget"
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState("all");
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
    sms: false,
    billReminders: true,
    budgetAlerts: true,
    securityAlerts: true,
    goalUpdates: true
  });

  const filteredAlerts = activeTab === "all" 
    ? alerts 
    : activeTab === "unread" 
      ? alerts.filter(alert => !alert.read) 
      : alerts.filter(alert => alert.category === activeTab);

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? {...alert, read: true} : alert
    ));
    toast.success("Alert marked as read");
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success("Alert dismissed");
  };

  const handleToggleChange = (key: string) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key as keyof typeof notificationPreferences]
    });
    toast.success(`Notification preference updated`);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Notification Center</h1>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All
                {alerts.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">{alerts.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {alerts.filter(a => !a.read).length > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {alerts.filter(a => !a.read).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="bills">Bills</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <Card className="border-t-4 border-t-finance-blue">
              <CardContent className="p-0">
                {filteredAlerts.length > 0 ? (
                  <ul className="divide-y">
                    {filteredAlerts.map((alert) => {
                      const iconMap = {
                        warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
                        error: <AlertTriangle className="h-5 w-5 text-red-500" />,
                        success: <CheckCircle className="h-5 w-5 text-green-500" />,
                        info: <Info className="h-5 w-5 text-blue-500" />
                      };
                      
                      return (
                        <li key={alert.id} className={cn(
                          "p-4 flex items-start gap-3 group relative",
                          !alert.read && "bg-blue-50"
                        )}>
                          <div className="flex-shrink-0 mt-1">
                            {iconMap[alert.type as keyof typeof iconMap]}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className={cn(
                                "font-medium",
                                !alert.read && "font-semibold"
                              )}>
                                {alert.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock size={12} />
                                <span>{alert.date}</span>
                              </div>
                            </div>
                            <p className="text-sm mt-1">{alert.description}</p>
                            <div className="flex gap-2 mt-2">
                              {!alert.read && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => markAsRead(alert.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground"
                                onClick={() => dismissAlert(alert.id)}
                              >
                                Dismiss
                              </Button>
                            </div>
                          </div>
                          <button 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => dismissAlert(alert.id)}
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-medium">All caught up!</h3>
                    <p className="text-muted-foreground">No alerts to show in this category.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-finance-blue" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Delivery Methods</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'email', label: 'Email Notifications' },
                      { id: 'push', label: 'Push Notifications' },
                      { id: 'sms', label: 'SMS Alerts' }
                    ].map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <label htmlFor={item.id} className="text-sm">{item.label}</label>
                        <Switch 
                          id={item.id} 
                          checked={notificationPreferences[item.id as keyof typeof notificationPreferences]} 
                          onCheckedChange={() => handleToggleChange(item.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Alert Categories</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'billReminders', label: 'Bill Payment Reminders' },
                      { id: 'budgetAlerts', label: 'Budget Alerts' },
                      { id: 'securityAlerts', label: 'Security & Fraud Alerts' },
                      { id: 'goalUpdates', label: 'Financial Goal Updates' }
                    ].map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <label htmlFor={item.id} className="text-sm">{item.label}</label>
                        <Switch 
                          id={item.id} 
                          checked={notificationPreferences[item.id as keyof typeof notificationPreferences]} 
                          onCheckedChange={() => handleToggleChange(item.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-finance-yellow" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Credit Card Payment", date: "April 10, 2025", amount: "$425.00" },
                  { title: "Rent Due", date: "May 1, 2025", amount: "$1,850.00" },
                  { title: "Car Insurance", date: "May 15, 2025", amount: "$120.50" },
                ].map((reminder, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground">{reminder.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-finance-blue">{reminder.amount}</p>
                      <Button variant="ghost" size="sm" className="text-xs">Set Reminder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
