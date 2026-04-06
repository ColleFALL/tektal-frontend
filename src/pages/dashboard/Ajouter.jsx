import { Search, Home, Bookmark, User, Plus, Heart } from "lucide-react";
import { useState } from "react";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Tous (0)" },
    { id: "official", label: "Officiels (0)", heart: true },
    { id: "favorites", label: "Favoris (0)", heart: true },
  ];

  return (
    <div className="flex flex-col h-screen w-full max-w-sm mx-auto bg-white font-sans">
      {/* Header */}
      <div className="px-5 pt-12 pb-0 bg-white">
        <h1 className="text-xl font-bold text-gray-900">Rechercher</h1>
        <p className="text-[11px] text-gray-400 mt-0.5">0 chemin disponible</p>
      </div>

      {/* Search Bar */}
      <div className="mx-5 mt-3 bg-gray-100 rounded-xl flex items-center gap-2 px-3.5 py-2.5">
        <Search size={14} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher un chemin, lieu, créateur..."
          className="bg-transparent text-xs text-gray-500 placeholder-gray-400 outline-none flex-1 font-sans"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-5 mt-3">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
              activeFilter === f.id
                ? "bg-[#FEBD00] text-white border-[#FEBD00]"
                : "bg-white text-gray-500 border-gray-200 hover:border-[#FEBD00] hover:text-[#FEBD00]"
            }`}
          >
            {f.heart && (
              <Heart
                size={11}
                className={activeFilter === f.id ? "text-white fill-white" : "text-[#FEBD00] fill-[#FEBD00]"}
              />
            )}
            {f.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4">
        <div className="w-[88px] h-[88px] rounded-full bg-yellow-50 flex items-center justify-center mb-5">
          <Search size={38} className="text-[#FEBD00]" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-bold text-gray-900 text-center mb-2">
          Rechercher un chemin
        </h2>
        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          Tapez pour rechercher un chemin, lieu ou créateur
        </p>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="search" />
    </div>
  );
}

function BottomNav({ active }) {
  const items = [
    { id: "home", icon: Home, label: "Accueil" },
    { id: "search", icon: Search, label: "Recherche" },
    { id: "add", icon: null, label: "Ajouter" },
    { id: "favorites", icon: Bookmark, label: "Favoris" },
    { id: "profile", icon: User, label: "Profil" },
  ];

  return (
    <div className="bg-white border-t border-gray-100 flex justify-around items-end px-2 pt-2 pb-5">
      {items.map((item) =>
        item.id === "add" ? (
          <button key="add" className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full bg-[#FEBD00] flex items-center justify-center shadow-md shadow-yellow-300/50 mb-0.5">
              <Plus size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[9px] text-gray-300 font-medium">{item.label}</span>
          </button>
        ) : (
          <button key={item.id} className="flex flex-col items-center gap-0.5">
            <item.icon
              size={20}
              className={active === item.id ? "text-[#FEBD00]" : "text-gray-300"}
              strokeWidth={active === item.id ? 2.5 : 1.8}
            />
            <span className={`text-[9px] font-medium ${active === item.id ? "text-[#FEBD00]" : "text-gray-300"}`}>
              {item.label}
            </span>
          </button>
        )
      )}
    </div>
  );
}
