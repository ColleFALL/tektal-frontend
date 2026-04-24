import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, SlidersHorizontal, Play, Heart, Share2 } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import { usePaths } from "../../context/PathContext";
import ShareModal from "../../components/ShareModal"; // ✅

export default function Recherche() {
  const navigate = useNavigate();
  const { paths, loading, toggleFavorite, loadMore, loadingMore, nextPage, totalCount } = usePaths();

  const [query, setQuery]             = useState("");
  const [filtre, setFiltre]           = useState("Tous");
  const [shareTarget, setShareTarget] = useState(null); // ✅

  const filtres = ["Tous", "Officiel", "Communauté"];

  const resultats = useMemo(() => {
    return paths.filter((item) => {
      const matchTexte =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.creator.toLowerCase().includes(query.toLowerCase()) ||
        (item.establishment || "").toLowerCase().includes(query.toLowerCase()) ||
        item.departure.toLowerCase().includes(query.toLowerCase());

      const matchFiltre =
        filtre === "Tous" ? true :
        filtre === "Officiel" ? item.isOfficial :
        !item.isOfficial;

      return matchTexte && matchFiltre;
    });
  }, [paths, query, filtre]);

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
          <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-2 text-sm font-medium text-black">
            <ArrowLeft size={18} /> Retour
          </button>
          <h1 className="text-3xl font-black text-white">Recherche</h1>
          <p className="mt-2 text-sm text-white/90">Trouve rapidement le chemin qui t'intéresse</p>
          <div className="mt-5 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Titre, auteur, établissement..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400 text-xs">✕</button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">

          {/* Filtres */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#FEBD00]" />
              <p className="text-sm font-bold text-slate-800">Filtres</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filtres.map((item) => (
                <button
                  key={item}
                  onClick={() => setFiltre(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                    filtre === item ? "bg-[#FEBD00] text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#FEBD00] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : resultats.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center pt-16">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
                <Search size={42} className="text-[#FEBD00]" />
              </div>
              <h2 className="mt-6 text-2xl font-black text-slate-900">Aucun résultat</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500 max-w-[260px]">
                {query ? `Aucun chemin pour "${query}"` : "Essaie un autre filtre."}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-400 mb-4">
                {resultats.length} résultat{resultats.length > 1 ? "s" : ""}
                {nextPage && !query && (
                  <span className="text-[#FEBD00] font-semibold"> sur {totalCount}</span>
                )}
              </p>

              <div className="space-y-4">
                {resultats.map((item) => (
                  <div key={item.id} className="rounded-[24px] bg-[#F8F8F8] p-3 border border-gray-200">
                    <div className="flex gap-3">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                        <img
                          src={item.thumbnail || "https://via.placeholder.com/100?text=T"}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <div className={`absolute top-2 right-2 rounded-full px-2 py-1 text-[10px] font-bold text-white ${item.isOfficial ? "bg-[#FEBD00]" : "bg-slate-500"}`}>
                          {item.isOfficial ? "OFF" : "COM"}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-black text-slate-900 leading-5 truncate">{item.title}</h3>
                        {item.creator !== "Inconnu" && (
                          <p className="mt-1 text-xs text-slate-500">Par {item.creator}</p>
                        )}
                        {item.establishment && (
                          <p className="mt-0.5 text-xs font-medium text-[#FEBD00]">{item.establishment}</p>
                        )}
                        <p className="mt-1 text-xs text-slate-400">⏱ {item.duration}</p>

                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => navigate("/video-player", { state: { path: item } })}
                            className="flex-1 rounded-full bg-[#FEBD00] py-2.5 text-sm font-bold text-white flex items-center justify-center gap-1"
                          >
                            <Play size={13} className="fill-white" /> Ouvrir
                          </button>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                          >
                            <Heart size={18} className={item.isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"} />
                          </button>
                          {/* ✅ ShareModal */}
                          <button
                            onClick={() => setShareTarget(item)}
                            className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                          >
                            <Share2 size={16} className="text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bouton Voir plus */}
              {nextPage && !query && filtre === "Tous" && (
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#FEBD00] px-5 py-4 text-sm font-bold text-[#FEBD00] disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#FEBD00] border-t-transparent rounded-full animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    `Voir plus (${paths.length}/${totalCount})`
                  )}
                </button>
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