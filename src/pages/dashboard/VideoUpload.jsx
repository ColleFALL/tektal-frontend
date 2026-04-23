import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Upload, Video,
  CheckCircle2, ImagePlus,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import { cloudinaryService } from "../../services/cloudinaryService";

export default function VideoUpload() {
  const navigate     = useNavigate();
  const location     = useLocation();
  const fileInputRef = useRef(null);

  const { departure, destination, pathType, establishmentId } = location.state || {};

  const [videoFile, setVideoFile]   = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [duration, setDuration]     = useState(0);

  const [uploading, setUploading]     = useState(false);
  const [progress, setProgress]       = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError]             = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Veuillez sélectionner un fichier vidéo");
      return;
    }

    // ✅ Vérification taille max 100MB
    const MAX_MB = 100;
    if (file.size > MAX_MB * 1024 * 1024) {
      alert(`Vidéo trop lourde ! Maximum ${MAX_MB}MB. Votre fichier : ${(file.size / 1024 / 1024).toFixed(1)}MB`);
      return;
    }

    setVideoFile(file);
    setUploadedUrl("");
    setProgress(0);
    setError("");

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // ✅ Récupérer la durée
    const video = document.createElement("video");
    video.src = url;
    video.onloadedmetadata = () => setDuration(Math.round(video.duration));
  };

  const handleContinue = async () => {
    if (!videoFile) {
      alert("Veuillez importer une vidéo avant de continuer");
      return;
    }

    // ✅ Déjà uploadé — continuer directement
    if (uploadedUrl) {
      navigate("/step-creation", {
        state: {
          videoUrl: uploadedUrl,
          previewUrl,
          duration,
          departure,
          destination,
          pathType,
          establishmentId,
        },
      });
      return;
    }

    // ✅ Upload vers Cloudinary
    setUploading(true);
    setError("");

    try {
      const result = await cloudinaryService.uploadVideo(videoFile, (percent) => {
        setProgress(percent);
      });

      setUploadedUrl(result.url);

      navigate("/step-creation", {
        state: {
          videoUrl: result.url,
          previewUrl,
          duration: result.duration || duration,
          departure,
          destination,
          pathType,
          establishmentId,
        },
      });

    } catch (err) {
      setError(err.message || "Erreur lors de l'upload. Veuillez réessayer.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-black"
          >
            <ArrowLeft size={18} /> Retour
          </button>
          <h1 className="text-3xl font-black text-white">Importer la vidéo</h1>
          <p className="mt-2 text-sm text-white/90">
            {departure && destination
              ? `${departure} → ${destination}`
              : "Ajoute la vidéo du chemin"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">

          {/* Recommandations */}
          <div className="rounded-[24px] border border-yellow-100 bg-yellow-50 p-4">
            <h2 className="text-sm font-black text-slate-900">Recommandations</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Vidéo verticale, claire et courte. Idéalement sous 45 secondes. Maximum 100MB.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {!previewUrl ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#FEBD00] bg-white px-6 py-12"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <Upload size={28} className="text-[#FEBD00]" />
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-900">Choisir une vidéo</h3>
              <p className="mt-2 max-w-[260px] text-center text-sm leading-7 text-slate-500">
                Importe une vidéo depuis ton appareil pour commencer la création du chemin.
              </p>
              <div className="mt-5 rounded-full bg-[#FEBD00] px-6 py-3 text-sm font-bold text-white">
                Parcourir
              </div>
            </button>
          ) : (
            <div className="mt-5 rounded-[28px] border border-gray-200 bg-[#F8F8F8] p-4">
              <div className="overflow-hidden rounded-[22px] bg-black">
                <video src={previewUrl} controls className="h-[260px] w-full object-cover" />
              </div>

              <div className="mt-4 flex items-start gap-3">
                <Video size={18} className="mt-1 text-[#FEBD00]" />
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-900 truncate">{videoFile?.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {uploadedUrl
                      ? "✅ Vidéo uploadée sur Cloudinary"
                      : `Durée : ${duration}s · ${(videoFile?.size / 1024 / 1024).toFixed(1)} MB`
                    }
                  </p>
                </div>
              </div>

              {/* ✅ Barre de progression */}
              {uploading && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Upload en cours...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#FEBD00] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* ✅ Message erreur */}
              {error && (
                <div className="mt-4 bg-red-100 text-red-600 text-sm px-4 py-3 rounded-2xl text-center">
                  {error}
                </div>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 disabled:opacity-50"
              >
                <ImagePlus size={16} /> Changer la vidéo
              </button>
            </div>
          )}

          {/* ✅ Bouton Continuer */}
          <button
            onClick={handleContinue}
            disabled={uploading || !videoFile}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md disabled:opacity-50"
          >
            <CheckCircle2 size={18} />
            {uploading ? `Upload... ${progress}%` : "Continuer"}
          </button>

        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}

// // src/pages/dashboard/VideoUpload.jsx
// import React, { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft, Upload, Video,
//   CheckCircle2, ImagePlus,
// } from "lucide-react";
// import BottomNavigation from "../../components/BottomNavigation";

// export default function VideoUpload() {
//   const navigate      = useNavigate();
//   const location      = useLocation();
//   const fileInputRef  = useRef(null);

//   // Récupère les infos de Ajouter.jsx
//   const { departure, destination, pathType, establishmentId } = location.state || {};

//   const [videoFile, setVideoFile]   = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [duration, setDuration]     = useState(0);

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith("video/")) {
//       alert("Veuillez sélectionner un fichier vidéo"); return;
//     }
//     setVideoFile(file);
//     const url = URL.createObjectURL(file);
//     setPreviewUrl(url);

//     // Récupérer la durée
//     const video = document.createElement("video");
//     video.src = url;
//     video.onloadedmetadata = () => setDuration(Math.round(video.duration));
//   };

//   const handleContinue = () => {
//     if (!videoFile) {
//       alert("Veuillez importer une vidéo avant de continuer"); return;
//     }
//     // ✅ Passe le fichier + les infos au StepCreation
//     navigate("/step-creation", {
//       state: {
//         videoFile,
//         previewUrl,
//         duration,
//         departure,
//         destination,
//         pathType,
//         establishmentId,
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
//       <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">

//         {/* HEADER */}
//         <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
//           <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-2 text-sm font-medium text-black">
//             <ArrowLeft size={18} /> Retour
//           </button>
//           <h1 className="text-3xl font-black text-white">Importer la vidéo</h1>
//           <p className="mt-2 text-sm text-white/90">
//             {departure && destination ? `${departure} → ${destination}` : "Ajoute la vidéo du chemin"}
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
//           <div className="rounded-[24px] border border-yellow-100 bg-yellow-50 p-4">
//             <h2 className="text-sm font-black text-slate-900">Recommandations</h2>
//             <p className="mt-2 text-sm leading-7 text-slate-600">
//               Vidéo verticale, claire et courte. Idéalement sous 45 secondes pour le confort de lecture.
//             </p>
//           </div>

//           <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />

//           {!previewUrl ? (
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="mt-5 flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#FEBD00] bg-white px-6 py-12"
//             >
//               <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
//                 <Upload size={28} className="text-[#FEBD00]" />
//               </div>
//               <h3 className="mt-5 text-lg font-black text-slate-900">Choisir une vidéo</h3>
//               <p className="mt-2 max-w-[260px] text-center text-sm leading-7 text-slate-500">
//                 Importe une vidéo depuis ton appareil pour commencer la création du chemin.
//               </p>
//               <div className="mt-5 rounded-full bg-[#FEBD00] px-6 py-3 text-sm font-bold text-white">Parcourir</div>
//             </button>
//           ) : (
//             <div className="mt-5 rounded-[28px] border border-gray-200 bg-[#F8F8F8] p-4">
//               <div className="overflow-hidden rounded-[22px] bg-black">
//                 <video src={previewUrl} controls className="h-[260px] w-full object-cover" />
//               </div>
//               <div className="mt-4 flex items-start gap-3">
//                 <Video size={18} className="mt-1 text-[#FEBD00]" />
//                 <div className="flex-1">
//                   <p className="text-sm font-black text-slate-900 truncate">{videoFile?.name}</p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Durée : {duration}s · {(videoFile?.size / 1024 / 1024).toFixed(1)} MB
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
//               >
//                 <ImagePlus size={16} /> Changer la vidéo
//               </button>
//             </div>
//           )}

//           <button
//             onClick={handleContinue}
//             className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md"
//           >
//             <CheckCircle2 size={18} /> Continuer
//           </button>
//         </div>

//         <BottomNavigation />
//       </div>
//     </div>
//   );
// }