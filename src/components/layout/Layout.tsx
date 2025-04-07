
import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { MobileNavbar } from "./MobileNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="md:pl-64 flex flex-col min-h-screen">
        <div className="flex items-center">
          <MobileNavbar />
          <Navbar />
        </div>
        <main className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
      <Sidebar />
    </div>
  );
};
