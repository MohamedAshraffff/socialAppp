import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, redirectTo = "/" }) {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) return children;
  return <Navigate to={redirectTo} replace />;
}
