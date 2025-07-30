import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/students/signIn'
import AdminLogin from './pages/admin/signIn'
import AdminRegister from './pages/admin/register'
import StudentRegister from './pages/students/register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<LoginPage />}/>
        <Route path="/admin-signIn" element={<AdminLogin />}/>
        <Route path="/admin-register" element={<AdminRegister />}/>
        <Route path="/student-register" element={<StudentRegister />}/>
      // add your pages here
      </Routes>
    </BrowserRouter>
  </StrictMode>
)


