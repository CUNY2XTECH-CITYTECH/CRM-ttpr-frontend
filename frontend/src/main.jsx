import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/students/signIn'
import InternshipForm from './pages/admin/internshipForm.jsx'
import AdminLogin from './pages/admin/signIn'
import Register from './pages/register'
import CreateCompanies from './pages/admin/create-companies'
import UpdateCompanies from './pages/admin/update-companies'
import StudentProfileUpdate from './pages/students/profile'
import AdminProfileUpdate from './pages/admin/profile'
import StudentOnboarding from './pages/students/studentOnboarding'
import Appointment from './pages/admin/appointment'
import AdminHome from './pages/admin/home'
import MultiStepForm from './pages/students/multistep-form'
import StudentHome from './pages/students/home'
import Skills from './pages/admin/skills' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminHome/>} />
        <Route path="/signIn" element={<LoginPage />}/>
        <Route path="/admin-signIn" element={<AdminLogin />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/admin/create-companies' element={<CreateCompanies />} />
        <Route path='/admin/update-companies' element={<UpdateCompanies/>} />
        <Route path='/student/profile' element={<StudentProfileUpdate/>}/>
        <Route path='/admin/profile' element ={<AdminProfileUpdate/>}/>
      // add your pages here
        <Route path="/admin/create-internships" element={<InternshipForm />} />
        <Route path='/admin/create-appointments' element={<Appointment />} />
        {/* <Route path="/admin" element={<AdminHome/>} /> */}
        <Route path="/student" element={<StudentHome />} />
        <Route path="/form" element={<MultiStepForm/>} />
        <Route path="/admin/skills" element={<Skills />} />
        <Route path="/onboard" element={<StudentOnboarding/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)


