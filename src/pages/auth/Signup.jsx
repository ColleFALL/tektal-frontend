// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// // Import des icônes professionnelles
// import { Eye, EyeOff } from 'lucide-react';

// const Signup = () => {
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Les mots de passe ne correspondent pas !");
//       return;
//     }
//     console.log("Inscription de :", formData);
//     navigate('/login'); 
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      
//       <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        
//         {/* 1. HEADER */}
//         <div className="relative w-full h-[28%] overflow-hidden">
//           <img 
//             src="src/assets/bang-rang.jpeg" 
//             alt="Signup Background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-[#FEBD00] opacity-80"></div>
          
//           <button 
//             onClick={() => navigate('/login')}
//             className="absolute top-10 left-6 z-30 text-black font-medium"
//           >
//             ← Retour
//           </button>

//           <div className="absolute bottom-0 w-full h-10 bg-white rounded-t-[40px] z-20"></div>
//         </div>

//         {/* 2. FORMULAIRE D'INSCRIPTION */}
//         <div className="flex-1 px-8 flex flex-col items-center overflow-y-auto pb-10">
//           <h2 className="text-3xl font-black text-black mb-6 mt-2">Inscription</h2>

//           <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
//             <input 
//               type="text"
//               name="fullName"
//               placeholder="Nom complet"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full bg-[#D9D9D9] border-none py-3.5 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
//               required
//             />

//             <input 
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full bg-[#D9D9D9] border-none py-3.5 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
//               required
//             />

//             {/* Mot de passe avec VRAIE ICÔNE */}
//             <div className="relative w-full">
//               <input 
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Mot de passe"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full bg-[#D9D9D9] border-none py-3.5 px-6 rounded-full text-gray-700 outline-none focus:ring-2 focus:ring-[#FEBD00]"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 {showPassword ? (
//                   <EyeOff size={22} strokeWidth={2.5} />
//                 ) : (
//                   <Eye size={22} strokeWidth={2.5} />
//                 )}
//               </button>
//             </div>


//             <button 
//               type="submit"
//               className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg mt-4 active:scale-95 transition-all"
//             >
//               Créer un compte
//             </button>
//           </form>

//           <p className="text-gray-600 text-sm mt-8 pb-4">
//             Déjà un compte ? <Link to="/login" className="text-[#FEBD00] font-bold">Se connecter</Link>
//           </p>
//         </div>

//         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D9D9D9] rounded-full opacity-40"></div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '../../services/authService';

const Signup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await authService.register({
      email: formData.email,
      name: formData.fullName,
      password: formData.password,
      re_password: formData.password,
    });

    console.log("Inscription réussie :", res.data);

    alert("Compte créé ! Vérifie ton email pour activer ton compte.");

    navigate('/login');

  } catch (error) {
    console.error("Erreur signup :", error.response?.data);

    if (error.response?.data) {
      alert(JSON.stringify(error.response.data));
    } else {
      alert("Erreur serveur");
    }
  }
};

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="relative w-full h-[28%] overflow-hidden">
          <img 
            src="src/assets/bang-rang.jpeg" 
            alt="Signup Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FEBD00] opacity-80"></div>
          
          <button 
            onClick={() => navigate('/login')}
            className="absolute top-10 left-6 z-30 text-black font-medium"
          >
            ← Retour
          </button>

          <div className="absolute bottom-0 w-full h-10 bg-white rounded-t-[40px] z-20"></div>
        </div>

        {/* FORM */}
        <div className="flex-1 px-8 flex flex-col items-center overflow-y-auto pb-10">
          <h2 className="text-3xl font-black text-black mb-6 mt-2">Inscription</h2>

          <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
            
            <input 
              type="text"
              name="fullName"
              placeholder="Nom complet"
              value={formData.fullName}
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
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#FEBD00] text-white font-bold py-4 rounded-full shadow-lg mt-4 active:scale-95 transition-all"
            >
              Créer un compte
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