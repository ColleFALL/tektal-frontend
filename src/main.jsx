// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import '../src/styles/index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { PathProvider } from './context/PathContext' // ✅ AJOUT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PathProvider>   {/* ✅ AJOUT ICI */}
        <App />
      </PathProvider>
    </AuthProvider>
  </StrictMode>,
)