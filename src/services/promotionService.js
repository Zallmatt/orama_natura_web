// src/services/promotionService.js
import api from "./api";

// Traer todas las promociones
export const getPromotions = async () => {
  const { data } = await api.get("/promotions");
  return data;
};

// Traer promoción por ID
export const getPromotionById = async (id) => {
  const { data } = await api.get(`/promotions/${id}`);
  return data;
};

// Traer promociones activas
export const getActivePromotions = async () => {
  const { data } = await api.get("/promotions/active");
  return data;
};

// Crear promoción
export const createPromotion = async (payload) => {
  const { data } = await api.post("/promotions", payload);
  return data;
};

// Actualizar promoción
export const updatePromotion = async (id, payload) => {
  const { data } = await api.put(`/promotions/${id}`, payload);
  return data;
};

// Borrar promoción
export const deletePromotion = async (id) => {
  const { data } = await api.delete(`/promotions/${id}`);
  return data;
};
