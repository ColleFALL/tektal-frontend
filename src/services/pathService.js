// src/services/pathService.js
import API from "./api";

export const pathService = {
  // Récupérer tous les paths
  getAll: async () => {
    return await API.get("/paths/");
  },

  // Créer un path
  create: async (data) => {
    return await API.post("/paths/create/", data);
  },

  // Récupérer un path par ID
  getById: async (id) => {
    return await API.get(`/paths/${id}/`);
  },

  // Ajouter / retirer favori
  favorite: async (id) => {
    return await API.post(`/paths/${id}/favorite/`);
  },

  // GPS d’un path
  gps: async (id) => {
    return await API.get(`/paths/${id}/gps/`);
  },

  // Partage via token
  share: async (token) => {
    return await API.get(`/share/${token}/`);
  },

  // Lieux / établissements
  establishments: async () => {
    return await API.get("/establishments/");
  },
};