

// src/pages/dashboard/VideoUpload.jsx
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Upload, Video, Videotape,
  CheckCircle2, ImagePlus, Camera,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import { cloudinaryService } from  "../../services/CloudinaryService";

export default function VideoUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const { departure, destination, pathType, establishmentId } = location.state || {};

  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [videoSource, setVideoSource] = useState(""); // "gallery" ou "camera"

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e, source = "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Veuillez sélectionner un fichier vidéo");
      return;
    }

    //  Vérification taille max 100MB
    const MAX_MB = 100;
    if (file.size > MAX_MB * 1024 * 1024) {
      alert(
        `Vidéo trop lourde ! Maximum ${MAX_MB}MB. Votre fichier : ${(
          file.size /
          1024 /
          1024
        ).toFixed(1)}MB`
      );
      return;
    }

    setVideoFile(file);
    setUploadedUrl("");
    setProgress(0);
    setError("");
    setVideoSource(source);

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
          videoSource,
        },
      });
      return;
    }

    // ✅ Upload vers Cloudinary
    setUploading(true);
    setError("");

    try {
      const result = await cloudinaryService.uploadVideo(
        videoFile,
        (percent) => {
          setProgress(percent);
        }
      );

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
          videoSource,
        },
      });
    } catch (err) {
      setError(
        err.message || "Erreur lors de l'upload. Veuillez réessayer."
      );
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
          <h1 className="text-3xl font-black text-white">
            Importer la vidéo
          </h1>
          <p className="mt-2 text-sm text-white/90">
            {departure && destination
              ? `${departure} → ${destination}`
              : "Ajoute la vidéo du chemin"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
          {/* Recommandations */}
          <div className="rounded-[24px] border border-yellow-100 bg-yellow-50 p-4">
            <h2 className="text-sm font-black text-slate-900">
              Recommandations
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Vidéo verticale, claire et courte. Idéalement sous 45 secondes.
              Maximum 100MB.
            </p>
          </div>

          {/* ✅ Input caché pour la galerie */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "gallery")}
          />

          {/* ✅ Input caché pour la caméra */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="video/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFileChange(e, "camera")}
          />

          {!previewUrl ? (
            <div className="mt-5 space-y-4">
              {/* ✅ BOUTON CAMÉRA (FILMER) */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#FEBD00] bg-gradient-to-br from-[#FEBD00]/10 to-white px-6 py-10 hover:from-[#FEBD00]/20 transition-all"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEBD00]">
                  <Camera size={28} className="text-white" />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">
                  Filmer une vidéo
                </h3>
                <p className="mt-2 max-w-[260px] text-center text-sm leading-6 text-slate-500">
                  Ouvre la caméra pour enregistrer directement ton chemin
                </p>
                <div className="mt-4 rounded-full bg-[#FEBD00] px-6 py-3 text-sm font-bold text-white shadow-md">
                  Ouvrir la caméra
                </div>
              </button>

              {/* ✅ BOUTON GALERIE */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-gray-300 bg-white px-6 py-10 hover:border-gray-400 transition-all"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Upload size={28} className="text-gray-600" />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">
                  Choisir depuis la galerie
                </h3>
                <p className="mt-2 max-w-[260px] text-center text-sm leading-6 text-slate-500">
                  Importe une vidéo déjà enregistrée sur ton appareil
                </p>
                <div className="mt-4 rounded-full bg-gray-700 px-6 py-3 text-sm font-bold text-white">
                  Parcourir
                </div>
              </button>
            </div>
          ) : (
            <div className="mt-5 rounded-[28px] border border-gray-200 bg-[#F8F8F8] p-4">
              <div className="overflow-hidden rounded-[22px] bg-black">
                <video
                  src={previewUrl}
                  controls
                  className="h-[260px] w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-start gap-3">
                {videoSource === "camera" ? (
                  <Camera size={18} className="mt-1 text-[#FEBD00]" />
                ) : (
                  <Video size={18} className="mt-1 text-gray-600" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-900 truncate">
                    {videoFile?.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {uploadedUrl ? (
                      "✅ Vidéo uploadée sur Cloudinary"
                    ) : (
                      <>
                        {videoSource === "camera" ? "📹 Filmé" : "📂 Galerie"} ·{" "}
                        {duration}s ·{" "}
                        {(videoFile?.size / 1024 / 1024).toFixed(1)} MB
                      </>
                    )}
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

              <div className="mt-4 flex gap-2">
                {/* Bouton filmer à nouveau */}
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={uploading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-50 hover:bg-gray-50 transition-all"
                >
                  <Camera size={16} /> Filmer
                </button>

                {/* Bouton changer depuis galerie */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-50 hover:bg-gray-50 transition-all"
                >
                  <ImagePlus size={16} /> Galerie
                </button>
              </div>
            </div>
          )}

          {/* ✅ Bouton Continuer */}
          <button
            onClick={handleContinue}
            disabled={uploading || !videoFile}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md disabled:opacity-50 hover:bg-[#e5ab00] transition-all"
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