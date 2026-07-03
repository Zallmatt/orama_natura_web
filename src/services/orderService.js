// src/services/orderService.js
import api from "./api";

// Traer todas las órdenes
export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

// Traer orden por ID
export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

// Traer órdenes por usuario
export const getOrdersByUser = async (userId) => {
  const { data } = await api.get(`/orders/user/${userId}`);
  return data;
};

// Traer resumen de orden por ID
export const getOrderSummaryById = async (id) => {
  const { data } = await api.get(`/orders/${id}/resumen`);
  return data;
};

// Traer resumen de órdenes por usuario
export const getOrdersSummaryByUser = async (userId) => {
  const { data } = await api.get(`/orders/user/${userId}/resumen`);
  return data;
};

// Crear una nueva orden
export const createOrder = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};
