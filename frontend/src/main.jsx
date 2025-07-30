import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/students/signIn'
import InternshipForm from './pages/admin/internshipForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<LoginPage />} />
        <Route path="/internshipForm" element={<InternshipForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


