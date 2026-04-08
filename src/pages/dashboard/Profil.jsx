// function Profil() {
//   return <div>Accueil 🚀</div>
// }

// export default Profil


import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Settings,
  LogOut,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

export default function Profil() {
  const navigate = useNavigate();

  const user = {
    nom: "Antah",
    email: "antalissa10@email.com",
    campus: "Bakeli",
    role: "Utilisateur",
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

          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-md">
              <User size={36} className="text-[#FEBD00]" />
            </div>

            <h1 className="mt-4 text-2xl font-black text-white">{user.nom}</h1>
            <p className="mt-1 text-sm text-white/90">{user.role}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
          <div className="space-y-4">
            <div className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#FEBD00]" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#FEBD00]" />
                <div>
                  <p className="text-xs text-slate-500">Campus</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.campus}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#FEBD00]" />
                <div>
                  <p className="text-xs text-slate-500">Statut</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/edit-profil")}
              className="flex w-full items-center gap-3 rounded-[24px] border border-gray-200 bg-white px-4 py-4 text-left"
            >
              <Pencil size={18} className="text-[#FEBD00]" />
              <span className="text-sm font-semibold text-slate-800">
                Modifier le profil
              </span>
            </button>

            <button
              onClick={() => navigate("/parametres")}
              className="flex w-full items-center gap-3 rounded-[24px] border border-gray-200 bg-white px-4 py-4 text-left"
            >
              <Settings size={18} className="text-[#FEBD00]" />
              <span className="text-sm font-semibold text-slate-800">
                Parametres
              </span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex w-full items-center gap-3 rounded-[24px] border border-red-100 bg-red-50 px-4 py-4 text-left"
            >
              <LogOut size={18} className="text-red-500" />
              <span className="text-sm font-semibold text-red-500">
                Se deconnecter
              </span>
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
