
// function Favoris() {
//   return <div>Favoris</div>
// }

// export default Favoris


import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Play, Share2 } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

const favoris = [
  {
    id: 1,
    titre: "Vers Bakeli Principal",
    auteur: "Admin Bakeli",
    duree: "35 sec",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    officiel: true,
  },
  {
    id: 2,
    titre: "Trouver la salle design",
    auteur: "Fatou",
    duree: "28 sec",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    officiel: false,
  },
];

export default function Favoris() {
  const navigate = useNavigate();

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

          <h1 className="text-3xl font-black text-white">Mes favoris</h1>
          <p className="mt-2 text-sm text-white/90">
            Les chemins que tu veux retrouver rapidement
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
          {favoris.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
                <Heart size={42} className="text-[#FEBD00]" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                Aucun favori
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Ajoute des chemins a tes favoris pour les retrouver ici.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favoris.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] bg-[#F8F8F8] p-3 border border-gray-200"
                >
                  <div className="flex gap-3">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.titre}
                        className="h-full w-full object-cover"
                      />

                      {item.officiel ? (
                        <div className="absolute top-2 right-2 rounded-full bg-[#FEBD00] px-2 py-1 text-[10px] font-bold text-white">
                          OFF
                        </div>
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-black text-slate-900 leading-5">
                        {item.titre}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Par {item.auteur}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">{item.duree}</p>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => navigate("/video-player")}
                          className="flex-1 rounded-full bg-[#FEBD00] py-3 text-sm font-bold text-white"
                        >
                          Ouvrir
                        </button>

                        <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                          <Play size={16} className="text-slate-700" />
                        </button>

                        <button className="h-11 w-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                          <Share2 size={16} className="text-slate-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Heart,
//   Play,
//   Share2,
//   RefreshCw,
// } from "lucide-react";
// import axios from "axios";
// import BottomNavigation from "../../components/BottomNavigation";

// const API = "https://tektal-backend.onrender.com/api";

// export default function Favoris() {
//   const navigate = useNavigate();

//   const [favoris, setFavoris] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ======================
//   // FETCH FAVORIS
//   // ======================
//   const fetchFavoris = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("access");

//       if (!token) {
//         setError("Utilisateur non connecté.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(`${API}/users/me/favorites/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const raw =
//         Array.isArray(res.data)
//           ? res.data
//           : Array.isArray(res.data?.results)
//           ? res.data.results
//           : Array.isArray(res.data?.data)
//           ? res.data.data
//           : [];

//       // 🔥 NORMALISATION SAFE
//       const mapped = raw.map((item) => item?.path || item);

//       // 🔥 SUPPRESSION DOUBLONS
//       const unique = Array.from(
//         new Map(mapped.map((p) => [p.id, p])).values()
//       );

//       setFavoris(unique);
//     } catch (err) {
//       console.log(err);
//       setError("Impossible de charger les favoris.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFavoris();
//   }, []);

//   // ======================
//   // REMOVE FAVORI
//   // ======================
//   const handleToggleFavorite = async (id) => {
//     try {
//       const token = localStorage.getItem("access");

//       await axios.delete(`${API}/paths/${id}/favorite/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setFavoris((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       alert("Erreur suppression favori");
//     }
//   };

//   // ======================
//   // SHARE
//   // ======================
//   const handleShare = async (item) => {
//     const url = `https://tektal.app/path/${item.share_token || item.id}`;

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: item.title,
//           url,
//         });
//         return;
//       } catch {}
//     }

//     navigator.clipboard.writeText(url);
//     alert("Lien copié");
//   };

//   // ======================
//   // OPEN VIDEO
//   // ======================
//   const openVideo = (item) => {
//     if (!item) return;

//     navigate("/video-player", {
//       state: {
//         path: item,
//       },
//     });
//   };

//   // ======================
//   // UI EMPTY
//   // ======================
//   const Empty = () => (
//     <div className="flex h-full flex-col items-center justify-center text-center px-6">
//       <Heart size={50} className="text-[#FEBD00]" />
//       <h2 className="mt-4 text-xl font-bold">Aucun favori</h2>
//       <p className="text-gray-500 text-sm mt-2">
//         Ajoute des chemins pour les retrouver ici
//       </p>
//     </div>
//   );

//   // ======================
//   // LOADING
//   // ======================
//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <RefreshCw className="animate-spin text-[#FEBD00]" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center">
//       <div className="w-full max-w-[450px] bg-white flex flex-col min-h-screen">

//         {/* HEADER */}
//         <div className="bg-[#FEBD00] px-5 pt-10 pb-6 rounded-b-3xl">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-black text-sm font-medium"
//           >
//             <ArrowLeft size={18} />
//             Retour
//           </button>

//           <div className="flex justify-between items-center mt-4">
//             <div>
//               <h1 className="text-white text-2xl font-bold">
//                 Mes favoris
//               </h1>
//               <p className="text-white/90 text-sm">
//                 Tes chemins sauvegardés
//               </p>
//             </div>

//             <button onClick={fetchFavoris}>
//               <RefreshCw size={18} className="text-white" />
//             </button>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="flex-1 overflow-y-auto p-4 pb-28">
//           {error ? (
//             <div className="text-center text-red-500">{error}</div>
//           ) : favoris.length === 0 ? (
//             <Empty />
//           ) : (
//             <div className="space-y-4">
//               {favoris.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex gap-3 bg-gray-50 p-3 rounded-2xl"
//                 >
//                   {/* MEDIA */}
//                   <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200">
//                     {item.video_url ? (
//                       <video
//                         src={item.video_url}
//                         className="w-full h-full object-cover"
//                         muted
//                       />
//                     ) : (
//                       <img
//                         src={
//                           item.thumbnail ||
//                           "https://via.placeholder.com/200"
//                         }
//                         className="w-full h-full object-cover"
//                       />
//                     )}
//                   </div>

//                   {/* INFO */}
//                   <div className="flex-1">
//                     <h3 className="font-bold text-sm">
//                       {item.title || "Sans titre"}
//                     </h3>

//                     <p className="text-xs text-gray-500">
//                       {item.user?.name || "Utilisateur"}
//                     </p>

//                     <div className="flex gap-2 mt-3">
//                       <button
//                         onClick={() => openVideo(item)}
//                         className="bg-[#FEBD00] text-white px-3 py-1 rounded-full text-xs"
//                       >
//                         Ouvrir
//                       </button>

//                       <button
//                         onClick={() => handleToggleFavorite(item.id)}
//                       >
//                         <Heart size={18} className="text-red-500" />
//                       </button>

//                       <button onClick={() => handleShare(item)}>
//                         <Share2 size={18} />
//                       </button>

//                       <button onClick={() => openVideo(item)}>
//                         <Play size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <BottomNavigation />
//       </div>
//     </div>
//   );
// }



