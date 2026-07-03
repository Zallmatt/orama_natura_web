import api from "./api";

export const getAllFragrances = async () => {
  const { data } = await api.get("/fragrances");
  return data;
};

export const createFragrance = async (payload) => {
  const { data } = await api.post("/fragrances", payload);
  return data;
};

export const updateFragrance = async (id, payload) => {
  const { data } = await api.put(`/fragrances/${id}`, payload);
  return data;
};

export const deleteFragrance = async (id) => {
  const { data } = await api.delete(`/fragrances/${id}`);
  return data;
};

export const getFragrancesByCategory = async (categoryId) => {
  const { data } = await api.get(`/fragrances/filter/${categoryId}`);
  return data;
};
