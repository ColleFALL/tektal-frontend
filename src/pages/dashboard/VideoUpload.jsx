
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Video,
  CheckCircle2,
  ImagePlus,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

export default function VideoUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleOpenPicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Veuillez selectionner un fichier video");
      return;
    }

    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleContinue = () => {
    if (!videoFile) {
      alert("Veuillez importer une video avant de continuer");
      return;
    }

    navigate("/step-creation");
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

          <h1 className="text-3xl font-black text-white">Importer la video</h1>
          <p className="mt-2 text-sm text-white/90">
            Ajoute la video qui servira de base a ton chemin
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
          <div className="rounded-[24px] border border-yellow-100 bg-yellow-50 p-4">
            <h2 className="text-sm font-black text-slate-900">
              Recommandations
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Utilise une video verticale, claire et courte. L'ideal est de
              rester sous 45 secondes pour garder un bon confort de lecture.
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
              onClick={handleOpenPicker}
              className="mt-5 flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#FEBD00] bg-white px-6 py-12"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <Upload size={28} className="text-[#FEBD00]" />
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-900">
                Choisir une video
              </h3>

              <p className="mt-2 max-w-[260px] text-center text-sm leading-7 text-slate-500">
                Importe une video depuis ton appareil pour commencer la creation
                du chemin.
              </p>

              <div className="mt-5 rounded-full bg-[#FEBD00] px-6 py-3 text-sm font-bold text-white">
                Parcourir
              </div>
            </button>
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
                <div className="mt-1 text-[#FEBD00]">
                  <Video size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-black text-slate-900">
                    {videoFile?.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Video selectionnee avec succes
                  </p>
                </div>
              </div>

              <button
                onClick={handleOpenPicker}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                <ImagePlus size={16} />
                Changer la video
              </button>
            </div>
          )}

          <button
            onClick={handleContinue}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md"
          >
            <CheckCircle2 size={18} />
            Continuer
          </button>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
