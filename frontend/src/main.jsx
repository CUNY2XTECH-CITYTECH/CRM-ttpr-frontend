import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './lib/authContext'
import { CookiesProvider } from 'react-cookie'
import { DataContextProvider } from './lib/dataContext'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <DataContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </DataContextProvider>
    </CookiesProvider>
  </StrictMode>
)


