import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie'
import { DataContextProvider } from './lib/dataContext'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </CookiesProvider>
  </StrictMode>
)


