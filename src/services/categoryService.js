// src/services/categoryService.js
import api from "./api";

// Traer todas las categorías
export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

// Traer categoría por ID
export const getCategoryById = async (id) => {
  const { data } = await api.get(`/categories/${id}`);
  return data;
};

// Crear categoría
export const createCategory = async (payload) => {
  const { data } = await api.post("/categories", payload);
  return data;
};

// Actualizar categoría
export const updateCategory = async (id, payload) => {
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
};

// Borrar categoría
export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
