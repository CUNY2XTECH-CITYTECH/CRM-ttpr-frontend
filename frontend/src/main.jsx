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
import StudentOnboarding from './pages/students/studentOnboarding'
import CreateDepartments from './pages/admin/create-departments'
import UpdateDepartments from './pages/admin/update-departments'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<LoginPage />}/>
        <Route path="/admin-signIn" element={<AdminLogin />}/>
        <Route path="/register" element={<AdminRegister />}/>
        <Route path="/student-register" element={<StudentRegister />}/>
        <Route path="/signIn" element={<LoginPage />} />
        <Route path='/admin/create-companies' element={<CreateCompanies />} />
        <Route path='/admin/update-companies' element={<UpdateCompanies/>} />
        <Route path='/admin/create-departments' element={<CreateDepartments/>} />
        <Route path='/admin/update-departments' element={<UpdateDepartments/>} />
        <Route path='/students/onboarding' element={<StudentOnboarding/>} />
      // add your pages here
      </Routes>
    </BrowserRouter>
  </StrictMode>
)


