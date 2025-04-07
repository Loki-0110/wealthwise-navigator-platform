
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-white py-8 px-4 border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-finance-blue-dark">WealthWise</h3>
            <p className="text-finance-text-secondary mb-4">
              Personalized financial planning made simple, smart, and secure.
            </p>
            <div className="flex space-x-4">
              <Facebook className="text-finance-blue-dark hover:text-finance-blue transition-colors cursor-pointer" size={20} />
              <Twitter className="text-finance-blue-dark hover:text-finance-blue transition-colors cursor-pointer" size={20} />
              <Instagram className="text-finance-blue-dark hover:text-finance-blue transition-colors cursor-pointer" size={20} />
              <Linkedin className="text-finance-blue-dark hover:text-finance-blue transition-colors cursor-pointer" size={20} />
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-finance-text-secondary hover:text-finance-blue transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-finance-text-secondary hover:text-finance-blue transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-finance-text-secondary hover:text-finance-blue transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/education" className="text-finance-text-secondary hover:text-finance-blue transition-colors">Educational Resources</Link></li>
              <li><Link to="/blog" className="text-finance-text-secondary hover:text-finance-blue transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-finance-text-secondary hover:text-finance-blue transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-finance-text-secondary hover:text-finance-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-finance-text-secondary hover:text-finance-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="text-finance-text-secondary hover:text-finance-blue transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-center text-finance-text-secondary text-sm">
          &copy; {new Date().getFullYear()} WealthWise Financial, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
