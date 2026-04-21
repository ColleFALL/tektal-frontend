import API from "./api";

export const authService = {
  // LOGIN (JWT)
  login: async (data) => {
    const response = await API.post("/auth/jwt/create/", data);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return response.data;
  },

  // REGISTER ✅ registration_source: 'web' ajouté
  register: async (data) => {
    return await API.post("/auth/users/", {
      ...data,
      registration_source: "web",
    });
  },

  // ACTIVATE ACCOUNT
  activate: async (uid, token) => {
    return await API.post("/auth/users/activation/", { uid, token });
  },

  // GET USER CONNECTÉ
  getMe: async () => {
    return await API.get("/auth/users/me/");
  },

  // REFRESH TOKEN
  refreshToken: async () => {
    const refresh = localStorage.getItem("refresh");
    const response = await API.post("/auth/jwt/refresh/", { refresh });
    localStorage.setItem("access", response.data.access);
    return response.data;
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },

  // MOT DE PASSE OUBLIÉ
  requestPasswordReset: async (email) => {
    return await API.post("/auth/users/reset_password/", { email });
  },

  confirmPasswordReset: async (data) => {
    return await API.post("/auth/users/reset_password_confirm/", data);
  },
};