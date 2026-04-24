import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2 } from "lucide-react"; // ✅ Share2 ajouté
import BottomNavigation from "../../components/BottomNavigation";
import ShareModal from "../../components/ShareModal"; // ✅

export default function VideoPlayer() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = useMemo(() => location.state?.path, [location.state]);
  const [showShare, setShowShare] = useState(false); // ✅

  const videoUrl = path?.video_url || path?.videoUri;

  if (!videoUrl) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white flex-col gap-4">
        <p>Vidéo introuvable</p>
        <button onClick={() => navigate(-1)} className="bg-[#FEBD00] text-white px-6 py-3 rounded-full font-bold">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black flex justify-center font-sans">
      <div className="relative w-full max-w-[450px] h-full">

        <video src={videoUrl} className="w-full h-full object-cover" controls autoPlay playsInline />

        {/* TOP BAR */}
        <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft />
          </button>
          {/* ✅ Bouton partage */}
          <button onClick={() => setShowShare(true)} className="text-white">
            <Share2 size={22} />
          </button>
        </div>

        {/* INFO BOTTOM */}
        <div className="absolute bottom-20 p-4 text-white">
          <h1 className="text-xl font-bold">{path.title}</h1>
          <p className="text-sm opacity-80">{path.user?.name || path.creator}</p>
          <p className="text-xs text-[#FEBD00] mt-1">{path.duration}</p>
        </div>

        <BottomNavigation />
      </div>

      {/* ✅ ShareModal */}
      {showShare && <ShareModal path={path} onClose={() => setShowShare(false)} />}
    </div>
  );
}