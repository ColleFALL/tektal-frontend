
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2, Home, PlusCircle,
  Share2, PlayCircle, Upload, ArrowLeft,
  Loader2, AlertCircle,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import API from "../../services/api";

export default function PathConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    videoUrl, previewUrl, duration,
    departure, destination, pathType,
    establishmentId, steps,
  } = location.state || {};

  const [submitting, setSubmitting]   = useState(false);
  const [progress, setProgress]       = useState("");
  const [createdPath, setCreatedPath] = useState(null);
  const [error, setError]             = useState("");

  const handlePublish = async () => {
    if (!videoUrl) { setError("Vidéo manquante."); return; }
    setSubmitting(true);
    setError("");

    try {
      setProgress("💾 Création du chemin...");

      // ✅ Calculer start_time et end_time pour chaque étape
      const totalDuration = Math.round(duration || 0);
      const stepCount = steps?.length || 1;
      const timePerStep = Math.floor(totalDuration / stepCount);

      const stepsWithTime = steps?.map((s, i) => ({
        step_number: s.step_number,
        text:        s.text,
        start_time:  i * timePerStep,
        end_time:    i === stepCount - 1
          ? totalDuration
          : (i + 1) * timePerStep,
      })) || [];

      const payload = {
        title:       `${departure} → ${destination}`,
        start_label: departure,
        end_label:   destination,
        video_url:   videoUrl,
        duration:    totalDuration,
        is_official: pathType === "official",
        steps:       stepsWithTime,
        platform:    "web",
        ...(establishmentId ? { establishment: establishmentId } : {}),
      };

      console.log("📦 Payload envoyé:", JSON.stringify(payload, null, 2));

      const res = await API.post("/paths/create/", payload);
      setCreatedPath(res.data);
      setProgress("");

    } catch (err) {
      // ✅ Log détaillé pour voir l'erreur exacte du backend
      console.error("❌ Erreur complète:", err?.response?.data);
      console.error("❌ Status:", err?.response?.status);

      const data = err?.response?.data;
      let msg = "Une erreur est survenue.";

      if (data) {
        if (typeof data === "string") {
          msg = data;
        } else if (data.detail) {
          msg = data.detail;
        } else if (data.message) {
          msg = data.message;
        } else if (data.non_field_errors) {
          msg = data.non_field_errors[0];
        } else {
          // ✅ Affiche tous les champs en erreur
          msg = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
            .join(" | ");
        }
      }

      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    const token = createdPath?.share_token || createdPath?.id;
    const url   = `https://tektal-frontend.vercel.app/path/${token}`;
    const text  = `🗺️ "${createdPath?.title}" sur Tektal\n👉 ${url}`;
    if (navigator.share) {
      try { await navigator.share({ title: createdPath?.title, text, url }); return; }
      catch { /* fallback */ }
    }
    try { await navigator.clipboard.writeText(url); alert("✅ Lien copié !"); }
    catch { alert("Impossible de partager."); }
  };

  // ── Écran succès ────────────────────────────────────────────
  if (createdPath) {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 px-6 py-10 flex flex-col items-center justify-center text-center pb-28">
            <div className="h-28 w-28 rounded-full bg-yellow-100 flex items-center justify-center">
              <CheckCircle2 size={54} className="text-[#FEBD00]" />
            </div>
            <h1 className="mt-8 text-3xl font-black text-slate-900">Chemin publié !</h1>
            <p className="mt-4 max-w-[290px] text-sm leading-7 text-slate-500">
              Ton chemin <span className="font-bold text-slate-700">"{createdPath.title}"</span> est maintenant visible par la communauté.
            </p>
            <div className="mt-8 w-full space-y-3">
              <button
                onClick={() => navigate("/video-player", { state: { path: createdPath } })}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md"
              >
                <PlayCircle size={18} /> Voir le chemin
              </button>
              <button
                onClick={handleShare}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700"
              >
                <Share2 size={18} /> Partager
              </button>
              <button
                onClick={() => navigate("/ajouter")}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700"
              >
                <PlusCircle size={18} /> Créer un autre chemin
              </button>
              <button
                onClick={() => navigate("/home")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-4 text-sm font-bold text-white"
              >
                <Home size={18} /> Retour à l'accueil
              </button>
            </div>
          </div>
          <BottomNavigation />
        </div>
      </div>
    );
  }

  // ── Écran confirmation avant publication ───────────────────
  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
          <button
            onClick={() => navigate(-1)}
            disabled={submitting}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-black disabled:opacity-50"
          >
            <ArrowLeft size={18} /> Retour
          </button>
          <h1 className="text-3xl font-black text-white">Confirmation</h1>
          <p className="mt-2 text-sm text-white/90">Vérifiez avant de publier</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28 space-y-4">

          {/* Aperçu vidéo */}
          {previewUrl && (
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <video src={previewUrl} controls className="w-full h-52 object-cover bg-black" />
            </div>
          )}

          {/* Infos chemin */}
          <div className="rounded-2xl bg-[#F8F8F8] border border-gray-100 p-4 space-y-3">
            <Row label="Titre"  value={`${departure} → ${destination}`} />
            <Row label="Type"   value={pathType === "official" ? "🏛️ Officiel" : "👥 Communautaire"} />
            <Row label="Durée"  value={`${Math.round(duration || 0)} sec`} />
            <Row label="Étapes" value={`${steps?.length || 0} étape${steps?.length > 1 ? "s" : ""}`} />
            <Row label="Vidéo"  value={videoUrl ? "✅ Prête" : "❌ Manquante"} />
          </div>

          {/* Liste des étapes */}
          {steps && steps.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-black text-slate-800">Étapes</p>
              {steps.map((s, i) => (
                <div key={i} className="flex gap-3 rounded-2xl bg-[#F8F8F8] p-3 border border-gray-100">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FEBD00] text-xs font-bold text-white">
                    {s.step_number}
                  </div>
                  <p className="text-sm text-slate-700 pt-1">{s.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 p-4">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Bouton publier */}
          <button
            onClick={handlePublish}
            disabled={submitting || !videoUrl}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEBD00] px-5 py-4 text-base font-bold text-white shadow-md disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {progress || "Publication..."}
              </>
            ) : (
              <>
                <Upload size={20} /> Publier le chemin
              </>
            )}
          </button>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}