import API from "./api";

export const pathService = {
  getAll: () => API.get("/paths/"),

  create: (data) => API.post("/paths/create/", data),

  getById: (id) => API.get(`/paths/${id}/`),

  favorite: (id) => API.post(`/paths/${id}/favorite/`),

  gps: (id) => API.get(`/paths/${id}/gps/`),

  share: (token) => API.get(`/share/${token}/`),

  establishments: () => API.get("/establishments/"),
};