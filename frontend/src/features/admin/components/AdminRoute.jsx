import React from "react";
import ProtectedRoute from "../../../shared/components/ProtectedRoute.jsx";

export default function AdminRoute({ children }) {
  return <ProtectedRoute roles={["Admin"]}>{children}</ProtectedRoute>;
}
