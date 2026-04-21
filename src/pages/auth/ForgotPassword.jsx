import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import premier2 from "../../assets/images/premier2.jpeg";
import { authService } from '../../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.requestPasswordReset(email);
      setIsSent(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="relative w-full h-[35%] overflow-hidden">
          <img src={premier2} alt="Forgot Password" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#FEBD00] opacity-80"></div>
          <button
            onClick={() => navigate('/login')}
            className="absolute top-10 left-6 z-30 text-black font-medium"
          >
            ← Retour
          </button>
          <div className="absolute bottom-0 w-full h-12 bg-white rounded-t-[45px] z-20"></div>
        </div>

        {/* CONTENU */}
        <div className="flex-1 px-8 flex flex-col items-center">
          {!isSent ? (
            <>
              <h2 className="text-2xl font-black text-black mb-4 mt-2 text-center">
                Mot de passe oublié ?
              </h2>
              <p className="text-gray-500 text-center mb-10 text-sm px-2">
                Entrez votre email pour recevoir un lien de réinitialisation.
              </p>

              {error && (
                <div className="w-full bg-red-100 text-red-600 text-sm px-4 py-3 rounded-2xl mb-4 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="w-full flex flex-col gap-6">
                <input
                  type="email"
                  placeholder="Votre Email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full bg-[#D9D9D9] border-none py-4 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg active:scale-95 transition-all disabled:opacity-60"
                >
                  {loading ? "Envoi..." : "Envoyer le lien"}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center mt-10">
              <div className="text-6xl mb-6">✉️</div>
              <h2 className="text-2xl font-bold text-black mb-4">Email envoyé !</h2>
              <p className="text-gray-500 mb-10 text-sm">
                Consultez votre boîte de réception pour réinitialiser votre mot de passe.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg"
              >
                Retour au Login
              </button>
            </div>
          )}
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D9D9D9] rounded-full opacity-40"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;