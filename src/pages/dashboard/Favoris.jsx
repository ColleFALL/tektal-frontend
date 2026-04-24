import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Heart, Play, Share2,
  RefreshCw, ChevronLeft, ChevronRight,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import API from "../../services/api";
import { formatPath } from "../../services/pathService";
import ShareModal from "../../components/ShareModal"; // ✅

const PAGE_SIZE = 6;

export default function Favoris() {
  const navigate = useNavigate();

  const [favoris, setFavoris]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [page, setPage]                 = useState(1);
  const [totalCount, setTotalCount]     = useState(0);
  const [shareTarget, setShareTarget]   = useState(null); // ✅
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

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
      const paths = raw.map((item) => item?.path ?? item).filter((p) => p && p.id);
      const unique = Array.from(new Map(paths.map((p) => [p.id, p])).values());
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

  const handleRemoveFavorite = async (id) => {
    setFavoris((prev) => prev.filter((p) => p.id !== id));
    setTotalCount((prev) => Math.max(0, prev - 1));
    try {
      await API.delete(`/paths/${id}/favorite/`);
      setFavoris((current) => {
        if (current.length === 0 && page > 1) fetchFavoris(page - 1);
        return current;
      });
    } catch (err) {
      console.error("Erreur suppression favori:", err);
      fetchFavoris(page);
    }
  };

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
            <p className="text-gray-400 text-sm leading-6">Appuie sur ❤️ sur un chemin pour le retrouver ici.</p>
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
            <button onClick={() => fetchFavoris(page)} className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
              <RefreshCw size={18} className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-5 pb-28">
          {error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <p className="text-red-500 font-medium">{error}</p>
              <button onClick={() => fetchFavoris(1)} className="bg-[#FEBD00] text-white font-bold px-6 py-3 rounded-full text-sm">Réessayer</button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {favoris.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-[#F8F8F8] p-3 rounded-2xl border border-gray-100">
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

                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-sm text-slate-900 truncate">{item.title}</h3>
                      {item.creator !== "Inconnu" && <p className="text-xs text-gray-500 mt-0.5">Par {item.creator}</p>}
                      {item.establishment && <p className="text-xs font-medium text-[#FEBD00] mt-0.5">{item.establishment}</p>}
                      {item.departure !== "Départ" && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">📍 {item.departure} → {item.destination}</p>
                      )}
                      <p className="text-xs text-gray-400">⏱ {item.duration}</p>

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
                        {/* ✅ ShareModal */}
                        <button
                          onClick={() => setShareTarget(item)}
                          className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                        >
                          <Share2 size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-3 mt-6">
                  <div className="flex items-center gap-2">
                    <button onClick={() => fetchFavoris(page - 1)} disabled={page === 1} className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-30">
                      <ChevronLeft size={18} className="text-gray-600" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => fetchFavoris(p)} className={`h-9 w-9 rounded-full text-sm font-bold transition-all ${p === page ? "bg-[#FEBD00] text-white" : "bg-gray-100 text-gray-600"}`}>
                        {p}
                      </button>
                    ))}
                    <button onClick={() => fetchFavoris(page + 1)} disabled={page === totalPages} className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-30">
                      <ChevronRight size={18} className="text-gray-600" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">Page {page} sur {totalPages} · {totalCount} favori{totalCount > 1 ? "s" : ""}</p>
                </div>
              )}
            </>
          )}
        </div>

        <BottomNavigation />
      </div>

      {/* ✅ ShareModal */}
      {shareTarget && <ShareModal path={shareTarget} onClose={() => setShareTarget(null)} />}
    </div>
  );
}