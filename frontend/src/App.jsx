import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/login'
import Register from './pages/register'
import CreateCompanies from './pages/admin/create-companies'
import UpdateCompanies from './pages/admin/update-companies'
import StudentProfileUpdate from './pages/students/profile'
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
import JobApplication from "./pages/students/job-application";
import Internships from "./pages/students/internships";
import ViewCompanies from "./pages/admin/view-companies";
import CreateInternships from "./pages/admin/create-internships";
import AdminProfile from "./pages/admin/profile";
import Dashboard from "./pages/admin/dashboard";
import ViewAppointments from "./pages/admin/view-appointments";
import ViewStudents from "./pages/admin/view-students";
import ViewStaff from "./pages/admin/view-staffs";
import ViewInternships from "./pages/admin/view-internships";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/admin/create-companies' element={<CreateCompanies />} />
          <Route path='/admin/update-companies' element={<UpdateCompanies />} />
          <Route path='/admin/view-students' element={<ViewStudents />} />
          <Route path='/admin/view-staffs' element={<ViewStaff />} />

          <Route path='/admin/profile' element={<AdminProfile />} />
          <Route path="/admin/create-internships" element={<CreateInternships />} />
         <Route path="/admin/view-internships" element={<ViewInternships/>} />

          <Route path='/admin/create-appointments' element={<Appointment />} />
          < Route path='/admin/view-appointments' element={<ViewAppointments/>} />


          <Route path='/admin/view-companies' element={<ViewCompanies />} />
          <Route path="/admin/waiting" element={<Waiting />} />
          <Route path="/admin" element={<AdminHome/>} /> 
          <Route path="/" element={<StudentHome />} />
          <Route path='/profile' element={<StudentProfileUpdate />} />
          <Route path="/form" element={<MultiStepForm />} />
          <Route path="/onboard" element={<StudentOnboarding />} />
          <Route path="/error" element={<InfoPage />} />
          <Route path="/not-authorized" element={<InfoPage />} />
          <Route path="/account-exists" element={<InfoPage />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/apply/:id" element={<JobApplication />} />

        </Routes>
        <Toaster />
      </BrowserRouter>

    </>
  );
}

export default App;
