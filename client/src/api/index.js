import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getAllBikes = () => api.get("/bikes");
export const getBikeById = (id) => api.get(`/bike/${id}`);
export const updateBikeById = (id, payload) => api.put(`/bike/${id}`, payload);

const apis = {
  getAllBikes,
  getBikeById,
  updateBikeById,
};

export default apis;
