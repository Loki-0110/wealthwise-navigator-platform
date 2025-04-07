
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl font-bold text-finance-blue-dark mb-4">404</h1>
        <p className="text-xl text-finance-text-secondary mb-6">Oops! Page not found</p>
        <p className="text-finance-text-secondary max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="bg-finance-blue-dark hover:bg-finance-blue" asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
