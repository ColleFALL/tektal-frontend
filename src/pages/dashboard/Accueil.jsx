import { Sun, MapIcon, PlusCircle, Home, Search, Bookmark, User, Plus } from "lucide-react";

export default function HomeScreen() {
  return (
    <div className="flex flex-col h-screen w-full max-w-sm mx-auto bg-white font-sans">
      {/* Header */}
      <div className="bg-[#FEBD00] px-5 pt-10 pb-4">
        <div className="flex items-center gap-1 text-white text-sm font-medium">
          Bonjour <Sun size={14} className="opacity-90" />
        </div>
        <div className="text-white text-2xl font-bold tracking-wide mt-0.5">AIDB</div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-yellow-50 flex items-center justify-center mb-6">
          <MapIcon size={48} className="text-[#FEBD00]" strokeWidth={1.5} />
        </div>

        <h2 className="text-lg font-bold text-gray-900 text-center leading-snug mb-3">
          Aucun chemin pour le moment
        </h2>
        <p className="text-xs text-gray-400 text-center leading-relaxed mb-8 max-w-[200px]">
          Explorez de nouveaux horizons en créant votre premier chemin d'apprentissage
        </p>

        <button className="flex items-center gap-2 bg-[#FEBD00] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-lg shadow-yellow-300/50 active:scale-95 transition-transform">
          <PlusCircle size={16} />
          Créer un chemin
        </button>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="home" />
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
