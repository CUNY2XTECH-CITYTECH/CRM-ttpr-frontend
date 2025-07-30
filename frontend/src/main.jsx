import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/students/signIn'
import CreateCompanies from './pages/admin/create-companies'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<LoginPage />} />
        <Route path='/admin/create-companies' element={<CreateCompanies />} />
      // add your pages here
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


