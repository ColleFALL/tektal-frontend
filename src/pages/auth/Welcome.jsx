// import { useNavigate } from "react-router-dom"

// function Welcome() {
//   const navigate = useNavigate()

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
//       <h1 className="text-4xl font-bold mb-6">
//         Bienvenue sur Tektal 
//       </h1>

//       <p className="mb-8 text-gray-600">
//         Filmer, naviguer et partager facilement
//       </p>

//       <button
//         onClick={() => navigate("/login")}
//         className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
//       >
//         Commencer
//       </button>

//     </div>
//   )
// }

// export default Welcome




import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#f4c20d] via-[#ffd84d] to-white text-slate-900">
      <header className="relative z-30">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 md:px-8 lg:px-10">
          <Link
            to="/"
            className="text-2xl font-black uppercase italic tracking-wide text-white"
          >
            Tektal
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#fonctionnement" className="text-sm font-semibold text-white/90 transition hover:text-white">
              Fonctionnement
            </a>
            <a href="#public" className="text-sm font-semibold text-white/90 transition hover:text-white">
              Public
            </a>
            <a href="#atouts" className="text-sm font-semibold text-white/90 transition hover:text-white">
              Atouts
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Connexion
            </Link>

            <Link
              to="/signup"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#132a6a] shadow-[0_14px_30px_rgba(19,42,106,0.16)] transition hover:-translate-y-0.5"
            >
              Commencer
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOuvert(!menuOuvert)}
            className="inline-flex rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-sm md:hidden"
          >
            <span className="text-sm font-bold">{menuOuvert ? "Fermer" : "Menu"}</span>
          </button>
        </div>

        {menuOuvert && (
          <div className="mx-4 rounded-3xl border border-white/25 bg-white/15 p-5 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#fonctionnement"
                onClick={() => setMenuOuvert(false)}
                className="text-sm font-semibold text-white"
              >
                Fonctionnement
              </a>
              <a
                href="#public"
                onClick={() => setMenuOuvert(false)}
                className="text-sm font-semibold text-white"
              >
                Public
              </a>
              <a
                href="#atouts"
                onClick={() => setMenuOuvert(false)}
                className="text-sm font-semibold text-white"
              >
                Atouts
              </a>
              <Link
                to="/login"
                className="rounded-full border border-white/35 bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-white px-5 py-3 text-center text-sm font-bold text-[#132a6a]"
              >
                Commencer
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="relative flex min-h-[calc(100vh-88px)] items-center px-4 pb-12 pt-6 sm:px-6 md:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.12),transparent_30%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 text-center text-white lg:order-1 lg:text-left">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm sm:text-sm">
              Orientation visuelle pour campus et entreprises
            </span>

            <h1 className="mt-5 text-4xl font-black uppercase italic leading-[0.95] tracking-wide sm:text-5xl md:text-6xl xl:text-7xl">
              Trouve ton
              <br />
              chemin avec
              <br />
              Tektal
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
              Tektal permet de guider un etudiant ou un visiteur grace a des
              parcours visuels, clairs et partageables, crees par la communaute
              ou par des etablissements officiels.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/login"
                className="w-full rounded-full bg-white px-8 py-4 text-center text-base font-bold text-[#132a6a] shadow-[0_18px_40px_rgba(19,42,106,0.16)] transition hover:-translate-y-1 sm:w-auto sm:text-lg"
              >
                Commencer
              </Link>

              <a
                href="#fonctionnement"
                className="w-full rounded-full border border-white/40 bg-white/10 px-8 py-4 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:w-auto sm:text-lg"
              >
                Voir comment ca marche
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-white backdrop-blur-sm">
                <span className="block text-2xl font-black">45s</span>
                <p className="mt-1 text-sm text-white/90">Video courte</p>
              </div>

              <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-white backdrop-blur-sm">
                <span className="block text-2xl font-black">2 a 6</span>
                <p className="mt-1 text-sm text-white/90">Etapes simples</p>
              </div>

              <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-white backdrop-blur-sm">
                <span className="block text-2xl font-black">WhatsApp</span>
                <p className="mt-1 text-sm text-white/90">Partage rapide</p>
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="w-[240px] rotate-[-8deg] rounded-[30px] bg-zinc-900 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:w-[260px] md:w-[320px] xl:w-[360px]">
              <div
                className="relative flex h-[460px] flex-col justify-between overflow-hidden rounded-[24px] bg-cover bg-center p-4 sm:h-[520px] md:h-[590px] md:p-5 xl:h-[640px] xl:p-6"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(244,194,13,0.78), rgba(255,255,255,0.88)), url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80')",
                }}
              >
                <div className="flex items-center justify-between text-white">
                  <span className="text-base font-black sm:text-lg md:text-xl">
                    16:50
                  </span>
                  <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
                    <span>4G</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="mb-10 flex flex-col items-center sm:mb-14 md:mb-16">
                  <h2 className="mb-6 text-center text-4xl font-black uppercase italic text-white sm:text-5xl md:text-6xl">
                    TEKTAL
                  </h2>

                  <Link
                    to="/login"
                    className="rounded-full bg-white px-6 py-3 text-base font-bold text-[#132a6a] shadow-[0_12px_30px_rgba(19,42,106,0.16)] transition hover:scale-[1.02] sm:px-8 sm:py-4 sm:text-xl"
                  >
                    Suivant -&gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="fonctionnement"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-10 lg:py-20"
      >
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Comment ca marche
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
            Le principe est simple : creer un chemin, le partager, puis le
            suivre etape par etape jusqu'a la destination.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Bloc
            numero="01"
            titre="Creer un chemin"
            texte="Filme un trajet, ajoute le depart, la destination et les etapes principales."
          />
          <Bloc
            numero="02"
            titre="Publier"
            texte="Le chemin est ajoute au feed et peut etre retrouve facilement par les utilisateurs."
          />
          <Bloc
            numero="03"
            titre="Partager"
            texte="Un lien public ou un partage WhatsApp permet de diffuser rapidement le parcours."
          />
          <Bloc
            numero="04"
            titre="Suivre"
            texte="Le visiteur ou l'etudiant avance etape par etape jusqu'au bon lieu."
          />
        </div>
      </section>

      <section
        id="public"
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-10"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[30px] border border-yellow-200 bg-white/85 p-7 shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
            <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Pour qui
            </h3>
            <div className="mt-6 space-y-4 text-slate-600">
              <p className="rounded-2xl bg-yellow-50 px-4 py-4 leading-7">
                Etudiants qui veulent trouver rapidement un campus, un bureau ou
                une salle sans appeler.
              </p>
              <p className="rounded-2xl bg-yellow-50 px-4 py-4 leading-7">
                Ecoles et centres de formation qui veulent guider leurs nouveaux
                arrivants de maniere moderne.
              </p>
              <p className="rounded-2xl bg-yellow-50 px-4 py-4 leading-7">
                Entreprises et structures qui recoivent du public et veulent
                simplifier l'orientation.
              </p>
            </div>
          </div>

          <div
            id="atouts"
            className="rounded-[30px] bg-gradient-to-br from-[#f4c20d] to-[#ffd754] p-7 text-white shadow-[0_20px_50px_rgba(217,164,0,0.18)]"
          >
            <h3 className="text-2xl font-black sm:text-3xl">Pourquoi Tektal</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white/15 px-4 py-4 backdrop-blur-sm">
                <p className="font-bold">Plus clair qu'une adresse</p>
                <p className="mt-2 text-sm leading-7 text-white/90">
                  Une video de trajet est souvent plus simple a comprendre qu'une
                  explication textuelle ou qu'un point GPS.
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 px-4 py-4 backdrop-blur-sm">
                <p className="font-bold">Facile a partager</p>
                <p className="mt-2 text-sm leading-7 text-white/90">
                  Un chemin peut etre envoye en quelques secondes a un etudiant
                  ou un visiteur.
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 px-4 py-4 backdrop-blur-sm">
                <p className="font-bold">Utile sur le terrain</p>
                <p className="mt-2 text-sm leading-7 text-white/90">
                  Le produit cible un probleme concret : aider quelqu'un a
                  arriver au bon endroit sans friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-5 rounded-[28px] bg-gradient-to-r from-[#f4c20d] to-[#ffd754] px-5 py-6 shadow-[0_20px_50px_rgba(217,164,0,0.18)] sm:px-7 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">
              Lance l'experience Tektal
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              Cree ton compte et commence a explorer, publier ou suivre des
              chemins visuels.
            </p>
          </div>

          <Link
            to="/signup"
            className="w-full rounded-full bg-white px-7 py-4 text-center text-base font-extrabold text-[#132a6a] shadow-[0_18px_40px_rgba(19,42,106,0.16)] transition hover:-translate-y-1 sm:w-auto sm:text-lg"
          >
            Creer un compte
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/30 px-4 py-8 text-center text-sm text-slate-600 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-slate-700">Tektal © 2026</p>
          <p className="mt-2">
            Trouver un lieu devient simple, visuel et partageable.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Bloc({ numero, titre, texte }) {
  return (
    <div className="rounded-3xl border border-yellow-200 bg-white/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.06)] backdrop-blur-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c20d] text-lg font-black text-white">
        {numero}
      </div>
      <h3 className="text-xl font-extrabold text-slate-900">{titre}</h3>
      <p className="mt-3 text-base leading-7 text-slate-600">{texte}</p>
    </div>
  );
}






// import React from "react";
// import { Link } from "react-router-dom";

// export default function Welcome() {
//   return (
//     <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#f4c20d] via-[#ffd84d] to-white">
//       <div className="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 md:px-8 lg:px-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.14),transparent_30%)]" />

//         <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
//           <div className="order-2 text-center text-white lg:order-1 lg:text-left">
//             <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm sm:text-sm">
//               Orientation visuelle simple et rapide
//             </span>

//             <h1 className="mt-5 text-4xl font-black uppercase italic leading-[0.95] tracking-wide sm:text-5xl md:text-6xl xl:text-7xl">
//               Tektal
//             </h1>

//             <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
//               Trouve ton chemin facilement grace a des parcours visuels crees
//               par la communaute et les etablissements officiels.
//             </p>

//             <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
//               <Link
//                 to="/login"
//                 className="w-full rounded-full bg-white px-8 py-4 text-center text-base font-bold text-[#132a6a] shadow-[0_18px_40px_rgba(19,42,106,0.16)] transition hover:-translate-y-1 sm:w-auto sm:text-lg"
//               >
//                 Commencer
//               </Link>

//               <Link
//                 to="/signup"
//                 className="w-full rounded-full border border-white/40 bg-white/10 px-8 py-4 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:w-auto sm:text-lg"
//               >
//                 Creer un compte
//               </Link>
//             </div>

//             <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
//               <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-white backdrop-blur-sm">
//                 <span className="block text-2xl font-black">45s</span>
//                 <p className="mt-1 text-sm text-white/90">Video courte</p>
//               </div>

//               <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-white backdrop-blur-sm">
//                 <span className="block text-2xl font-black">2 a 6</span>
//                 <p className="mt-1 text-sm text-white/90">Etapes simples</p>
//               </div>

//               <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-white backdrop-blur-sm">
//                 <span className="block text-2xl font-black">Officiel</span>
//                 <p className="mt-1 text-sm text-white/90">Campus et entreprises</p>
//               </div>
//             </div>
//           </div>

//           <div className="order-1 flex justify-center lg:order-2">
//             <div className="w-[240px] rotate-[-8deg] rounded-[30px] bg-zinc-900 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.22)] xs:w-[260px] sm:w-[300px] md:w-[340px]">
//               <div
//                 className="relative flex h-[460px] flex-col justify-between overflow-hidden rounded-[24px] bg-cover bg-center p-4 sm:h-[540px] sm:p-5 md:h-[620px] md:p-6"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(180deg, rgba(244,194,13,0.78), rgba(255,255,255,0.88)), url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80')",
//                 }}
//               >
//                 <div className="flex items-center justify-between text-white">
//                   <span className="text-base font-black sm:text-lg md:text-xl">
//                     16:50
//                   </span>
//                   <div className="flex items-center gap-2 text-xs font-medium sm:text-sm">
//                     <span>4G</span>
//                     <span>100%</span>
//                   </div>
//                 </div>

//                 <div className="mb-10 flex flex-col items-center sm:mb-14 md:mb-16">
//                   <h2 className="mb-6 text-center text-4xl font-black uppercase italic text-white sm:text-5xl md:text-6xl">
//                     TEKTAL
//                   </h2>

//                   <Link
//                     to="/login"
//                     className="rounded-full bg-white px-6 py-3 text-base font-bold text-[#132a6a] shadow-[0_12px_30px_rgba(19,42,106,0.16)] transition hover:scale-[1.02] sm:px-8 sm:py-4 sm:text-xl"
//                   >
//                     Suivant -&gt;
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="mx-auto max-w-7xl px-4 pb-14 pt-4 sm:px-6 md:px-8 lg:px-10 lg:pb-20">
//         <div className="mb-8 text-center lg:text-left">
//           <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
//             Comment ca marche
//           </h2>
//           <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
//             La premiere version de Tektal se concentre sur un usage tres simple :
//             creer un chemin, le publier, le partager et le suivre etape par etape.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//           <div className="rounded-3xl border border-yellow-200 bg-white/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.06)] backdrop-blur-sm">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c20d] text-lg font-black text-white">
//               01
//             </div>
//             <h3 className="text-xl font-extrabold text-slate-900">
//               Creer un chemin
//             </h3>
//             <p className="mt-3 text-base leading-7 text-slate-600">
//               Filme un trajet, ajoute les etapes et publie un parcours simple a
//               suivre.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-yellow-200 bg-white/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.06)] backdrop-blur-sm">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c20d] text-lg font-black text-white">
//               02
//             </div>
//             <h3 className="text-xl font-extrabold text-slate-900">
//               Partager rapidement
//             </h3>
//             <p className="mt-3 text-base leading-7 text-slate-600">
//               Envoie ton chemin par lien public ou via WhatsApp en quelques
//               secondes.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-yellow-200 bg-white/80 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.06)] backdrop-blur-sm md:col-span-2 xl:col-span-1">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c20d] text-lg font-black text-white">
//               03
//             </div>
//             <h3 className="text-xl font-extrabold text-slate-900">
//               Suivre et arriver
//             </h3>
//             <p className="mt-3 text-base leading-7 text-slate-600">
//               L'utilisateur suit les etapes visuelles pour atteindre sa
//               destination sans appel.
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 flex flex-col gap-5 rounded-[28px] bg-gradient-to-r from-[#f4c20d] to-[#ffd754] px-5 py-6 shadow-[0_20px_50px_rgba(217,164,0,0.18)] sm:px-7 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h3 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">
//               Un MVP pense pour le terrain
//             </h3>
//             <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
//               Bakeli, ecoles, campus, entreprises : Tektal transforme un simple
//               trajet en experience de guidage visuelle, partageable et immediate.
//             </p>
//           </div>

//           <Link
//             to="/signup"
//             className="w-full rounded-full bg-white px-7 py-4 text-center text-base font-extrabold text-[#132a6a] shadow-[0_18px_40px_rgba(19,42,106,0.16)] transition hover:-translate-y-1 sm:w-auto sm:text-lg"
//           >
//             Explorer le produit
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }
