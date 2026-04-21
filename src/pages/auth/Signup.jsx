import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bangrang from "../../assets/images/bangrang.jpeg";
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '../../services/authService';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
    } catch (err) {
      const data = err.response?.data;
      if (data?.email) setError("Cet email est déjà utilisé.");
      else if (data?.password) setError("Mot de passe trop faible.");
      else setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Écran succès après inscription
  if (success) {
    return (
      <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
        <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl flex flex-col items-center justify-center px-8 text-center">
          <div className="text-6xl mb-6">✉️</div>
          <h2 className="text-2xl font-bold text-black mb-4">Vérifiez votre email !</h2>
          <p className="text-gray-500 text-sm mb-8">
            Un lien d'activation a été envoyé à <strong>{formData.email}</strong>. 
            Cliquez dessus pour activer votre compte.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg"
          >
            Aller au Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="relative w-full h-[28%] overflow-hidden">
          <img src={bangrang} alt="Signup Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#FEBD00] opacity-80"></div>
          <button
            onClick={() => navigate('/login')}
            className="absolute top-10 left-6 z-30 text-black font-medium"
          >
            ← Retour
          </button>
          <div className="absolute bottom-0 w-full h-10 bg-white rounded-t-[40px] z-20"></div>
        </div>

        {/* FORMULAIRE */}
        <div className="flex-1 px-8 flex flex-col items-center overflow-y-auto pb-10">
          <h2 className="text-3xl font-black text-black mb-6 mt-2">Inscription</h2>

          {error && (
            <div className="w-full bg-red-100 text-red-600 text-sm px-4 py-3 rounded-2xl mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#D9D9D9] border-none py-3.5 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#D9D9D9] border-none py-3.5 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
              required
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#D9D9D9] border-none py-3.5 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={22} strokeWidth={2.5} /> : <Eye size={22} strokeWidth={2.5} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg mt-4 active:scale-95 transition-all disabled:opacity-60"
            >
              {loading ? "Création en cours..." : "Créer un compte"}
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-8 pb-4">
            Déjà un compte ? <Link to="/login" className="text-[#FEBD00] font-bold">Se connecter</Link>
          </p>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D9D9D9] rounded-full opacity-40"></div>
      </div>
    </div>
  );
};

export default Signup;