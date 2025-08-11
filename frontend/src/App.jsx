import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/login'
import InternshipForm from './pages/admin/internshipForm.jsx'
import Register from './pages/register'
import CreateCompanies from './pages/admin/create-companies'
import UpdateCompanies from './pages/admin/update-companies'
import StudentProfileUpdate from './pages/students/profile'
import AdminProfileUpdate from './pages/admin/profile'
import StudentOnboarding from './pages/students/studentOnboarding'
import CreateDepartments from './pages/admin/create-departments'
import UpdateDepartments from './pages/admin/update-departments'
import Appointment from './pages/admin/appointment'
import AdminHome from './pages/admin/home'
import StudentHome from './pages/students/home'
import MultiStepForm from './pages/students/multistep-form'
import Waiting from './pages/admin/waiting'
import InfoPage from './pages/info-page'
import { Toaster } from "react-hot-toast";
import { useAuth } from "./lib/authContext.jsx";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/login" element={<LoginPage />}/>
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
        <Route path="/admin/waiting" element={<Waiting/>}/>
        <Route path="/error" element={<InfoPage/>}/>
        <Route path="/account-exists" element={<InfoPage/>}/>
        <Route path="/form" element={<MultiStepForm/>} />
        <Route path="/onboard" element={<StudentOnboarding/>} />
      </Routes>
        <Toaster/>
    </BrowserRouter>

    </>
  );
}

export default App;
