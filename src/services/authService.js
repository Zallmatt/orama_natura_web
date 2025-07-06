// src/services/authService.js
import api from "./api";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const registerAdmin = async (payload) => {
  const { data } = await api.post("/users/register-admin", payload);
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
