import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import premier2  from  "../../assets/images/premier2.jpeg" 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Demande de réinitialisation pour :", email);
    // Ici on simule l'envoi
    setIsSent(true);
    // Optionnel : rediriger après quelques secondes ou laisser l'utilisateur cliquer
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      
      {/* CONTAINER MOBILE-FIRST */}
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        
        {/* 1. HEADER */}
        <div className="relative w-full h-[35%] overflow-hidden">
          <img 
            src={premier2} 
            alt="Forgot Password Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FEBD00] opacity-80"></div>
          
          <button 
            onClick={() => navigate('/login')}
            className="absolute top-10 left-6 z-30 text-black font-medium"
          >
            ← Retour
          </button>

          <div className="absolute bottom-0 w-full h-12 bg-white rounded-t-[45px] z-20"></div>
        </div>

        {/* 2. CONTENU */}
        <div className="flex-1 px-8 flex flex-col items-center">
          {!isSent ? (
            <>
              <h2 className="text-2xl font-black text-black mb-4 mt-2 text-center">
                Mot de passe oublié ?
              </h2>
              <p className="text-gray-500 text-center mb-10 text-sm px-2">
                Entrez votre adresse email pour recevoir un lien de réinitialisation.
              </p>

              <form onSubmit={handleReset} className="w-full flex flex-col gap-6">
                <input 
                  type="email"
                  placeholder="Votre Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#D9D9D9] border-none py-4 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
                  required
                />

                <button 
                  type="submit"
                  className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg active:scale-95 transition-all"
                >
                  Envoyer le lien
                </button>
              </form>
            </>
          ) : (
            /* Message de succès après envoi */
            <div className="flex flex-col items-center text-center mt-10">
              <div className="text-6xl mb-6 text-[#FEBD00]">✉️</div>
              <h2 className="text-2xl font-bold text-black mb-4">Email envoyé !</h2>
              <p className="text-gray-500 mb-10 text-sm">
                Consultez votre boîte de réception pour réinitialiser votre mot de passe.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg transition-all"
              >
                Retour au Login
              </button>
            </div>
          )}
        </div>

        {/* Barre du bas mobile */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D9D9D9] rounded-full opacity-40"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;