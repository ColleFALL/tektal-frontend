import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { User, ChevronRight, LogOut, Settings, Pencil, Heart, Map, HelpCircle } from "lucide-react";
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
            <span className="text-3xl font-black text-[#FEBD00]">
              {user.nom.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-black text-white leading-tight">{user.nom}</h1>
          <p className="text-white/95 font-bold text-base mt-1">{user.campus}</p>
          <p className="text-white/80 text-base mt-1">{user.email}</p>
        </div>

        {/* Liste des options */}
        <div className="flex-1 px-6 py-4 overflow-hidden pb-20">
          <div className="space-y-2">
            <OptionItem icon={<Map size={26} />} title="Mes chemins" onClick={() => navigate("/mes-chemins")} />
            <OptionItem icon={<Heart size={26} />} title="Favoris" onClick={() => navigate("/favoris")} />
            <OptionItem icon={<Pencil size={26} />} title="Modifier le profil" onClick={() => navigate("/edit-profil")} />
            
            <div className="my-6 border-t border-gray-100" />
            
            <OptionItem icon={<Settings size={26} />} title="Parametres" gray onClick={() => navigate("/parametres")} />
            <OptionItem icon={<HelpCircle size={26} />} title="Aide" gray onClick={() => navigate("/aide")} />
            
            <button 
              onClick={() => { localStorage.removeItem("access"); navigate("/"); }}
              className="flex w-full items-center gap-5 px-3 py-3 text-red-500 font-bold text-xl hover:bg-red-50 rounded-2xl transition"
            >
              <LogOut size={26} className="stroke-red-500" />
              Se deconnecter
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}

function OptionItem({ icon, title, onClick, gray }) {
  const strokeColor = gray ? "#9CA3AF" : "#FEBD00"; 
  const textColor = gray ? "text-gray-500" : "text-gray-800";

  const coloredIcon = React.cloneElement(icon, {
    className: `stroke-[${strokeColor}] stroke-[2.5] ${icon.props.className || ""}`,
  });

  return (
    <button onClick={onClick} className="flex w-full items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-2xl transition group">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-6 h-6">
          {coloredIcon}
        </div>
        <span className={`font-bold text-xl ${textColor}`}>{title}</span>
      </div>
      <ChevronRight size={24} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
    </button>
  );
}