
// // function Favoris() {
// //   return <div>Favoris</div>
// // }

// // export default Favoris


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Heart, Play, Share2 } from "lucide-react";
// import BottomNavigation from "../../components/BottomNavigation";

// const favoris = [
//   {
//     id: 1,
//     titre: "Vers Bakeli Principal",
//     auteur: "Admin Bakeli",
//     duree: "35 sec",
//     image:
//       "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
//     officiel: true,
//   },
//   {
//     id: 2,
//     titre: "Trouver la salle design",
//     auteur: "Fatou",
//     duree: "28 sec",
//     image:
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
//     officiel: false,
//   },
// ];

// export default function Favoris() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
//       <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
//         <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
//           <button
//             onClick={() => navigate(-1)}
//             className="mb-5 flex items-center gap-2 text-sm font-medium text-black"
//           >
//             <ArrowLeft size={18} />
//             Retour
//           </button>

//           <h1 className="text-3xl font-black text-white">Mes favoris</h1>
//           <p className="mt-2 text-sm text-white/90">
//             Les chemins que tu veux retrouver rapidement
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
//           {favoris.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center">
//               <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
//                 <Heart size={42} className="text-[#FEBD00]" />
//               </div>

//               <h2 className="mt-6 text-2xl font-black text-slate-900">
//                 Aucun favori
//               </h2>

//               <p className="mt-3 text-sm leading-7 text-slate-500">
//                 Ajoute des chemins a tes favoris pour les retrouver ici.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {favoris.map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-[24px] bg-[#F8F8F8] p-3 border border-gray-200"
//                 >
//                   <div className="flex gap-3">
//                     <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
//                       <img
//                         src={item.image}
//                         alt={item.titre}
//                         className="h-full w-full object-cover"
//                       />

//                       {item.officiel ? (
//                         <div className="absolute top-2 right-2 rounded-full bg-[#FEBD00] px-2 py-1 text-[10px] font-bold text-white">
//                           OFF
//                         </div>
//                       ) : null}
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="text-sm font-black text-slate-900 leading-5">
//                         {item.titre}
//                       </h3>

//                       <p className="mt-1 text-xs text-slate-500">
//                         Par {item.auteur}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">{item.duree}</p>

//                       <div className="mt-4 flex gap-2">
//                         <button
//                           onClick={() => navigate("/video-player")}
//                           className="flex-1 rounded-full bg-[#FEBD00] py-3 text-sm font-bold text-white"
//                         >
//                           Ouvrir
//                         </button>

//                         <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
//                           <Play size={16} className="text-slate-700" />
//                         </button>

//                         <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
//                           <Share2 size={16} className="text-slate-700" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <BottomNavigation />
//       </div>
//     </div>
//   );
// }



// src/pages/dashboard/Favoris.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Heart, Play, Share2,
  RefreshCw, ChevronLeft, ChevronRight,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import API from "../../services/api";
import { formatPath } from "../../services/pathService";

const PAGE_SIZE = 6;

export default function Favoris() {
  const navigate = useNavigate();

  const [favoris, setFavoris]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [page, setPage]             = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // ── Fetch ────────────────────────────────────────────────────
  const fetchFavoris = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/users/me/favorites/", {
        params: { page: pageNum, page_size: PAGE_SIZE },
      });

      const data  = res.data;
      const count = data?.count ?? (Array.isArray(data) ? data.length : 0);
      setTotalCount(count);

      const raw = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data) ? data : [];

      // ✅ Chaque item est un SavedPath → extraire item.path
      const paths = raw
        .map((item) => item?.path ?? item)
        .filter((p) => p && p.id);

      // Dédupliquer
      const unique = Array.from(
        new Map(paths.map((p) => [p.id, p])).values()
      );

      const favoriteIds = new Set(unique.map((p) => Number(p.id)));
      setFavoris(unique.map((p) => formatPath(p, favoriteIds)));
      setPage(pageNum);
    } catch (err) {
      console.error("Erreur favoris:", err);
      setError("Impossible de charger les favoris.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFavoris(1); }, [fetchFavoris]);

  // ── Supprimer favori ─────────────────────────────────────────
  const handleRemoveFavorite = async (id) => {
    // Optimistic remove immédiat
    setFavoris((prev) => prev.filter((p) => p.id !== id));
    setTotalCount((prev) => Math.max(0, prev - 1));

    try {
      // ✅ DELETE /paths/:id/favorite/ — ton backend FavoriteToggleView
      await API.delete(`/paths/${id}/favorite/`);
      // ✅ Pas de fetchFavoris() ici — on garde l'état optimiste
      // Si la page est vide, revenir à la page précédente
      setFavoris((current) => {
        if (current.length === 0 && page > 1) {
          fetchFavoris(page - 1);
        }
        return current;
      });
    } catch (err) {
      console.error("Erreur suppression favori:", err);
      // ✅ Rollback uniquement si erreur réelle
      fetchFavoris(page);
    }
  };

  // ── Share ────────────────────────────────────────────────────
  const handleShare = async (item) => {
    const token = item.share_token || String(item.id);
    const url   = `https://tektal-web-appli.vercel.app/path/${token}`;
    const text  = `🗺️ "${item.title}"\n👉 ${url}`;
    if (navigator.share) {
      try { await navigator.share({ title: item.title, text, url }); return; }
      catch { /* fallback */ }
    }
    try { await navigator.clipboard.writeText(url); alert("✅ Lien copié !"); }
    catch { /* ignore */ }
  };

  // ── Loading ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[450px] bg-white flex flex-col items-center justify-center h-screen gap-4">
          <div className="w-10 h-10 border-4 border-[#FEBD00] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Chargement des favoris...</p>
        </div>
      </div>
    );
  }

  // ── Empty ────────────────────────────────────────────────────
  if (!loading && favoris.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[450px] bg-white flex flex-col min-h-screen">
          <div className="bg-[#FEBD00] px-5 pt-10 pb-6 rounded-b-[35px]">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-black text-sm font-medium">
              <ArrowLeft size={18} /> Retour
            </button>
            <h1 className="text-white text-2xl font-black mt-4">Mes favoris</h1>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center">
              <Heart size={36} className="text-[#FEBD00]" />
            </div>
            <h2 className="text-xl font-black text-gray-800">Aucun favori</h2>
            <p className="text-gray-400 text-sm leading-6">
              Appuie sur ❤️ sur un chemin pour le retrouver ici.
            </p>
            <button onClick={() => navigate("/home")} className="bg-[#FEBD00] text-white font-bold px-6 py-3 rounded-full">
              Explorer les chemins
            </button>
          </div>
          <BottomNavigation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[450px] bg-white flex flex-col min-h-screen">

        {/* HEADER */}
        <div className="bg-[#FEBD00] px-5 pt-10 pb-6 rounded-b-[35px]">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-black text-sm font-medium">
            <ArrowLeft size={18} /> Retour
          </button>
          <div className="flex justify-between items-center mt-4">
            <div>
              <h1 className="text-white text-2xl font-black">Mes favoris</h1>
              <p className="text-white/90 text-sm">
                {totalCount} chemin{totalCount > 1 ? "s" : ""} sauvegardé{totalCount > 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => fetchFavoris(page)}
              className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center"
            >
              <RefreshCw size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 pt-5 pb-28">

          {error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <p className="text-red-500 font-medium">{error}</p>
              <button onClick={() => fetchFavoris(1)} className="bg-[#FEBD00] text-white font-bold px-6 py-3 rounded-full text-sm">
                Réessayer
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {favoris.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-[#F8F8F8] p-3 rounded-2xl border border-gray-100">

                    {/* Thumbnail */}
                    <button
                      onClick={() => navigate("/video-player", { state: { path: item } })}
                      className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0"
                    >
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Play size={20} className="text-gray-400" />
                        </div>
                      )}
                      {item.isOfficial && (
                        <div className="absolute top-1 right-1 bg-[#FEBD00] rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white">OFF</div>
                      )}
                      <div className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-[#FEBD00]/90 flex items-center justify-center">
                        <Play size={12} className="text-white fill-white" />
                      </div>
                    </button>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-sm text-slate-900 truncate">{item.title}</h3>
                      {item.creator !== "Inconnu" && (
                        <p className="text-xs text-gray-500 mt-0.5">Par {item.creator}</p>
                      )}
                      {item.establishment && (
                        <p className="text-xs font-medium text-[#FEBD00] mt-0.5">{item.establishment}</p>
                      )}
                      {item.departure !== "Départ" && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          📍 {item.departure} → {item.destination}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">⏱ {item.duration}</p>

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => navigate("/video-player", { state: { path: item } })}
                          className="flex-1 bg-[#FEBD00] text-white font-bold text-xs py-2 rounded-full flex items-center justify-center gap-1"
                        >
                          <Play size={12} className="fill-white" /> Ouvrir
                        </button>
                        <button
                          onClick={() => handleRemoveFavorite(item.id)}
                          className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                          title="Retirer des favoris"
                        >
                          <Heart size={16} className="fill-red-500 text-red-500" />
                        </button>
                        <button
                          onClick={() => handleShare(item)}
                          className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                        >
                          <Share2 size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-3 mt-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fetchFavoris(page - 1)}
                      disabled={page === 1}
                      className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-30"
                    >
                      <ChevronLeft size={18} className="text-gray-600" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => fetchFavoris(p)}
                        className={`h-9 w-9 rounded-full text-sm font-bold transition-all ${
                          p === page ? "bg-[#FEBD00] text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      onClick={() => fetchFavoris(page + 1)}
                      disabled={page === totalPages}
                      className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-30"
                    >
                      <ChevronRight size={18} className="text-gray-600" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Page {page} sur {totalPages} · {totalCount} favori{totalCount > 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}


