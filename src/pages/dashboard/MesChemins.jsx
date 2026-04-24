import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid3X3, PlayCircle, Heart, Search,
  PlusCircle, Share2, RefreshCw, Play, MapPin,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import { useAuth } from "../../context/AuthContext";
import { usePaths } from "../../context/PathContext";
import ShareModal from "../../components/ShareModal"; // ✅

export default function Accueil() {
  const navigate = useNavigate();
  const { displayName } = useAuth();
  const { paths, loading, error, refreshPaths, toggleFavorite, loadMore, loadingMore, nextPage, totalCount } = usePaths();

  const [viewMode, setViewMode] = useState("classic");
  const [searchQuery, setSearchQuery] = useState("");
  const [shareTarget, setShareTarget] = useState(null); // ✅

  const filteredPaths = paths.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.establishment || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FEBD00] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Chargement des chemins...</p>
        </div>
      </div>
    );
  }

  if (error && paths.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl flex flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="text-4xl">😕</div>
          <p className="text-gray-600 font-semibold">Impossible de charger les chemins</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button onClick={refreshPaths} className="bg-[#FEBD00] text-white font-bold px-6 py-3 rounded-full">Réessayer</button>
        </div>
      </div>
    );
  }

  if (viewMode === "tiktok") {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-black shadow-2xl overflow-hidden">
          <button onClick={() => setViewMode("classic")} className="absolute left-5 top-8 z-20 h-12 w-12 rounded-full bg-black/40 text-white flex items-center justify-center">
            <Grid3X3 size={24} />
          </button>
          {paths.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-4">
              <p className="text-white text-lg font-bold">Aucune vidéo disponible</p>
              <button onClick={() => navigate("/ajouter")} className="bg-[#FEBD00] text-white font-bold px-6 py-3 rounded-full">Créer un chemin</button>
            </div>
          ) : (
            <div className="h-full overflow-y-auto snap-y snap-mandatory">
              {paths.map((path) => (
                <div key={path.id} className="relative h-screen w-full snap-start flex-shrink-0">
                  {path.videoUri ? (
                    <video src={path.videoUri} className="h-full w-full object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={path.thumbnail || "https://via.placeholder.com/450x900?text=Tektal"} alt={path.title} className="h-full w-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
                  <div className="absolute bottom-28 left-4 right-24 text-white">
                    <h2 className="text-xl font-black">{path.title}</h2>
                    {path.creator !== "Inconnu" && <p className="mt-1 text-sm text-white/90">Par {path.creator}</p>}
                    {path.establishment && <p className="mt-1 text-xs text-[#FEBD00] font-semibold">{path.establishment}</p>}
                    <p className="mt-2 text-sm text-white/80">⏱ {path.duration}</p>
                  </div>
                  <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5">
                    <button onClick={() => toggleFavorite(path.id)} className="flex flex-col items-center text-white">
                      <Heart size={30} className={path.isFavorite ? "fill-red-500 text-red-500" : "text-white"} />
                      <span className="mt-1 text-[11px] font-semibold">Aimer</span>
                    </button>
                    <button onClick={() => navigate("/video-player", { state: { path } })} className="flex flex-col items-center text-white">
                      <Play size={30} />
                      <span className="mt-1 text-[11px] font-semibold">Voir</span>
                    </button>
                    {/* ✅ ShareModal */}
                    <button onClick={() => setShareTarget(path)} className="flex flex-col items-center text-white">
                      <Share2 size={30} />
                      <span className="mt-1 text-[11px] font-semibold">Partager</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {shareTarget && <ShareModal path={shareTarget} onClose={() => setShareTarget(null)} />}
      </div>
    );
  }

  if (paths.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#FEBD00] px-6 pt-10 pb-6 rounded-b-[35px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90">Bonjour 👋</p>
                <h1 className="text-2xl font-black text-white">{displayName || "Utilisateur"}</h1>
              </div>
              <button onClick={() => setViewMode("tiktok")} className="h-12 w-12 rounded-full bg-white/20 text-white flex items-center justify-center">
                <PlayCircle size={26} />
              </button>
            </div>
          </div>
          <div className="flex-1 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
              <Search size={44} className="text-[#FEBD00]" />
            </div>
            <h2 className="mt-6 text-2xl font-black text-black">Aucun chemin pour le moment</h2>
            <p className="mt-3 text-sm leading-7 text-gray-500">Explore de nouveaux horizons en créant ton premier chemin.</p>
            <button onClick={() => navigate("/ajouter")} className="mt-8 rounded-full bg-[#FEBD00] px-6 py-4 text-white font-bold shadow-lg">Créer un chemin</button>
          </div>
          <BottomNavigation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">

        <div className="bg-[#FEBD00] px-6 pt-10 pb-6 rounded-b-[35px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Bonjour 👋</p>
              <h1 className="text-2xl font-black text-white">{displayName || "Utilisateur"}</h1>
            </div>
            <button onClick={() => setViewMode("tiktok")} className="h-12 w-12 rounded-full bg-white/20 text-white flex items-center justify-center">
              <PlayCircle size={26} />
            </button>
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher un chemin..." className="w-full bg-transparent text-sm text-gray-700 outline-none" />
            {searchQuery && <button onClick={() => setSearchQuery("")} className="text-gray-400 text-xs">✕</button>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24">
          {!searchQuery && (
            <div className="px-5 pt-6">
              <h2 className="text-lg font-black text-black mb-4">Derniers chemins</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                {paths.slice(0, 5).map((path) => (
                  <button key={path.id} onClick={() => navigate("/video-player", { state: { path } })} className="relative min-w-[260px] h-[200px] overflow-hidden rounded-[24px] text-left snap-start flex-shrink-0">
                    <img src={path.thumbnail || "https://via.placeholder.com/260x200?text=Tektal"} alt={path.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                    {path.isOfficial && <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#FEBD00]">Officiel</span>}
                    <div className="absolute bottom-4 left-4 right-12 text-white">
                      <h3 className="text-base font-black leading-5">{path.title}</h3>
                      {path.creator !== "Inconnu" && <p className="mt-1 text-xs text-white/90">Par {path.creator}</p>}
                      <p className="mt-1 text-xs text-white/80">⏱ {path.duration}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-[#FEBD00] flex items-center justify-center">
                      <Play size={16} className="text-white fill-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 px-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-black">
                {searchQuery ? `Résultats (${filteredPaths.length})` : "Tous les chemins"}
              </h2>
              <button onClick={refreshPaths} className="h-9 w-9 rounded-full bg-yellow-50 flex items-center justify-center text-[#FEBD00]">
                <RefreshCw size={18} />
              </button>
            </div>

            {filteredPaths.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">Aucun résultat pour "{searchQuery}"</p>
            ) : (
              <div className="space-y-4">
                {filteredPaths.map((path) => (
                  <div key={path.id} className="flex items-center rounded-[20px] bg-[#f8f8f8] p-3">
                    <button onClick={() => navigate("/video-player", { state: { path } })} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                      <img src={path.thumbnail || "https://via.placeholder.com/100?text=T"} alt={path.title} className="h-full w-full object-cover" />
                      {path.isOfficial && <div className="absolute right-1 top-1 rounded-full bg-[#FEBD00] px-1.5 py-0.5 text-[9px] font-bold text-white">OFF</div>}
                      <div className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-[#FEBD00]/90 flex items-center justify-center">
                        <Play size={12} className="text-white fill-white" />
                      </div>
                    </button>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-sm font-black text-slate-900 leading-5 truncate">{path.title}</h3>
                      {path.creator !== "Inconnu" && <p className="mt-1 text-xs text-slate-500">Par {path.creator}</p>}
                      {path.establishment && <p className="mt-0.5 text-xs font-medium text-[#FEBD00]">{path.establishment}</p>}
                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        <MapPin size={10} />
                        <span className="truncate">{path.departure} → {path.destination}</span>
                      </div>
                      <p className="text-xs text-slate-400">⏱ {path.duration}</p>
                    </div>
                    <div className="ml-2 flex flex-col items-center gap-3">
                      <button onClick={() => toggleFavorite(path.id)}>
                        <Heart size={22} className={path.isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"} />
                      </button>
                      {/* ✅ ShareModal */}
                      <button onClick={() => setShareTarget(path)}>
                        <Share2 size={18} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {nextPage && !searchQuery && (
              <button onClick={loadMore} disabled={loadingMore} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#FEBD00] px-5 py-4 text-sm font-bold text-[#FEBD00] disabled:opacity-50">
                {loadingMore ? (
                  <><div className="w-4 h-4 border-2 border-[#FEBD00] border-t-transparent rounded-full animate-spin" />Chargement...</>
                ) : `Voir plus (${paths.length}/${totalCount})`}
              </button>
            )}

            <button onClick={() => navigate("/ajouter")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md">
              <PlusCircle size={18} /> Ajouter un chemin
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>

      {/* ✅ ShareModal */}
      {shareTarget && <ShareModal path={shareTarget} onClose={() => setShareTarget(null)} />}
    </div>
  );
}