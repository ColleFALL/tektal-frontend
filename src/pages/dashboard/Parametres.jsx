// function Parametres() {
//   return <div>Accueil 🚀</div>
// }

// export default Parametres


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Moon,
  Shield,
  Globe,
  ChevronRight,
  LogOut,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

export default function Parametres() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [modeSombre, setModeSombre] = useState(false);
  const [partageProfil, setPartageProfil] = useState(true);

  const ligneSwitch = (
    icon,
    titre,
    description,
    checked,
    setChecked
  ) => (
    <div className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-[#FEBD00]">{icon}</div>
          <div>
            <p className="text-sm font-bold text-slate-900">{titre}</p>
            <p className="mt-1 text-xs leading-6 text-slate-500">
              {description}
            </p>
          </div>
        </div>

        <button
          onClick={() => setChecked(!checked)}
          className={`relative h-7 w-12 rounded-full transition ${
            checked ? "bg-[#FEBD00]" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
              checked ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );

  const ligneAction = (icon, titre, description, onClick, danger = false) => (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[24px] border px-4 py-4 text-left ${
        danger
          ? "border-red-100 bg-red-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={danger ? "text-red-500" : "text-[#FEBD00]"}>{icon}</div>
        <div>
          <p
            className={`text-sm font-bold ${
              danger ? "text-red-500" : "text-slate-900"
            }`}
          >
            {titre}
          </p>
          <p className="mt-1 text-xs leading-6 text-slate-500">{description}</p>
        </div>
      </div>

      <ChevronRight
        size={18}
        className={danger ? "text-red-300" : "text-slate-400"}
      />
    </button>
  );

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

          <h1 className="text-3xl font-black text-white">Parametres</h1>
          <p className="mt-2 text-sm text-white/90">
            Gere ton experience et tes preferences
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
          <div className="space-y-4">
            {ligneSwitch(
              <Bell size={18} />,
              "Notifications",
              "Recevoir des alertes sur les nouveaux chemins et activites.",
              notifications,
              setNotifications
            )}

            {ligneSwitch(
              <Moon size={18} />,
              "Mode sombre",
              "Activer une interface plus sombre pour la navigation.",
              modeSombre,
              setModeSombre
            )}

            {ligneSwitch(
              <Shield size={18} />,
              "Partage du profil",
              "Autoriser l'affichage de certaines informations publiques.",
              partageProfil,
              setPartageProfil
            )}

            {ligneAction(
              <Globe size={18} />,
              "Langue",
              "Changer la langue de l'application.",
              () => alert("Choix de langue a venir")
            )}

            {ligneAction(
              <Shield size={18} />,
              "Confidentialite",
              "Consulter et gerer les parametres de confidentialite.",
              () => alert("Page confidentialite a venir")
            )}

            {ligneAction(
              <LogOut size={18} />,
              "Se deconnecter",
              "Quitter la session active et revenir a l'ecran d'accueil.",
              () => navigate("/"),
              true
            )}
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
