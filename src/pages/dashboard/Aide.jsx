import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, ChevronDown, ChevronUp } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

const FAQ = [
  {
    id: "1",
    q: "Comment créer un chemin ?",
    a: "Allez dans Ajouter, renseignez départ/destination, enregistrez la vidéo puis publiez.",
  },
  {
    id: "2",
    q: "Comment ajouter un favori ?",
    a: "Depuis Accueil ou un chemin, appuyez sur l'icône cœur pour ajouter/retirer un favori.",
  },
  {
    id: "3",
    q: "Pourquoi ma vidéo ne se publie pas ?",
    a: "Vérifiez la connexion internet, les permissions (caméra/micro/localisation) et réessayez.",
  },
  {
    id: "4",
    q: "Comment modifier mon profil ?",
    a: "Depuis Profil > Modifier le profil, changez vos infos puis enregistrez.",
  },
];

export default function Aide() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const openMail = () => {
    const email = "support@tektal.com";
    const subject = "Support TEKTAL";
    const body = "Bonjour, j'ai besoin d'aide concernant...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const openWhatsApp = () => {
    const phone = "221771234567";
    const text = "Bonjour, j'ai besoin d'aide sur TEKTAL.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-gray-100 shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-4 px-5 pt-14 pb-6 bg-gray-100">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-black text-gray-900">Aide</h1>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">

          {/* FAQ */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Questions fréquentes</h2>
            {FAQ.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="border-t border-gray-100 py-3">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="text-sm font-bold text-gray-800 flex-1">{item.q}</span>
                    {isOpen
                      ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0" />
                      : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Contacter le support</h2>

            <button
              onClick={openMail}
              className="flex w-full items-center justify-center gap-2 bg-[#FEBD00] text-white font-bold py-4 rounded-2xl mb-3 transition active:scale-[0.98]"
            >
              <Mail size={18} />
              Envoyer un email
            </button>

            <button
              onClick={openWhatsApp}
              className="flex w-full items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-2xl transition active:scale-[0.98]"
            >
              {/* Icône WhatsApp SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contacter sur WhatsApp
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">TEKTAL • Aide</p>

        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}