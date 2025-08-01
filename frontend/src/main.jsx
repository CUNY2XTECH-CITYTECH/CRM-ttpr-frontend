import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/students/signIn'
import AdminLogin from './pages/admin/signIn'
import AdminRegister from './pages/admin/register'
import StudentRegister from './pages/students/register'
import CreateCompanies from './pages/admin/create-companies'
import UpdateCompanies from './pages/admin/update-companies'
import AdminHome from './pages/admin/home'
import StudentHome from './pages/students/home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<LoginPage />}/>
        <Route path="/admin-signIn" element={<AdminLogin />}/>
        <Route path="/admin-register" element={<AdminRegister />}/>
        <Route path="/student-register" element={<StudentRegister />}/>
        <Route path="/signIn" element={<LoginPage />} />
        <Route path='/admin/create-companies' element={<CreateCompanies />} />
        <Route path='/admin/update-companies' element={<UpdateCompanies/>} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/studentHome" element={<StudentHome />} />
      {/* add your pages here */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)


