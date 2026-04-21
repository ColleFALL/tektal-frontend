
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import premier2 from "../../assets/images/premier2.jpeg"
// Import des icônes
import { Eye, EyeOff } from 'lucide-react'; 

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Connexion avec :", email, password);
    navigate('/home'); 
  };
   
<style>
  {`
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
  `}
</style>

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        
        {/* 1. HEADER */}
        <div className="relative w-full h-[35%] overflow-hidden">
          <img 
            src= {premier2}
            alt="Login Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FEBD00] opacity-80"></div>
          
          <button 
            onClick={() => navigate('/')}
            className="absolute top-10 left-6 z-30 text-black flex items-center gap-2 font-medium"
          >
            ← Retour
          </button>

          <div className="absolute bottom-0 w-full h-12 bg-white rounded-t-[45px] z-20"></div>
        </div>

        {/* 2. FORMULAIRE */}
        <div className="flex-1 px-8 flex flex-col items-center">
          <h2 className="text-3xl font-black text-black mb-10 mt-2">Connexion</h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
            <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#D9D9D9] border-none py-4 px-6 rounded-full text-gray-700 focus:ring-2 focus:ring-[#FEBD00] outline-none"
              required
            />

            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#D9D9D9] border-none py-4 px-6 rounded-full text-gray-700 focus:ring-2 focus:ring-[#FEBD00] outline-none"
                required
              />
              
              {/* BOUTON AVEC VRAIE ICÔNE LUCIDE */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={22} strokeWidth={2.5} />
                ) : (
                  <Eye size={22} strokeWidth={2.5} />
                )}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg mt-4 active:scale-95 transition-all"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Link to="/forgot-password" size="sm" className="text-[#FEBD00] font-bold">
                Mot de passe oublié ?
            </Link>

            <p className="text-gray-600 text-sm mt-10">
              Pas de compte ? <Link to="/signup" className="text-[#FEBD00] font-bold">S'inscrire</Link>
            </p>
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D9D9D9] rounded-full opacity-40"></div>
      </div>
    </div>
  );
};

export default Login;
