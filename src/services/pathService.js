// // src/services/pathService.js
// import API from "./api";

// export const pathService = {
//   // Récupérer tous les paths
//   getAll: async () => {
//     return await API.get("/paths/");
//   },

//   // Créer un path
//   create: async (data) => {
//     return await API.post("/paths/create/", data);
//   },

//   // Récupérer un path par ID
//   getById: async (id) => {
//     return await API.get(`/paths/${id}/`);
//   },

//   // Ajouter / retirer favori
//   favorite: async (id) => {
//     return await API.post(`/paths/${id}/favorite/`);
//   },

//   // GPS d’un path
//   gps: async (id) => {
//     return await API.get(`/paths/${id}/gps/`);
//   },

//   // Partage via token
//   share: async (token) => {
//     return await API.get(`/share/${token}/`);
//   },

//   // Lieux / établissements
//   establishments: async () => {
//     return await API.get("/establishments/");
//   },
// };

// src/services/pathService.js
// ✅ Adapté aux vrais endpoints du backend tektal
// Base URL : https://tektal-backend.onrender.com

// import API from "./api";

// export const pathService = {

//   // GET /api/paths/  → liste avec pagination
//   getAll: async (params = {}) => {
//     return await API.get("/paths/", { params });
//   },

//   // GET /api/paths/:id/
//   getById: async (id) => {
//     return await API.get(`/paths/${id}/`);
//   },

//   // POST /api/paths/create/
//   create: async (data) => {
//     return await API.post("/paths/create/", data);
//   },

//   // POST /api/paths/:id/favorite/  → toggle favori
//   favorite: async (id) => {
//     return await API.post(`/paths/${id}/favorite/`);
//   },

//   // GET /api/users/me/favorites/
//   getFavorites: async () => {
//     return await API.get("/users/me/favorites/");
//   },

//   // GET /api/share/:id/  → accès public sans token
//   getPublic: async (token) => {
//     return await API.get(`/share/${token}/`);
//   },
// };

// // ── Helper : résoudre le nom du créateur ──────────────────────────
// export function resolveCreatorName(userObj) {
//   if (!userObj) return "Inconnu";
//   return (
//     userObj.full_name?.trim() ||
//     userObj.name?.trim() ||
//     (userObj.email ? userObj.email.split("@")[0] : null) ||
//     "Inconnu"
//   );
// }

// // ── Helper : formater un chemin brut depuis l'API ─────────────────
// export function formatPath(path, favoriteIds = new Set()) {
//   let thumbnail = "";
//   if (path.video_url) {
//     thumbnail = path.video_url
//       .replace("/upload/", "/upload/so_0,w_400,h_300,c_fill/")
//       .replace(/\.(mov|mp4|MOV|MP4)$/, ".jpg");
//   }

//   return {
//     id: path.id,
//     share_token: path.share_token || null,
//     title: path.title || "Sans titre",
//     departure: path.start_label || "Départ",
//     destination: path.end_label || "Arrivée",
//     thumbnail,
//     videoUri: path.video_url || "",
//     duration: path.duration ? `${path.duration} sec` : "0 sec",
//     steps: path.steps || [],
//     creator: resolveCreatorName(path.user),
//     establishment: path.establishment?.name || path.establishment_name || null,
//     campus: path.establishment?.name || "Tektal",
//     isOfficial: path.is_official || false,
//     isFavorite: favoriteIds.has(Number(path.id)),
//     createdAt: path.created_at,
//   };
// }

import API from "./api";

export const pathService = {

  // GET /api/paths/  → liste avec pagination
  getAll: async (params = {}) => {
    return await API.get("/paths/", { params });
  },

  // GET /api/paths/:id/
  getById: async (id) => {
    return await API.get(`/paths/${id}/`);
  },

  // POST /api/paths/create/
  create: async (data) => {
    return await API.post("/paths/create/", data);
  },

  // POST /api/paths/:id/favorite/  → toggle favori
  favorite: async (id) => {
    return await API.post(`/paths/${id}/favorite/`);
  },

  // DELETE /api/paths/:id/favorite/
  removeFavorite: async (id) => {
    return await API.delete(`/paths/${id}/favorite/`);
  },

  // GET /api/users/me/favorites/
  getFavorites: async () => {
    return await API.get("/users/me/favorites/");
  },

  // GET /api/share/:id/  → accès public sans token
  getPublic: async (token) => {
    return await API.get(`/share/${token}/`);
  },
};

// ── Helper : résoudre le nom du créateur ──────────────────────────
export function resolveCreatorName(userObj) {
  if (!userObj) return "Inconnu";
  return (
    userObj.full_name?.trim() ||
    userObj.name?.trim() ||
    (userObj.email ? userObj.email.split("@")[0] : null) ||
    "Inconnu"
  );
}

// ── Helper : formater un chemin brut depuis l'API ─────────────────
export function formatPath(path, favoriteIds = new Set()) {
  let thumbnail = "";
  if (path.video_url) {
    thumbnail = path.video_url
      .replace("/upload/", "/upload/so_0,w_400,h_300,c_fill/")
      .replace(/\.(mov|mp4|MOV|MP4)$/, ".jpg");
  }

  return {
    id:            path.id,
    share_token:   path.share_token || null,
    title:         path.title || "Sans titre",
    departure:     path.start_label || "Départ",
    destination:   path.end_label || "Arrivée",
    thumbnail,
    video_url:     path.video_url || "",   // ✅ pour VideoPlayer
    videoUri:      path.video_url || "",   // ✅ pour vue TikTok
    duration:      path.duration ? `${path.duration} sec` : "0 sec",
    steps:         path.steps || [],
    creator:       resolveCreatorName(path.user),
    establishment: path.establishment?.name || path.establishment_name || null,
    campus:        path.establishment?.name || "Tektal",
    isOfficial:    path.is_official || false,
    isFavorite:    favoriteIds.has(Number(path.id)),
    createdAt:     path.created_at,
  };
}