
import { Link } from "react-router-dom";
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
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "nav-link text-white",
        isActive && "nav-link-active"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  // In a real app, this would come from your current route
  const currentPath = "/";

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: PieChart, label: "Budget", href: "/budget" },
    { icon: BarChart3, label: "AI Analytics", href: "/analytics" },
    { icon: Bell, label: "Alerts", href: "/alerts" },
    { icon: CreditCard, label: "Accounts", href: "/accounts" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: BookOpen, label: "Education", href: "/education" },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-finance-blue-dark h-screen">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-white font-medium text-lg">Financial Dashboard</h2>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={currentPath === item.href}
          />
        ))}
      </div>
      <div className="p-4 border-t border-white/10">
        <SidebarItem icon={Settings} label="Settings" href="/settings" />
      </div>
    </div>
  );
};
