// src/services/statsService.js
import api from "./api";

// Traer total de ventas
export const getTotalSales = async () => {
  const { data } = await api.get("/stats/total-sales");
  return data;
};
