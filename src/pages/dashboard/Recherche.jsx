

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, SlidersHorizontal, Play, Heart } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

const cheminsData = [
  {
    id: 1,
    titre: "Vers Bakeli Principal",
    auteur: "Admin Bakeli",
    duree: "35 sec",
    type: "Officiel",
    campus: "Bakeli",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    titre: "Trouver la salle design",
    auteur: "Fatou",
    duree: "28 sec",
    type: "Communaute",
    campus: "Bakeli",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    titre: "Aller au bloc administratif",
    auteur: "Moussa",
    duree: "40 sec",
    type: "Officiel",
    campus: "Campus central",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    titre: "Vers la bibliotheque",
    auteur: "Awa",
    duree: "30 sec",
    type: "Communaute",
    campus: "Bakeli",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Recherche() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filtre, setFiltre] = useState("Tous");
  const [favoris, setFavoris] = useState([2]);

  const filtres = ["Tous", "Officiel", "Communaute"];

  const resultats = useMemo(() => {
    return cheminsData.filter((item) => {
      const matchTexte =
        item.titre.toLowerCase().includes(query.toLowerCase()) ||
        item.auteur.toLowerCase().includes(query.toLowerCase()) ||
        item.campus.toLowerCase().includes(query.toLowerCase());

      const matchFiltre = filtre === "Tous" ? true : item.type === filtre;

      return matchTexte && matchFiltre;
    });
  }, [query, filtre]);

  const toggleFavori = (id) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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

          <h1 className="text-3xl font-black text-white">Recherche</h1>
          <p className="mt-2 text-sm text-white/90">
            Trouve rapidement le chemin qui t'interesse
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Bakeli, bibliotheque, design..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#FEBD00]" />
              <p className="text-sm font-bold text-slate-800">Filtres</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {filtres.map((item) => {
                const actif = filtre === item;

                return (
                  <button
                    key={item}
                    onClick={() => setFiltre(item)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ${
                      actif
                        ? "bg-[#FEBD00] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-500">
              {resultats.length} resultat{resultats.length > 1 ? "s" : ""} trouve
              {resultats.length > 1 ? "s" : ""}
            </p>
          </div>

          {resultats.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center pt-16">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
                <Search size={42} className="text-[#FEBD00]" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                Aucun resultat
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500 max-w-[260px]">
                Essaie un autre mot-cle ou change le filtre pour voir plus de chemins.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {resultats.map((item) => {
                const estFavori = favoris.includes(item.id);

                return (
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

                        <div
                          className={`absolute top-2 right-2 rounded-full px-2 py-1 text-[10px] font-bold text-white ${
                            item.type === "Officiel" ? "bg-[#FEBD00]" : "bg-slate-500"
                          }`}
                        >
                          {item.type === "Officiel" ? "OFF" : "COM"}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-black text-slate-900 leading-5">
                          {item.titre}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Par {item.auteur}
                        </p>

                        <p className="mt-1 text-xs font-medium text-[#FEBD00]">
                          {item.campus}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">{item.duree}</p>

                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => navigate("/video-player")}
                            className="flex-1 rounded-full bg-[#FEBD00] py-3 text-sm font-bold text-white"
                          >
                            Ouvrir
                          </button>

                          <button
                            onClick={() => toggleFavori(item.id)}
                            className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                          >
                            <Heart
                              size={18}
                              className={
                                estFavori
                                  ? "fill-red-500 text-red-500"
                                  : "text-slate-500"
                              }
                            />
                          </button>

                          <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            <Play size={16} className="text-slate-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
