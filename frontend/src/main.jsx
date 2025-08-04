import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/students/signIn'
import CreateCompanies from './pages/admin/create-companies'
import UpdateCompanies from './pages/admin/update-companies'
import StudentProfileUpdate from './pages/students/profile'
import AdminProfileUpdate from './pages/admin/profile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<LoginPage />} />
        <Route path='/admin/create-companies' element={<CreateCompanies />} />
        <Route path='/admin/update-companies' element={<UpdateCompanies/>} />
        <Route path='/students/profile' element={<StudentProfileUpdate/>}/>
        <Route path='/admin/profile' element ={<AdminProfileUpdate/>}/>
      // add your pages here
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


