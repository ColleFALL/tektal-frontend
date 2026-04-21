import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Activate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading | success | error

  useEffect(() => {
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    if (!uid || !token) {
      setStatus('error');
      return;
    }

    const activate = async () => {
      try {
        await authService.activate(uid, token);
        setStatus('success');
        // ✅ Redirection automatique vers /login après 3 secondes
        setTimeout(() => navigate('/login'), 3000);
      } catch {
        setStatus('error');
      }
    };

    activate();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="w-full max-w-[450px] h-screen bg-white shadow-2xl flex flex-col items-center justify-center px-8 text-center">

        {status === 'loading' && (
          <>
            <div className="text-5xl mb-6 animate-spin">⏳</div>
            <h2 className="text-xl font-bold text-black">Activation en cours...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-bold text-black mb-4">Compte activé !</h2>
            <p className="text-gray-500 text-sm mb-8">
              Votre compte a été activé avec succès. Vous allez être redirigé vers la page de connexion...
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg"
            >
              Se connecter maintenant
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-2xl font-bold text-black mb-4">Lien invalide</h2>
            <p className="text-gray-500 text-sm mb-8">
              Ce lien d'activation est invalide ou a expiré. Veuillez vous réinscrire.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg"
            >
              Retour à l'inscription
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Activate;