import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";

export default function Favoris() {
  return (
    <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-50">
        <Link to="/recherche" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="font-bold text-lg">Mes Favoris</h1>
        {/* Badge compteur #FEED00 */}
        <div className="w-10 h-10 rounded-full bg-[#FEED00] flex items-center justify-center text-white font-bold text-sm">0</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        {/* Icône vide avec fond léger #FEED00 */}
        <div className="w-32 h-32 rounded-full bg-[#FEED00]/10 flex items-center justify-center mb-8">
          <Heart size={56} color="#FEED00" strokeWidth={1.5} />
        </div>
        <h2 className="font-bold text-xl mb-2">Aucun favori</h2>
        <p className="text-gray-400 text-sm mb-10">Les chemins que vous sauvegardez apparaîtront ici.</p>
        
        {/* Bouton action #FEED00 */}
        <Link to="/recherche" className="w-full bg-[#FEED00] text-white font-bold text-sm py-4 rounded-2xl shadow-lg active:scale-95 transition-transform text-center">
          Explorer les chemins
        </Link>
      </div>
    </div>
  );
}