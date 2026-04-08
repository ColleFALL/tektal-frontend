import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { House, Search, PlusCircle, Heart, User } from "lucide-react";

const items = [
  { label: "Accueil", path: "/home", icon: House },
  { label: "Recherche", path: "/recherche", icon: Search },
  { label: "Ajouter", path: "/ajouter", icon: PlusCircle },
  { label: "Favoris", path: "/favoris", icon: Heart },
  { label: "Profil", path: "/profil", icon: User },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center ${
                active ? "text-[#FEBD00]" : "text-gray-400"
              }`}
            >
              <Icon size={20} />
              <span className={`mt-1 text-[11px] ${active ? "font-bold" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
