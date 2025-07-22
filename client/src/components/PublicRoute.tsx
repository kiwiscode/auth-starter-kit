import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
