import axios from "axios";

const BASE_URL=import.meta.env.VITE_APP_STATE=="localhost" ? import.meta.env.VITE_APP_LOCAL_API_BASE_URL : import.meta.env.VITE_APP_GLOBAL_API_BASE_URL;

console.log(BASE_URL,"kk")

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// 🔑 ATTACH TOKEN HERE (IMPORTANT)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});