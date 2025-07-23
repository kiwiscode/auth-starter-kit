import axios from "axios";
import { triggerLogout } from "../context/AuthContext";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

const AUTH_WHITELIST = [
  "/auth/register",
  "/auth/login",
  "/auth/refresh-token",
  "/forgot-password",
  "/google",
  "/google/callback",
];

const isWhitelisted = (url: string) => {
  if (AUTH_WHITELIST.some((path) => url.includes(path))) return true;
  if (url.startsWith("/reset-password/")) return true;
  return false;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      (error.response.data?.error === "TokenExpiredError" ||
        error.response.data?.error === "NoAccessToken") &&
      !originalRequest._retry &&
      !isWhitelisted(originalRequest.url)
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh-token");
        return api(originalRequest);
      } catch (err) {
        triggerLogout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
