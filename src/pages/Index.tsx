
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// This is just a redirect page
const Index = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

export default Index;
