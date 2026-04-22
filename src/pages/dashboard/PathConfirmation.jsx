
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Home,
  PlusCircle,
  Share2,
  PlayCircle,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

export default function PathConfirmation() {
  const navigate = useNavigate();

  const handleShare = async () => {
    const shareUrl = "https://tektal.app/path/demo-123";
    const shareText = `Mon chemin est pret sur Tektal : ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chemin cree",
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
  // return
  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="flex-1 px-6 py-10 flex flex-col items-center justify-center text-center pb-28">
          <div className="h-28 w-28 rounded-full bg-yellow-100 flex items-center justify-center">
            <CheckCircle2 size={54} className="text-[#FEBD00]" />
          </div>

          <h1 className="mt-8 text-3xl font-black text-slate-900">
            Chemin cree avec succes
          </h1>

          <p className="mt-4 max-w-[290px] text-sm leading-7 text-slate-500">
            Ton chemin est maintenant pret. Tu peux le consulter, le partager ou
            en creer un nouveau.
          </p>

          <div className="mt-8 w-full space-y-3">
            <button
              onClick={() => navigate("/video-player")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md"
            >
              <PlayCircle size={18} />
              Voir le chemin
            </button>

            <button
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700"
            >
              <Share2 size={18} />
              Partager
            </button>

            <button
              onClick={() => navigate("/ajouter")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700"
            >
              <PlusCircle size={18} />
              Creer un autre chemin
            </button>

            <button
              onClick={() => navigate("/home")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-4 text-sm font-bold text-white"
            >
              <Home size={18} />
              Retour a l'accueil
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
