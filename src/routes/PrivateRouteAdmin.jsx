import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRouteAdmin = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Si no está logueado, mandarlo al login
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    // Si está logueado pero no es admin, mandarlo al inicio
    return <Navigate to="/" replace />;
  }

  // Si es admin, mostrar la ruta
  return children;
};

export default PrivateRouteAdmin;
