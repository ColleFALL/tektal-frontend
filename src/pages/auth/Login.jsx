<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
            src="src/assets/premier (2).jpeg" 
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
// function Login() {
//   return (
//     <div className="p-10 text-center">
//       <h1 className="text-2xl font-bold text-red-500">
//         Page Login
//       </h1>
//     </div>
//   )
// }

// export default Login




// import React from "react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#f4c20d] via-[#ffd84d] to-white px-4 py-8 sm:px-6 lg:px-10">
//       <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center">
//         <div className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.10)] lg:grid-cols-2">
//           <div className="hidden flex-col justify-between bg-gradient-to-br from-[#f4c20d] to-[#ffd754] p-10 text-white lg:flex">
//             <div>
//               <Link to="/" className="text-3xl font-black uppercase italic">
//                 Tektal
//               </Link>
//               <h1 className="mt-10 text-5xl font-black leading-tight">
//                 Reconnecte-toi a ton chemin.
//               </h1>
//               <p className="mt-6 max-w-md text-base leading-8 text-white/90">
//                 Accede a tes parcours, retrouve tes favoris et continue ton
//                 experience de navigation visuelle.
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
//                 <p className="font-bold">Simple</p>
//                 <p className="mt-1 text-sm text-white/90">
//                   Connexion rapide pour acceder a tes parcours.
//                 </p>
//               </div>
//               <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
//                 <p className="font-bold">Pratique</p>
//                 <p className="mt-1 text-sm text-white/90">
//                   Reprends la navigation la ou tu t'es arrete.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 sm:p-8 md:p-10 lg:p-12">
//             <div className="mx-auto w-full max-w-md">
//               <Link
//                 to="/"
//                 className="text-2xl font-black uppercase italic text-[#132a6a] lg:hidden"
//               >
//                 Tektal
//               </Link>

//               <h2 className="mt-6 text-3xl font-black text-slate-900 sm:text-4xl">
//                 Connexion
//               </h2>
//               <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
//                 Connecte-toi pour continuer a explorer et partager des chemins.
//               </p>

//               <form className="mt-8 space-y-5">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="exemple@email.com"
//                     className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-[#f4c20d] focus:bg-white"
//                   />
//                 </div>

//                 <div>
//                   <div className="mb-2 flex items-center justify-between">
//                     <label className="block text-sm font-semibold text-slate-700">
//                       Mot de passe
//                     </label>
//                     <Link
//                       to="/forgot-password"
//                       className="text-sm font-semibold text-[#132a6a] hover:underline"
//                     >
//                       Mot de passe oublie ?
//                     </Link>
//                   </div>

//                   <input
//                     type="password"
//                     placeholder="Votre mot de passe"
//                     className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-[#f4c20d] focus:bg-white"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full rounded-full bg-[#132a6a] px-6 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(19,42,106,0.18)] transition hover:-translate-y-1"
//                 >
//                   Se connecter
//                 </button>
//               </form>

//               <div className="mt-6">
//                 <button
//                   type="button"
//                   className="w-full rounded-full border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
//                 >
//                   Continuer avec Google
//                 </button>
//               </div>

//               <p className="mt-8 text-center text-sm text-slate-600">
//                 Pas encore de compte ?{" "}
//                 <Link to="/signup" className="font-bold text-[#132a6a] hover:underline">
//                   Creer un compte
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

