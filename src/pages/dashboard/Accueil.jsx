
// function Accueil() {
//   return <div>Accueil </div>
// }

// export default Accueil
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid3X3,
  PlayCircle,
  Heart,
  Search,
  PlusCircle,
  Share2,
  RefreshCw,
  Play,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

function Accueil() {
  const navigate = useNavigate();
  const [userName] = useState("Anta");
  const [viewMode, setViewMode] = useState("classic");
  const [favorites, setFavorites] = useState([2]);

  const paths = useMemo(
    () => [
      {
        id: 1,
        title: "Vers Bakeli Principal",
        creator: "Admin Bakeli",
        duration: "35 sec",
        thumbnail:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
        isOfficial: true,
        establishment: "Bakeli",
      },
      {
        id: 2,
        title: "Trouver la salle design",
        creator: "Fatou",
        duration: "28 sec",
        thumbnail:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        isOfficial: false,
        establishment: "",
      },
      {
        id: 3,
        title: "Aller au bloc administratif",
        creator: "Moussa",
        duration: "40 sec",
        thumbnail:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        isOfficial: true,
        establishment: "Campus central",
      },
    ],
    []
  );

  const goToAjouter = () => navigate("/ajouter");

  const handleOpenPath = (path) => {
    navigate("/video-player", { state: { path } });
  };

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = async (path) => {
    const shareUrl = `https://tektal.app/path/${path.id}`;
    const shareText = `Decouvre ce chemin : "${path.title}" - ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: path.title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      alert("Lien copie dans le presse-papiers");
    } catch {
      alert("Impossible de partager pour le moment");
    }
  };

  if (!paths.length) {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#FEBD00] px-6 pt-10 pb-6 rounded-b-[35px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90">Bonjour</p>
                <h1 className="text-2xl font-black text-white">{userName}</h1>
              </div>

              <button
                onClick={() => setViewMode("tiktok")}
                className="h-12 w-12 rounded-full bg-white/20 text-white flex items-center justify-center"
              >
                <PlayCircle size={26} />
              </button>
            </div>
          </div>

          <div className="flex-1 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
              <Search size={44} className="text-[#FEBD00]" />
            </div>

            <h2 className="mt-6 text-2xl font-black text-black">
              Aucun chemin pour le moment
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Explore de nouveaux horizons en creant ton premier chemin.
            </p>

            <button
              onClick={goToAjouter}
              className="mt-8 rounded-full bg-[#FEBD00] px-6 py-4 text-white font-bold shadow-lg"
            >
              Creer un chemin
            </button>
          </div>

          <BottomNavigation />
        </div>
      </div>
    );
  }

  if (viewMode === "tiktok") {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-black shadow-2xl overflow-hidden">
          <button
            onClick={() => setViewMode("classic")}
            className="absolute left-5 top-8 z-20 h-12 w-12 rounded-full bg-black/40 text-white flex items-center justify-center"
          >
            <Grid3X3 size={24} />
          </button>

          <div className="h-full overflow-y-auto snap-y snap-mandatory">
            {paths.map((path) => {
              const isFavorite = favorites.includes(path.id);

              return (
                <div key={path.id} className="relative h-screen w-full snap-start">
                  <img
                    src={path.thumbnail}
                    alt={path.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />

                  <div className="absolute bottom-28 left-4 right-24 text-white">
                    <h2 className="text-xl font-black">{path.title}</h2>
                    <p className="mt-1 text-sm text-white/90">Par {path.creator}</p>
                    <p className="mt-2 text-sm text-white/80">{path.duration}</p>
                  </div>

                  <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5">
                    <button
                      onClick={() => handleToggleFavorite(path.id)}
                      className="flex flex-col items-center text-white"
                    >
                      <Heart
                        size={30}
                        className={
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }
                      />
                      <span className="mt-1 text-[11px] font-semibold">Aimer</span>
                    </button>

                    <button
                      onClick={() => handleOpenPath(path)}
                      className="flex flex-col items-center text-white"
                    >
                      <Play size={30} />
                      <span className="mt-1 text-[11px] font-semibold">Voir</span>
                    </button>

                    <button
                      onClick={() => handleShare(path)}
                      className="flex flex-col items-center text-white"
                    >
                      <Share2 size={30} />
                      <span className="mt-1 text-[11px] font-semibold">Partager</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
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
              <p className="text-sm text-white/90">Bonjour</p>
              <h1 className="text-2xl font-black text-white">{userName}</h1>
            </div>

            <button
              onClick={() => setViewMode("tiktok")}
              className="h-12 w-12 rounded-full bg-white/20 text-white flex items-center justify-center"
            >
              <PlayCircle size={26} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un chemin..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-5 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-black">Derniers chemins</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {paths.slice(0, 5).map((path) => (
                <button
                  key={path.id}
                  onClick={() => handleOpenPath(path)}
                  className="relative min-w-[260px] h-[200px] overflow-hidden rounded-[24px] text-left"
                >
                  <img
                    src={path.thumbnail}
                    alt={path.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

                  <div className="absolute left-4 right-4 top-4 flex justify-end">
                    {path.isOfficial && (
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#FEBD00]">
                        Officiel
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-base font-black leading-5">{path.title}</h3>
                    <p className="mt-1 text-xs text-white/90">Par {path.creator}</p>
                    <p className="mt-1 text-xs text-white/80">{path.duration}</p>
                  </div>

                  <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-[#FEBD00] flex items-center justify-center">
                    <Play size={16} className="text-white fill-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 px-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-black">Tous les chemins</h2>

              <button className="h-9 w-9 rounded-full bg-yellow-50 flex items-center justify-center text-[#FEBD00]">
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {paths.map((path) => {
                const isFavorite = favorites.includes(path.id);

                return (
                  <div
                    key={path.id}
                    className="flex items-center rounded-[20px] bg-[#f8f8f8] p-3"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={path.thumbnail}
                        alt={path.title}
                        className="h-full w-full object-cover"
                      />

                      {path.isOfficial && (
                        <div className="absolute right-2 top-2 rounded-full bg-[#FEBD00] px-2 py-1 text-[10px] font-bold text-white">
                          OFF
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-black text-slate-900 leading-5">
                        {path.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">Par {path.creator}</p>

                      {path.establishment ? (
                        <p className="mt-1 text-xs font-medium text-[#FEBD00]">
                          {path.establishment}
                        </p>
                      ) : null}

                      <p className="mt-1 text-xs text-slate-400">{path.duration}</p>
                    </div>

                    <div className="ml-2 flex flex-col items-center gap-3">
                      <button onClick={() => handleToggleFavorite(path.id)}>
                        <Heart
                          size={22}
                          className={
                            isFavorite
                              ? "fill-red-500 text-red-500"
                              : "text-gray-300"
                          }
                        />
                      </button>

                      <button onClick={() => handleShare(path)}>
                        <Share2 size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={goToAjouter}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md"
            >
              <PlusCircle size={18} />
              Ajouter un chemin
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}

export default Accueil;
