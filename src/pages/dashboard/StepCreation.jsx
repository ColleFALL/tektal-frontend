

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  CheckCircle2,
} from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";

export default function StepCreation() {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    { id: 1, title: "Quitter l'entree principale" },
    { id: 2, title: "Tourner a gauche apres le hall" },
    { id: 3, title: "Continuer jusqu'au bloc administratif" },
  ]);

  const updateStep = (id, value) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, title: value } : step))
    );
  };

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { id: Date.now(), title: "" },
    ]);
  };

  const removeStep = (id) => {
    if (steps.length <= 2) {
      alert("Un chemin doit contenir au moins 2 etapes");
      return;
    }

    setSteps((prev) => prev.filter((step) => step.id !== id));
  };

  const handleSave = () => {
    const hasEmpty = steps.some((step) => !step.title.trim());

    if (hasEmpty) {
      alert("Veuillez remplir toutes les etapes");
      return;
    }

    alert("Etapes enregistrees avec succes");
    navigate("/confirmation");
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

          <h1 className="text-3xl font-black text-white">Etapes du chemin</h1>
          <p className="mt-2 text-sm text-white/90">
            Decoupe ton trajet en instructions simples
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
          <div className="rounded-[24px] border border-yellow-100 bg-yellow-50 p-4">
            <h2 className="text-sm font-black text-slate-900">
              Conseils rapides
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Utilise des phrases courtes et precises. Exemple : "Tourner a
              droite apres la grille" ou "Continuer jusqu'au bloc B".
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-3 text-slate-400">
                    <GripVertical size={18} />
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-black text-slate-900">
                        Etape {index + 1}
                      </p>

                      <button
                        onClick={() => removeStep(step.id)}
                        className="rounded-full bg-white p-2 border border-gray-200"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>

                    <textarea
                      value={step.title}
                      onChange={(e) => updateStep(step.id, e.target.value)}
                      rows={3}
                      placeholder="Ex: Tourner a gauche apres la boutique"
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#FEBD00]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addStep}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#FEBD00] bg-yellow-50 px-5 py-4 text-sm font-bold text-[#FEBD00]"
          >
            <Plus size={18} />
            Ajouter une etape
          </button>

          <button
            onClick={handleSave}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEBD00] px-5 py-4 text-sm font-bold text-white shadow-md"
          >
            <CheckCircle2 size={18} />
            Enregistrer les etapes
          </button>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}

