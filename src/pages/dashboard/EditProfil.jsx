
// // function EditProfil() {
// //   return <div>Edit Chemin</div>
// // }

// // export default EditProfil



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, User, Mail, MapPin, Save } from "lucide-react";
// import BottomNavigation from "../../components/BottomNavigation";

// export default function EditProfil() {
//   const navigate = useNavigate();

//   const [nom, setNom] = useState("Anta Yussuf");
//   const [email, setEmail] = useState("antayussuf@email.com");
//   const [campus, setCampus] = useState("Bakeli");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Profil mis a jour avec succes");
//     navigate("/profil");
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
//       <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
//         <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
//           <button
//             onClick={() => navigate(-1)}
//             className="mb-5 flex items-center gap-2 text-sm font-medium text-black"
//           >
//             <ArrowLeft size={18} />
//             Retour
//           </button>

//           <h1 className="text-3xl font-black text-white">Modifier le profil</h1>
//           <p className="mt-2 text-sm text-white/90">
//             Mets a jour tes informations personnelles
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="flex flex-col items-center">
//               <div className="h-24 w-24 rounded-full bg-[#FFF3C4] flex items-center justify-center shadow-sm">
//                 <User size={34} className="text-[#FEBD00]" />
//               </div>
//               <button
//                 type="button"
//                 className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
//               >
//                 Changer la photo
//               </button>
//             </div>

//             <div className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4">
//               <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
//                 <User size={16} className="text-[#FEBD00]" />
//                 Nom complet
//               </label>
//               <input
//                 type="text"
//                 value={nom}
//                 onChange={(e) => setNom(e.target.value)}
//                 className="w-full rounded-2xl bg-white border border-gray-200 px-4 py-4 text-sm text-slate-800 outline-none focus:border-[#FEBD00]"
//                 placeholder="Votre nom complet"
//               />
//             </div>

//             <div className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4">
//               <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
//                 <Mail size={16} className="text-[#FEBD00]" />
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full rounded-2xl bg-white border border-gray-200 px-4 py-4 text-sm text-slate-800 outline-none focus:border-[#FEBD00]"
//                 placeholder="Votre email"
//               />
//             </div>

//             <div className="rounded-[24px] border border-gray-200 bg-[#F8F8F8] p-4">
//               <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
//                 <MapPin size={16} className="text-[#FEBD00]" />
//                 Campus
//               </label>
//               <input
//                 type="text"
//                 value={campus}
//                 onChange={(e) => setCampus(e.target.value)}
//                 className="w-full rounded-2xl bg-white border border-gray-200 px-4 py-4 text-sm text-slate-800 outline-none focus:border-[#FEBD00]"
//                 placeholder="Votre campus"
//               />
//             </div>

//             <button
//               type="submit"
//               className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#FEBD00] px-5 py-4 text-base font-bold text-white shadow-lg transition active:scale-[0.98]"
//             >
//               <Save size={20} />
//               Enregistrer les modifications
//             </button>
//           </form>
//         </div>

//         <BottomNavigation />
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Lock } from "lucide-react";
import BottomNavigation from "../../components/BottomNavigation";
import API from "../../services/api";

export default function EditProfil() {
  const navigate = useNavigate();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [campus, setCampus] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/auth/users/me/");
        const fullName = response.data.name || "";
        const parts = fullName.split(" ");
        setPrenom(parts[0] || "");
        setNom(parts.slice(1).join(" ") || "");
        setEmail(response.data.email || "");
        setCampus(response.data.campus || "");
      } catch (err) {
        console.error("Erreur chargement profil", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.patch("/auth/users/me/", {
        name: `${prenom} ${nom}`.trim(),
        campus: campus,
      });
      alert("Profil mis à jour avec succès !");
      navigate("/profil");
    } catch (err) {
      console.error("Erreur mise à jour", err);
      alert("Erreur : " + (err.response?.data?.detail || "Vérifiez vos champs"));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-gray-100 shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-4 px-5 pt-14 pb-6 bg-gray-100">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-black text-gray-900">Modifier le profil</h1>
        </div>

        {/* Formulaire */}
        <div className="flex-1 overflow-y-auto px-5 pb-24">
          <form onSubmit={handleSubmit}>

            <div className="bg-white rounded-3xl p-5 space-y-5 shadow-sm">

              {/* Prénom */}
              <div>
                <label className="block text-base font-bold text-gray-900 mb-2">Prenom</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full rounded-2xl bg-gray-100 px-4 py-4 text-base text-gray-800 outline-none border-none"
                  placeholder="Votre prénom"
                />
              </div>

              {/* Nom */}
              <div>
                <label className="block text-base font-bold text-gray-900 mb-2">Nom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full rounded-2xl bg-gray-100 px-4 py-4 text-base text-gray-800 outline-none border-none"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email non modifiable */}
              <div>
                <label className="block text-base font-bold text-gray-900 mb-2">Email</label>
                <div className="w-full rounded-2xl bg-gray-100 px-4 py-4 flex items-center justify-between">
                  <span className="text-base text-gray-400">{email}</span>
                  <Lock size={18} className="text-gray-400 flex-shrink-0" />
                </div>
                <p className="text-xs text-gray-400 mt-1 px-1">L'email ne peut pas être modifié.</p>
              </div>

              {/* Aperçu nom complet */}
              {(prenom || nom) && (
                <p className="text-sm text-gray-400 px-1">
                  Nom complet : {`${prenom} ${nom}`.trim()}
                </p>
              )}
            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#FEBD00] px-5 py-4 text-base font-bold text-white mt-5 transition active:scale-[0.98]"
            >
              <Save size={20} /> Enregistrer
            </button>

          </form>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}