
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      navigate('/login');
    }
  };

  return (
    /* Fond gris sur ordinateur pour faire ressortir l'app */
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center">
      
      {/* CADRE MOBILE (Max 450px) */}
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col font-sans">
        
        {/* --- ÉCRAN 1 : FULL SCREEN (Image Scooter/Vélo) --- */}
        {step === 1 && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            {/* Image + Calque Jaune */}
            <div className="absolute inset-0 z-0">
              <img 
                src="src/assets/premier (3).jpeg" 
                alt="Background 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#FEBD00] opacity-85"></div>
            </div>

            {/* Texte et Bouton Écran 1 */}
            <div className="relative z-20 flex flex-col items-center px-10 text-center">
              <h1 className="text-white text-6xl font-black mb-20 tracking-widest drop-shadow-lg">
                TEKTAL
              </h1>

              <button 
                onClick={handleNext}
                className="bg-white text-[#1a2b4c] text-lg font-bold px-12 py-3 rounded-full flex items-center gap-3 shadow-xl active:scale-95 transition-all cursor-pointer"
              >
                Suivant <span className="text-2xl">→</span>
              </button>
            </div>
          </div>
        )}

        {/* --- ÉCRAN 2 : DESIGN AVEC COURBE (Image Hands/Phone) --- */}
        {step === 2 && (
          <div className="absolute inset-0 z-20 flex flex-col bg-white">
            
            {/* Image du haut avec la courbe blanche */}
            <div className="relative w-full h-[48%] overflow-hidden">
              <img 
                src="src/assets/bang-rang.jpeg" 
                alt="Background 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#FEBD00] opacity-80"></div>
              
              {/* Courbe arrondie du bas de l'image */}
              <div className="absolute bottom-0 w-full h-14 bg-white rounded-t-[50px] z-20"></div>
            </div>

            {/* Texte et Bouton Commencer Écran 2 */}
            <div className="flex-1 flex flex-col items-center px-10 text-center">
              <h1 className="text-[#1E1E1E] text-4xl font-black mb-4 tracking-tighter">
                TEKTAL
              </h1>
              
              <p className="text-gray-700 text-lg font-medium mb-12 leading-tight">
                Suis le chemin. Visuellement.
              </p>

              <button 
                onClick={handleNext}
                className="bg-[#FEBD00] text-white text-xl font-bold w-full py-4 rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Commencer
              </button>
              
              <p className="mt-auto mb-8 text-[11px] text-gray-500 px-6">
                En continuant, vous acceptez nos <span className="underline">conditions d'utilisation</span>
              </p>
            </div>
          </div>
        )}

        {/* Petite barre grise (style iPhone/Android) en bas */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D9D9D9] rounded-full z-50 opacity-40"></div>
        
      </div>
    </div>
  );
};

export default Welcome;
