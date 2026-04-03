import API from "./api";

export const authService = {
  login: (data) => API.post("/auth/jwt/create/", data),

  register: (data) => API.post("/auth/users/", data),

  activate: (data) => API.post("/auth/users/activation/", data),

  getMe: () => API.get("/auth/users/me/"),
};