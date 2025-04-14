
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, CreditCard, Shield, Wallet } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-finance-blue-light to-white">
      {/* Hero Section */}
      <header className="pt-8 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-finance-blue-dark flex items-center justify-center">
                <div className="text-white font-bold text-xl">W</div>
              </div>
              <span className="ml-2 font-bold text-xl text-finance-blue-dark">
                WealthWise
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button 
                className="bg-finance-blue hover:bg-finance-blue-dark text-white"
                asChild
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-finance-blue-dark leading-tight">
              Your Personal Finance Journey Starts Here
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Take control of your financial future with WealthWise. 
              Budget smarter, save more, and achieve your financial goals.
            </p>
            <div className="flex gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-finance-blue-dark hover:bg-finance-blue text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-105"
                asChild
              >
                <Link to="/signup" className="flex items-center gap-2">
                  Get Started <ArrowRight />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-finance-blue-dark text-finance-blue-dark hover:bg-finance-blue-light"
                asChild
              >
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-finance-yellow opacity-20 rounded-full"></div>
              <img 
                src="/placeholder.svg" 
                alt="Finance Dashboard" 
                className="rounded-2xl shadow-2xl border-4 border-white relative z-10"
              />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-finance-blue opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finance-blue-dark mb-4">Why Choose WealthWise?</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Our comprehensive financial tools are designed to give you clarity and confidence with your money.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Wallet size={32} />}
              title="Budget Management"
              description="Create customized budgets to track your spending and saving goals."
              color="bg-blue-100"
              iconColor="text-blue-600"
            />
            <FeatureCard 
              icon={<BarChart2 size={32} />}
              title="Financial Analytics"
              description="Visualize your financial progress with detailed charts and insights."
              color="bg-green-100"
              iconColor="text-green-600"
            />
            <FeatureCard 
              icon={<CreditCard size={32} />}
              title="Account Tracking"
              description="Connect all your financial accounts for a complete overview."
              color="bg-purple-100"
              iconColor="text-purple-600"
            />
            <FeatureCard 
              icon={<Shield size={32} />}
              title="Secure Platform"
              description="Rest easy with our bank-level security protecting your data."
              color="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-finance-blue-dark to-finance-blue rounded-3xl py-16 px-8 text-white my-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your financial future?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of users who have already taken control of their finances with WealthWise.
            </p>
            <Button 
              size="lg" 
              className="bg-finance-yellow text-finance-blue-dark hover:bg-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg"
              asChild
            >
              <Link to="/signup" className="flex items-center gap-2">
                Start Your Free Account <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-finance-gray py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-finance-blue-dark flex items-center justify-center">
                <div className="text-white font-bold text-sm">W</div>
              </div>
              <span className="ml-2 font-bold text-sm text-finance-blue-dark">
                WealthWise © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex gap-6">
              <Link to="#" className="text-gray-600 hover:text-finance-blue-dark">Terms</Link>
              <Link to="#" className="text-gray-600 hover:text-finance-blue-dark">Privacy</Link>
              <Link to="#" className="text-gray-600 hover:text-finance-blue-dark">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color, 
  iconColor 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
  iconColor: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
    <div className={`${color} ${iconColor} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-finance-blue-dark mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
