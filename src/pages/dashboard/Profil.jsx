import { useNavigate, Link } from "react-router-dom";
import { 
  Map, 
  Heart, 
  Settings, 
  CircleHelp, 
  LogOut, 
  ChevronRight, 
  SquarePen 
} from "lucide-react";

export default function Profil() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Map size={22} color="#FEED00" />, label: "mes chemins", target: "/recherche" },
    { icon: <Heart size={22} color="#FEED00" />, label: "favoris", target: "/favoris" },
    { icon: <SquarePen size={22} color="#FEED00" />, label: "modifier le profil", target: "/modifier-profil" },
    { icon: <Settings size={22} color="#6b7280" />, label: "paramètres", target: "/parametres", separate: true },
    { icon: <CircleHelp size={22} color="#6b7280" />, label: "aide", target: "/aide" },
  ];

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div className="bg-[#fff1f2] min-h-screen w-full max-w-md mx-auto flex flex-col relative font-sans">
      <div className="flex-1 pb-1 overflow-y-auto">
        
        {/* En-tête Jaune Profil - Couleur #FEED00 */}
        <div className="bg-[#FEED00] flex flex-col items-center pt-12 pb-12 text-white rounded-b-[30px] shadow-lg relative z-20">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#FEED00] font-extrabold text-3xl mb-4 shadow-sm">
            NO
          </div>
          <h1 className="font-bold text-xl tracking-wider">nogayendao543</h1>
          <p className="text-sm opacity-90 font-medium lowercase">bakeli dakar</p>
          <p className="text-sm opacity-80 mt-0.5">nogayendao543@gmail.com</p>
        </div>

        {/* Menu Options */}
        <div className="px-5 mt-8 z-10 flex flex-col items-center">
          <div className="bg-white w-full rounded-3xl shadow-md border border-gray-100 overflow-hidden">
            {menuItems.map((item, i) => (
              <div key={i}>
                {item.separate && <div className="border-t border-gray-50 mx-5"></div>}
                
                <Link 
                  to={item.target} 
                  className="flex items-center justify-between px-5 py-4 active:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="text-sm font-semibold text-gray-800 lowercase group-hover:text-[#FEED00] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </Link>
              </div>
            ))}
            
            <div className="border-t border-gray-50 mx-5"></div>
            
            {/* Bouton Déconnexion */}
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center justify-between px-5 py-5 active:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <LogOut size={22} className="text-red-500" />
                <span className="text-sm font-bold text-red-500 lowercase">déconnexion</span>
              </div>
            </button>
          </div>

          {/* AJOUT : Version 1.0.0 (M.V.P) */}
          <p className="text-center text-[10px] text-gray-300 mt-8 mb-6 tracking-[0.2em] uppercase font-bold">
            version 1.0.0 (m.v.p)
          </p>
        </div>
      </div>
    </div>
  );
}