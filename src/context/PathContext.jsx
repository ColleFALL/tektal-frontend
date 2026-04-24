
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
//     if (!isAuthenticated) {
//       setPaths([]);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       console.log("📥 Chargement des chemins...");

//       // Charger chemins + favoris en parallèle
//       const [pathsRes, favsRes] = await Promise.allSettled([
//         pathService.getAll(),
//         pathService.getFavorites(),
//       ]);

//       // ✅ Construire le Set des IDs favoris
//       let favoriteIds = new Set();
//       if (favsRes.status === "fulfilled" && favsRes.value?.data) {
//         const favData = favsRes.value.data;
//         const favArr = Array.isArray(favData?.results)
//           ? favData.results
//           : Array.isArray(favData)
//           ? favData
//           : [];

//         favArr.forEach((fav) => {
//           const pathId = typeof fav.path === "object" ? fav.path?.id : fav.path;
//           if (pathId != null) favoriteIds.add(Number(pathId));
//         });

//         console.log(`❤️ ${favoriteIds.size} favoris chargés`);
//       }

//       // ✅ Formater les chemins
//       if (pathsRes.status === "fulfilled" && pathsRes.value?.data) {
//         const data = pathsRes.value.data;
//         const arr = Array.isArray(data?.results)
//           ? data.results
//           : Array.isArray(data)
//           ? data
//           : [];

//         const formattedPaths = arr.map((p) => formatPath(p, favoriteIds));
//         console.log(`✅ ${formattedPaths.length} chemins chargés`);
//         setPaths(formattedPaths);
//       } else {
//         console.warn("⚠️ Aucun chemin retourné par l'API");
//         setPaths([]);
//       }
//     } catch (e) {
//       console.error("❌ Erreur chargement chemins:", e);
//       setError(e.message || "Impossible de charger les chemins.");
//       setPaths([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     loadPaths();
//   }, [loadPaths]);

//   // ✅ Toggle favori avec rollback optimiste
//   const toggleFavorite = useCallback(
//     async (pathId) => {
//       const path = paths.find((p) => p.id === pathId);
//       if (!path) return;

//       // Update optimiste
//       setPaths((prev) =>
//         prev.map((p) =>
//           p.id === pathId ? { ...p, isFavorite: !p.isFavorite } : p
//         )
//       );

//       try {
//         await pathService.favorite(pathId);
//         console.log(`❤️ Favori togglé pour path ${pathId}`);
//       } catch (error) {
//         console.error("❌ Erreur toggle favori:", error);
//         // Rollback
//         setPaths((prev) =>
//           prev.map((p) =>
//             p.id === pathId ? { ...p, isFavorite: path.isFavorite } : p
//           )
//         );
//       }
//     },
//     [paths]
//   );

//   return (
//     <PathContext.Provider
//       value={{
//         paths,
//         loading,
//         error,
//         refreshPaths: loadPaths,
//         toggleFavorite,
//       }}
//     >
//       {children}
//     </PathContext.Provider>
//   );
// }

// export function usePaths() {
//   const ctx = useContext(PathContext);
//   if (!ctx) throw new Error("usePaths must be used inside <PathProvider>");
//   return ctx;
// }
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { pathService, formatPath } from "../services/pathService";
import { useAuth } from "./AuthContext";

const PathContext = createContext(null);

export function PathProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // ✅ loading pour "voir plus"
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);        // ✅ URL page suivante
  const [totalCount, setTotalCount] = useState(0);       // ✅ total chemins

  const buildFavoriteIds = (favsRes) => {
    let favoriteIds = new Set();
    if (favsRes.status === "fulfilled" && favsRes.value?.data) {
      const favData = favsRes.value.data;
      const favArr = Array.isArray(favData?.results)
        ? favData.results
        : Array.isArray(favData) ? favData : [];
      favArr.forEach((fav) => {
        const pathId = typeof fav.path === "object" ? fav.path?.id : fav.path;
        if (pathId != null) favoriteIds.add(Number(pathId));
      });
    }
    return favoriteIds;
  };

  const loadPaths = useCallback(async () => {
    if (!isAuthenticated) { setPaths([]); return; }

    setLoading(true);
    setError(null);

    try {
      const [pathsRes, favsRes] = await Promise.allSettled([
        pathService.getAll({ page: 1 }),
        pathService.getFavorites(),
      ]);

      const favoriteIds = buildFavoriteIds(favsRes);

      if (pathsRes.status === "fulfilled" && pathsRes.value?.data) {
        const data = pathsRes.value.data;
        const arr = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data) ? data : [];

        setPaths(arr.map((p) => formatPath(p, favoriteIds)));
        setNextPage(data?.next || null);       // ✅ URL page suivante
        setTotalCount(data?.count || arr.length); // ✅ total
        console.log(`✅ ${arr.length} chemins chargés / ${data?.count} total`);
      } else {
        setPaths([]);
        setNextPage(null);
        setTotalCount(0);
      }
    } catch (e) {
      console.error("❌ Erreur:", e);
      setError(e.message || "Impossible de charger les chemins.");
      setPaths([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ✅ Charger la page suivante
  const loadMore = useCallback(async () => {
    if (!nextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      // Extraire le numéro de page depuis l'URL next
      const url = new URL(nextPage);
      const page = url.searchParams.get("page");

      const [pathsRes, favsRes] = await Promise.allSettled([
        pathService.getAll({ page }),
        pathService.getFavorites(),
      ]);

      const favoriteIds = buildFavoriteIds(favsRes);

      if (pathsRes.status === "fulfilled" && pathsRes.value?.data) {
        const data = pathsRes.value.data;
        const arr = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data) ? data : [];

        // ✅ Ajouter aux chemins existants
        setPaths((prev) => [
          ...prev,
          ...arr.map((p) => formatPath(p, favoriteIds)),
        ]);
        setNextPage(data?.next || null);
        console.log(`✅ ${arr.length} chemins supplémentaires chargés`);
      }
    } catch (e) {
      console.error("❌ Erreur loadMore:", e);
    } finally {
      setLoadingMore(false);
    }
  }, [nextPage, loadingMore]);

  useEffect(() => { loadPaths(); }, [loadPaths]);

  const toggleFavorite = useCallback(async (pathId) => {
    const path = paths.find((p) => p.id === pathId);
    if (!path) return;

    setPaths((prev) =>
      prev.map((p) => p.id === pathId ? { ...p, isFavorite: !p.isFavorite } : p)
    );

    try {
      await pathService.favorite(pathId);
    } catch (error) {
      console.error("❌ Erreur toggle favori:", error);
      setPaths((prev) =>
        prev.map((p) => p.id === pathId ? { ...p, isFavorite: path.isFavorite } : p)
      );
    }
  }, [paths]);

  return (
    <PathContext.Provider value={{
      paths,
      loading,
      loadingMore,  // ✅ exposé
      error,
      nextPage,     // ✅ exposé
      totalCount,   // ✅ exposé
      refreshPaths: loadPaths,
      loadMore,     // ✅ exposé
      toggleFavorite,
    }}>
      {children}
    </PathContext.Provider>
  );
}

export function usePaths() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error("usePaths must be used inside <PathProvider>");
  return ctx;
}