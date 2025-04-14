
import { Navigate } from "react-router-dom";

// Redirect from old Index page to new Dashboard
const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
