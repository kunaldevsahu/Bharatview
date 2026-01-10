import api from "./api";

export const fetchPlaces = async (params = {}) => {
  const res = await api.get("/places", { params });
  return res.data;
};

export const fetchPlaceById = async (id) => {
  const res = await api.get(`/places/${id}`);
  return res.data;
};
