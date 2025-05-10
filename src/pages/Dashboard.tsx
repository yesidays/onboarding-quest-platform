
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";
import HRDashboard from "./HRDashboard";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "employee":
      return <EmployeeDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "hr":
      return <HRDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}
