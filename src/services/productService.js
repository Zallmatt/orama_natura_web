// src/services/productService.js
import api from "./api";

// Traer todos los productos
export const getProducts = async () => {
    const { data } = await api.get("/products");
    return data;
};

// Traer producto por ID
export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const getProductsLanzamientos = async () => {
    const { data } = await api.get("/products/launches");
    return data;
};

// Crear producto
export const createProduct = async (payload) => {
    const { data } = await api.post("/products", payload);
    return data;
};

// Actualizar producto
export const updateProduct = async (id, payload) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
};

// Borrar producto
export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};

// Traer productos inactivos
export const getInactiveProducts = async () => {
  const { data } = await api.get("/products/inactive");
  return data;
};

// Reactivar producto
export const activateProduct = async (id) => {
  const { data } = await api.put(`/products/${id}/activate`);
  return data;
};
