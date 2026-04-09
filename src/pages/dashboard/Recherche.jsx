import { useState } from "react";
import { Search, Play, ShieldCheck, Heart, Clock, Video } from "lucide-react";

export default function Recherche() {
  const [activeTab, setActiveTab] = useState("tous");
  const [searchQuery, setSearchQuery] = useState("");

  const routesData = [
    { id: 1, title: "Stade → Todo ameublement", auteur: "Par Utilisateur", duree: "15 sec", type: "Vidéo", officiel: true, favori: false },
    { id: 2, title: "Léopold → Todo ameublement", auteur: "Par Utilisateur", duree: "17 min", type: "Vidéo", officiel: true, favori: false },
    { id: 3, title: "Brt → Todo ameublement", auteur: "Par Utilisateur", duree: "16 sec", type: "Vidéo", officiel: false, favori: true },
    { id: 4, title: "Magasin → Todo ameublement", auteur: "Par Utilisateur", duree: "20 sec", type: "Vidéo", officiel: false, favori: false },
  ];

  // --- LOGIQUE DE FILTRAGE MISE À JOUR ---
  const filteredRoutes = routesData.filter((route) => {
    // On transforme tout en minuscules pour que "Todo" corresponde à "TODO" ou "todo"
    const matchesSearch = route.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "officiels") return matchesSearch && route.officiel;
    if (activeTab === "favoris") return matchesSearch && route.favori;
    return matchesSearch;
  });

  return (
    <div className="bg-white h-screen w-full max-w-md mx-auto flex flex-col overflow-hidden font-sans">
      
      <div className="p-5 pb-2 flex-none">
        <h1 className="text-2xl font-extrabold text-black mb-1">Rechercher</h1>
        <p className="text-xs text-gray-500 mb-5 font-medium">{filteredRoutes.length} chemins disponibles</p>

        {/* Barre de recherche interactive */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            // La mise à jour de l'état déclenche instantanément le filter
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Chercher un chemin (ex: Todo)..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#FEED00] outline-none transition-all"
          />
        </div>

        {/* Filtres par onglets */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab("tous")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${
              activeTab === "tous" ? "bg-[#FEED00] text-white" : "bg-white text-gray-400 border border-gray-100"
            }`}
          >
            Tous ({routesData.length})
          </button>

          <button 
            onClick={() => setActiveTab("officiels")}
            className={`px-4 py-2.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "officiels" ? "bg-[#FEED00] text-white" : "bg-white text-gray-400 border border-gray-100"
            }`}
          >
            <ShieldCheck size={14} className={activeTab === "officiels" ? "text-white" : "text-gray-300"} />
            Officiels ({routesData.filter(r => r.officiel).length})
          </button>

          <button 
            onClick={() => setActiveTab("favoris")}
            className={`px-4 py-2.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "favoris" ? "bg-[#FEED00] text-white" : "bg-white text-gray-400 border border-gray-100"
            }`}
          >
            <Heart size={14} className={activeTab === "favoris" ? "text-white" : "text-gray-300"} />
            Favoris ({routesData.filter(r => r.favori).length})
          </button>
        </div>
      </div>

      {/* Liste des résultats (Scroll masqué) */}
      <div className="flex-1 overflow-y-auto px-5 pb-10 no-scrollbar">
        <div className="flex flex-col gap-4">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <div key={route.id} className="bg-white /rounded-[24px] p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#FEED00] transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-full bg-[#FEED00] flex items-center justify-center /flex-shrink-0">
                    <Play size={16} fill="white" color="white" className="ml-0.5" />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-0.5">
                      <ShieldCheck size={15} className="text-[#FEED00]" />
                      <span className="font-bold text-gray-900 text-[14px] leading-tight">{route.title}</span>
                    </div>
                    <span className="text-gray-400 text-[12px] font-medium mb-1.5">{route.auteur}</span>
                    <div className="flex gap-4 text-gray-400 text-[11px] font-bold">
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {route.duree}</span>
                      <span className="flex items-center gap-1.5"><Video size={13} /> {route.type}</span>
                    </div>
                  </div>
                </div>
                <Heart size={22} className={route.favori ? "text-[#FEED00] fill-[#FEED00]" : "text-gray-200"} />
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-400 text-sm">
              Aucun résultat pour "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}