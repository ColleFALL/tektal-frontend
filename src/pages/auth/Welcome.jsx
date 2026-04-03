import { useNavigate } from "react-router-dom"

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <h1 className="text-4xl font-bold mb-6">
        Bienvenue sur Tektal 
      </h1>

      <p className="mb-8 text-gray-600">
        Filmer, naviguer et partager facilement
      </p>

      <button
        onClick={() => navigate("/login")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
      >
        Commencer maintenant
      </button>

    </div>
  )
}

export default Welcome