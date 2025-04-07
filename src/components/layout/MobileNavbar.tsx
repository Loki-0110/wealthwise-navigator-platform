
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  Home,
  PieChart,
  Settings,
  Bell,
} from "lucide-react";

export const MobileNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: PieChart, label: "Budget", href: "/budget" },
    { icon: BarChart3, label: "AI Analytics", href: "/analytics" },
    { icon: Bell, label: "Alerts", href: "/alerts" },
    { icon: CreditCard, label: "Accounts", href: "/accounts" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: BookOpen, label: "Education", href: "/education" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-finance-blue-dark text-white w-[250px] sm:w-[300px] p-0">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-medium text-lg">Menu</h2>
          </div>
          <div className="flex flex-col gap-1 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  currentPath === item.href ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
