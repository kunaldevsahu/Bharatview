import api from "./api";

export const askIndiBot = async (query) => {
  const res = await api.post("/indibot", { query });
  return res.data;
};
