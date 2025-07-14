import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRouteAdmin = ({ children }) => {
  const { isAuthenticated, isLoadingAuth, user } = useAuth();

  if (isLoadingAuth) {
    // Mientras está chequeando si el usuario está autenticado
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>Verificando acceso...</p>
      </div>
    );
  }

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
