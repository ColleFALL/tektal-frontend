// function VideoPlayer() {
//   return <div>Videos </div>
// }

// export default VideoPlayer
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Map,
  Share2,
  List,
  Play,
  Pause,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

export default function VideoPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [playing, setPlaying] = useState(false);

  const path = useMemo(
    () =>
      location.state?.path || {
        id: 1,
        title: "Vers Bakeli Principal",
        creator: "Admin Bakeli",
        duration: "35 sec",
        thumbnail:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
        establishment: "Bakeli",
        isOfficial: true,
        description:
          "Suivez ce trajet visuel pour rejoindre rapidement le batiment administratif.",
      },
    [location.state]
  );

  const handleShare = async () => {
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

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-black shadow-2xl overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white"
              >
                <Heart
                  size={20}
                  className={isFavorite ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <button
                onClick={handleShare}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <img
            src={path.thumbnail}
            alt={path.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

          <button
            onClick={() => setPlaying(!playing)}
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FEBD00] text-white shadow-xl"
          >
            {playing ? <Pause size={30} /> : <Play size={30} className="fill-white" />}
          </button>

          <div className="absolute bottom-28 left-0 right-0 px-5">
            <div className="flex items-center gap-2">
              {path.isOfficial ? (
                <span className="rounded-full bg-[#FEBD00] px-3 py-1 text-[11px] font-bold text-white">
                  Officiel
                </span>
              ) : (
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
                  Communaute
                </span>
              )}

              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white">
                {path.duration}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight text-white">
              {path.title}
            </h1>

            <p className="mt-2 text-sm text-white/90">Par {path.creator}</p>

            {path.establishment ? (
              <p className="mt-1 text-sm text-[#FEBD00] font-semibold">
                {path.establishment}
              </p>
            ) : null}

            <p className="mt-4 text-sm leading-7 text-white/80">
              {path.description}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#111111] px-5 py-4 pb-24">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/step-creation")}
              className="flex items-center justify-center gap-2 rounded-full bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white"
            >
              <List size={18} />
              Voir les etapes
            </button>

            <button
              onClick={() => navigate("/recherche")}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm font-semibold text-white"
            >
              <Map size={18} />
              Voir la carte
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
