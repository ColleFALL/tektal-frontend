// src/services/authService.js
import API from "./api";

export const authService = {
  // LOGIN (JWT)
  login: async (data) => {
    const response = await API.post("/auth/jwt/create/", data);

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
  },

  // REGISTER
  register: async (data) => {
    return await API.post("/auth/users/", data);
  },

  // ACTIVATE ACCOUNT
  activate: async (data) => {
    return await API.post("/auth/users/activation/", data);
  },

  // GET USER CONNECTÉ
  getMe: async () => {
    return await API.get("/auth/users/me/");
  },

  // REFRESH TOKEN
  refreshToken: async () => {
    const refresh = localStorage.getItem("refresh");

    const response = await API.post("/auth/jwt/refresh/", {
      refresh,
    });

    localStorage.setItem("access", response.data.access);

    return response.data;
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },

  // ========================
  //  MOT DE PASSE OUBLIÉ
  // ========================

  // 1. Demander le reset (envoie email)
  requestPasswordReset: async (email) => {
    return await API.post("/auth/users/reset_password/", {
      email,
    });
  },

  // 2. Confirmer le reset (lien email)
  confirmPasswordReset: async (data) => {
    // data = { uid, token, new_password, re_new_password }
    return await API.post("/auth/users/reset_password_confirm/", data);
  },
};