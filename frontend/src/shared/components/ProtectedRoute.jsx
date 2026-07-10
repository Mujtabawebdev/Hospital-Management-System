import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../context/AppContext.jsx";

export default function ProtectedRoute({ children, roles = [] }) {
  const { isAuthenticated, isAuthLoading, user } = useContext(Context);
  const location = useLocation();

  if (isAuthLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

  if (roles.length && !roles.includes(user?.role)) {
    const dashboard = user?.role === "Admin" ? "/admin" : user?.role === "Doctor" ? "/doctor/dashboard" : "/";
    return <Navigate to={dashboard} replace />;
  }

  return children;
}
