// // src/context/PathContext.jsx
// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
// import { pathService, formatPath } from "../services/pathService";
// import { useAuth } from "./AuthContext";

// const PathContext = createContext(null);

// export function PathProvider({ children }) {
//   const { isAuthenticated } = useAuth();
//   const [paths, setPaths] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const loadPaths = useCallback(async () => {
//     if (!isAuthenticated) return;
//     setLoading(true);
//     setError(null);

//     try {
//       // Charge chemins + favoris en parallèle
//       const [pathsRes, favsRes] = await Promise.allSettled([
//         pathService.getAll(),
//         pathService.getFavorites(),
//       ]);

//       // Construire le Set des IDs favoris
//       let favoriteIds = new Set();
//       if (favsRes.status === "fulfilled") {
//         const favData = favsRes.value.data;
//         const favArr = Array.isArray(favData?.results)
//           ? favData.results
//           : Array.isArray(favData) ? favData : [];
//         favArr.forEach((fav) => {
//           const pathId = typeof fav.path === "object" ? fav.path?.id : fav.path;
//           if (pathId != null) favoriteIds.add(Number(pathId));
//         });
//       }

//       // Formater les chemins
//       if (pathsRes.status === "fulfilled") {
//         const data = pathsRes.value.data;
//         const arr = Array.isArray(data?.results)
//           ? data.results
//           : Array.isArray(data) ? data : [];
//         setPaths(arr.map((p) => formatPath(p, favoriteIds)));
//       } else {
//         setError("Impossible de charger les chemins.");
//       }
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated]);

//   useEffect(() => { loadPaths(); }, [loadPaths]);

//   // Toggle favori avec rollback optimiste
//   const toggleFavorite = useCallback(async (pathId) => {
//     const path = paths.find((p) => p.id === pathId);
//     if (!path) return;

//     setPaths((prev) =>
//       prev.map((p) => p.id === pathId ? { ...p, isFavorite: !p.isFavorite } : p)
//     );

//     try {
//       await pathService.favorite(pathId);
//     } catch {
//       // Rollback si erreur
//       setPaths((prev) =>
//         prev.map((p) => p.id === pathId ? { ...p, isFavorite: path.isFavorite } : p)
//       );
//     }
//   }, [paths]);

//   return (
//     <PathContext.Provider value={{ paths, loading, error, refreshPaths: loadPaths, toggleFavorite }}>
//       {children}
//     </PathContext.Provider>
//   );
// }

// export function usePaths() {
//   const ctx = useContext(PathContext);
//   if (!ctx) throw new Error("usePaths must be used inside <PathProvider>");
//   return ctx;
// }

// src/context/PathContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { pathService, formatPath } from "../services/pathService";
import { useAuth } from "./AuthContext";

const PathContext = createContext(null);

export function PathProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPaths = useCallback(async () => {
    if (!isAuthenticated) {
      setPaths([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("📥 Chargement des chemins...");

      // Charger chemins + favoris en parallèle
      const [pathsRes, favsRes] = await Promise.allSettled([
        pathService.getAll(),
        pathService.getFavorites(),
      ]);

      // ✅ Construire le Set des IDs favoris
      let favoriteIds = new Set();
      if (favsRes.status === "fulfilled" && favsRes.value?.data) {
        const favData = favsRes.value.data;
        const favArr = Array.isArray(favData?.results)
          ? favData.results
          : Array.isArray(favData)
          ? favData
          : [];

        favArr.forEach((fav) => {
          const pathId = typeof fav.path === "object" ? fav.path?.id : fav.path;
          if (pathId != null) favoriteIds.add(Number(pathId));
        });

        console.log(`❤️ ${favoriteIds.size} favoris chargés`);
      }

      // ✅ Formater les chemins
      if (pathsRes.status === "fulfilled" && pathsRes.value?.data) {
        const data = pathsRes.value.data;
        const arr = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
          ? data
          : [];

        const formattedPaths = arr.map((p) => formatPath(p, favoriteIds));
        console.log(`✅ ${formattedPaths.length} chemins chargés`);
        setPaths(formattedPaths);
      } else {
        console.warn("⚠️ Aucun chemin retourné par l'API");
        setPaths([]);
      }
    } catch (e) {
      console.error("❌ Erreur chargement chemins:", e);
      setError(e.message || "Impossible de charger les chemins.");
      setPaths([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadPaths();
  }, [loadPaths]);

  // ✅ Toggle favori avec rollback optimiste
  const toggleFavorite = useCallback(
    async (pathId) => {
      const path = paths.find((p) => p.id === pathId);
      if (!path) return;

      // Update optimiste
      setPaths((prev) =>
        prev.map((p) =>
          p.id === pathId ? { ...p, isFavorite: !p.isFavorite } : p
        )
      );

      try {
        await pathService.favorite(pathId);
        console.log(`❤️ Favori togglé pour path ${pathId}`);
      } catch (error) {
        console.error("❌ Erreur toggle favori:", error);
        // Rollback
        setPaths((prev) =>
          prev.map((p) =>
            p.id === pathId ? { ...p, isFavorite: path.isFavorite } : p
          )
        );
      }
    },
    [paths]
  );

  return (
    <PathContext.Provider
      value={{
        paths,
        loading,
        error,
        refreshPaths: loadPaths,
        toggleFavorite,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}

export function usePaths() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error("usePaths must be used inside <PathProvider>");
  return ctx;
}