import api from "./api";

export const toggleFavorite = async (placeId) => {
  const res = await api.post("/favorites", { placeId });
  return res.data;
};

export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data;
};
