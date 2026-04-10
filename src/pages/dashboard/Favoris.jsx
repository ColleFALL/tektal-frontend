
// function Favoris() {
//   return <div>Favoris</div>
// }

// export default Favoris


import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Play, Share2 } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

const favoris = [
  {
    id: 1,
    titre: "Vers Bakeli Principal",
    auteur: "Admin Bakeli",
    duree: "35 sec",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    officiel: true,
  },
  {
    id: 2,
    titre: "Trouver la salle design",
    auteur: "Fatou",
    duree: "28 sec",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    officiel: false,
  },
];

export default function Favoris() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-black"
          >
            <ArrowLeft size={18} />
            Retour
          </button>

          <h1 className="text-3xl font-black text-white">Mes favoris</h1>
          <p className="mt-2 text-sm text-white/90">
            Les chemins que tu veux retrouver rapidement
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
          {favoris.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
                <Heart size={42} className="text-[#FEBD00]" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                Aucun favori
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Ajoute des chemins a tes favoris pour les retrouver ici.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favoris.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] bg-[#F8F8F8] p-3 border border-gray-200"
                >
                  <div className="flex gap-3">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.titre}
                        className="h-full w-full object-cover"
                      />

                      {item.officiel ? (
                        <div className="absolute top-2 right-2 rounded-full bg-[#FEBD00] px-2 py-1 text-[10px] font-bold text-white">
                          OFF
                        </div>
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-black text-slate-900 leading-5">
                        {item.titre}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Par {item.auteur}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">{item.duree}</p>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => navigate("/video-player")}
                          className="flex-1 rounded-full bg-[#FEBD00] py-3 text-sm font-bold text-white"
                        >
                          Ouvrir
                        </button>

                        <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                          <Play size={16} className="text-slate-700" />
                        </button>

                        <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                          <Share2 size={16} className="text-slate-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
