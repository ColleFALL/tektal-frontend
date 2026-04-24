import { BrowserRouter, Routes, Route } from "react-router-dom"

//  AUTH
import Welcome from "../pages/auth/Welcome"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import ForgotPassword from "../pages/auth/ForgotPassword"

//  DASHBOARD
import Accueil from "../pages/dashboard/Accueil"
import Ajouter from "../pages/dashboard/Ajouter"
import Favoris from "../pages/dashboard/Favoris"
import MesChemins from "../pages/dashboard/MesChemins"
import Recherche from "../pages/dashboard/Recherche"
import Profil from "../pages/dashboard/Profil"
import EditProfil from "../pages/dashboard/EditProfil"
import Parametres from "../pages/dashboard/Parametres"
import PathConfirmation from "../pages/dashboard/PathConfirmation"
import StepCreation from "../pages/dashboard/StepCreation"
import VideoPlayer from "../pages/dashboard/VideoPlayer"
import VideoUpload from "../pages/dashboard/VideoUpload"
import Activate from  "../pages/auth/Activate"
import Aide from "../pages/dashboard/Aide" // ✅ ajouté

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/*  PAGE D'ENTRÉE */}
        <Route path="/" element={<Welcome />} />

        {/*  AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/activate" element={<Activate />} />


        {/*  DASHBOARD */}
        <Route path="/home" element={<Accueil />} />
        <Route path="/ajouter" element={<Ajouter />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/mes-chemins" element={<MesChemins />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/edit-profil" element={<EditProfil />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/aide" element={<Aide />} /> {/* ✅ ajouté */}

        {/*  PATH / CREATE */}
        <Route path="/create-path" element={<Ajouter />} />
        <Route path="/step-creation" element={<StepCreation />} />
        <Route path="/confirmation" element={<PathConfirmation />} />

        {/*  VIDEO */}
        <Route path="/video-player" element={<VideoPlayer />} />
        <Route path="/video-upload" element={<VideoUpload />} />

        {/*  FALLBACK */}
        <Route path="*" element={<Welcome />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes