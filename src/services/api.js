// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;


// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://tektal-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Intercepteur REQUEST - Ajouter le token JWT
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access"); // ✅ Utiliser "access" comme dans authService
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Intercepteur RESPONSE - Gérer refresh token automatique
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si 401 et pas encore retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
          // Pas de refresh token → rediriger vers login
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Tenter de rafraîchir le token
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || "https://tektal-backend.onrender.com/api"}/auth/jwt/refresh/`,
          { refresh }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem("access", newAccessToken);

        // Rejouer la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh token invalide → logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
