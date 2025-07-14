import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginRequest } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // 👈 NUEVO

  const login = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      setUser(res.user);
      setToken(res.token);
      setIsAuthenticated(true);
      localStorage.setItem("orama_token", res.token);
      localStorage.setItem("orama_user", JSON.stringify(res.user));
      return { success: true, user: res.user };
    } catch (error) {
      console.error("Error de login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al iniciar sesión",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("orama_token");
    localStorage.removeItem("orama_user");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("orama_token");
    const storedUser = localStorage.getItem("orama_user");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("orama_token");
        localStorage.removeItem("orama_user");
      }
    }
    setIsLoadingAuth(false); // 👈 Importante: termina la carga
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoadingAuth, // 👈 lo exportamos
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
