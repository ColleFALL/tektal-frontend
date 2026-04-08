// function  MesChemins() {
//   return <div>Chemin</div>
// }

// export default MesChemins



import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pencil, Trash2, PlusCircle } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

const mesChemins = [
  {
    id: 1,
    titre: "De l'entree au bloc B",
    duree: "45 sec",
    statut: "Publie",
    type: "Communautaire",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    titre: "Vers la salle reseau",
    duree: "30 sec",
    statut: "Brouillon",
    type: "Officiel",
    image:
      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=900&q=80",
  },
];

export default function MesChemins() {
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

          <h1 className="text-3xl font-black text-white">Mes chemins</h1>
          <p className="mt-2 text-sm text-white/90">
            Gere les parcours que tu as crees
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
          {mesChemins.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
                <PlusCircle size={42} className="text-[#FEBD00]" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                Aucun chemin cree
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Commence par enregistrer ton premier parcours.
              </p>

              <button
                onClick={() => navigate("/ajouter")}
                className="mt-8 rounded-full bg-[#FEBD00] px-6 py-4 text-white font-bold shadow-lg"
              >
                Ajouter un chemin
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {mesChemins.map((item) => (
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
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-bold text-white ${
                            item.statut === "Publie"
                              ? "bg-green-500"
                              : "bg-slate-400"
                          }`}
                        >
                          {item.statut}
                        </span>

                        <span className="rounded-full bg-[#FEBD00] px-2 py-1 text-[10px] font-bold text-white">
                          {item.type}
                        </span>
                      </div>

                      <h3 className="mt-3 text-sm font-black text-slate-900 leading-5">
                        {item.titre}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">{item.duree}</p>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => navigate("/video-player")}
                          className="flex-1 rounded-full bg-[#FEBD00] py-3 text-sm font-bold text-white"
                        >
                          Ouvrir
                        </button>

                        <button
                          onClick={() => navigate("/step-creation")}
                          className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                        >
                          <Pencil size={16} className="text-slate-700" />
                        </button>

                        <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                          <Trash2 size={16} className="text-red-500" />
                        </button>

                        <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                          <Play size={16} className="text-slate-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => navigate("/ajouter")}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md"
              >
                <PlusCircle size={18} />
                Ajouter un nouveau chemin
              </button>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
