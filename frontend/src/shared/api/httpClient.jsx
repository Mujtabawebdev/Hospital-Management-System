import axios from "axios";
import { base_url } from "./config";

const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
