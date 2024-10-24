import { useContext } from "react";
import { AppContext } from "../context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requireRole }) => {
  const { user, setUser } = useContext(AppContext);
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  };
