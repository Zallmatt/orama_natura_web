// src/services/userService.js
import api from "./api";

// Traer todos los usuarios
export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

// Traer usuario por ID
export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

// Crear un admin
export const createAdmin = async (payload) => {
  const { data } = await api.post("/users/register-admin", payload);
  return data;
};

// Crear un usuario normal
export const createUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

// Borrar usuario por ID
export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
