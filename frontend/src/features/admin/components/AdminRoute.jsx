import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../../shared/context/AppContext.jsx";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useContext(Context);
  return isAuthenticated && user?.role === "Admin" ? children : <Navigate to="/login" replace />;
}
