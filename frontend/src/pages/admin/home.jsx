import React from 'react'
import { Header } from '@/components/header'
import { Link, useNavigate } from 'react-router'
import { LayoutDashboard, GraduationCap,  Settings, FileText, Handshake, CalendarDays, Building, Server, TableProperties, ShieldUser } from 'lucide-react'
import { useAuth } from '@/lib/dataContext'

export default function AdminHome() {
  const {  currentUser } = useAuth()

  const navlinks = [
    { name: "Dashboard", icon: <LayoutDashboard className="text-xl" />, path: "/admin/dashboard" },
    { name: "Students", icon: <GraduationCap className="text-xl" />, path: "/admin/view-students" },
    { name: "Companies", icon: <Building className="text-xl" />, path: "/admin/view-companies" },
    { name: "Internships", icon: <Handshake className="text-xl" />, path: "/admin/view-internships" },
    { name: "Calendar", icon: <CalendarDays className="text-xl" />, path: "/coming-soon" },
    { name: "Appointment", icon: <TableProperties className="text-xl" />, path: "/admin/view-appointments" },
    { name: "Document", icon: <FileText className="text-xl" />, path: "/coming-soon" },
    { name: "Techstacks", icon: <Server className="text-xl" />, path: "/coming-soon" },
    { name: "Skills", icon: <ShieldUser className="text-xl" />, path: "/coming-soon" },
    { name: "Settings", icon: <Settings className="text-xl" />, path: "/admin/profile" },


  ];

  return (
    <div className='min-h-screen'>

      <Header hideSearchbar={true} currentUser={currentUser} CloseSidebar={null} />
      <div className="bg-gray-100 h-[calc(100vh-68.8px)] grid justify-center  items-center">


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {navlinks.map((link) => (

            <Link to={link.path} key={link.name}>
              <div
                key={link.name}
                className="bg-white shadow-md rounded-xl p-6 w-40 h-32 flex flex-col items-center justify-center hover:shadow-lg transition">
                <div className="text-blue-600 mb-2">{link.icon}</div>
                <span className="text-gray-800 text-center text-xl font-medium">
                  {link.name}
                </span>
              </div>

            </Link>
          ))}

        </div>
      </div>
    </div>
  )
}
