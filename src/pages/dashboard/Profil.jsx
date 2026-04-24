import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { ChevronRight, LogOut, Settings, Pencil, Heart, Map, HelpCircle } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

export default function Profil() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nom: "...", email: "...", campus: "..." });

  useEffect(() => {
    API.get("/auth/users/me/").then(res => setUser({
      nom: res.data.name,
      email: res.data.email,
      campus: res.data.establishment_name || res.data.campus || "Non défini"
    })).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Jaune */}
        <div className="bg-[#FEBD00] px-6 pt-8 pb-6 flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-5 border-4 border-white/50">
            <span className="text-2xl font-black text-[#FEBD00]">
              {user.nom.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <h1 className="text-xl font-black text-white leading-tight">{user.nom}</h1>
          <p className="text-white/95 font-bold text-sm mt-1">{user.campus}</p>
          <p className="text-white/80 text-sm mt-1">{user.email}</p>
        </div>

        {/* Liste des options dans une carte blanche */}
        <div className="flex-1 px-4 py-4 overflow-hidden pb-20 bg-gray-100">
          <div className="bg-white rounded-3xl px-2 py-2 shadow-sm">
            
            <OptionItem icon={<Map size={24} stroke="#FEBD00" strokeWidth={2} />} title="Mes chemins" onClick={() => navigate("/mes-chemins")} />
            <OptionItem icon={<Heart size={24} stroke="#FEBD00" strokeWidth={2} />} title="Favoris" onClick={() => navigate("/favoris")} />
            <OptionItem icon={<Pencil size={24} stroke="#FEBD00" strokeWidth={2} />} title="Modifier le profil" onClick={() => navigate("/edit-profil")} />
            
            <div className="mx-4 border-t border-gray-100" />
            
            <OptionItem icon={<Settings size={24} stroke="#9CA3AF" strokeWidth={2} />} title="Parametres" gray onClick={() => navigate("/parametres")} />
            <OptionItem icon={<HelpCircle size={24} stroke="#9CA3AF" strokeWidth={2} />} title="Aide" gray onClick={() => navigate("/aide")} />

            <div className="mx-4 border-t border-gray-100" />

            <button
              onClick={() => { localStorage.removeItem("access"); navigate("/"); }}
              className="flex w-full items-center gap-5 px-4 py-4 hover:bg-red-50 rounded-2xl transition"
            >
              <LogOut size={24} stroke="#ef4444" strokeWidth={2} />
              <span className="font-bold text-lg text-red-500">Deconnexion</span>
            </button>

          </div>

          <p className="text-center text-xs text-gray-400 mt-4">Version 1.0.0 (MVP)</p>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}

function OptionItem({ icon, title, onClick, gray }) {
  const textColor = gray ? "text-gray-500" : "text-gray-800";

  return (
    <button onClick={onClick} className="flex w-full items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-2xl transition group">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-6 h-6">
          {icon}
        </div>
        <span className={`font-bold text-lg ${textColor}`}>{title}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
    </button>
  );
}