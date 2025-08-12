import React, { useEffect } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Select } from '@radix-ui/react-select'
import { useState } from 'react'
import { LayoutDashboard, GraduationCap, Users, Briefcase, Settings, FileText, Handshake, CalendarDays, Building, Server, TableProperties, ShieldUser } from 'lucide-react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useClient, useAuth } from '@/lib/dataContext'
import { fetchUserData } from '@/lib/commonFunctions'


export default function StudentHome() {
  const { token, currentUser } = useAuth()
  const { client } = useClient()
  const navigate = useNavigate()
  const navlinks = [
    { name: "Internships", icon: <Handshake className="text-xl" />, path: '/internships' },
    { name: "Calendar", icon: <CalendarDays className="text-xl" />, path: '/calendar' },
    { name: "Techstacks", icon: <Server className="text-xl" />, path: '/techstacks' },
    { name: "profile", icon: <Settings className="text-xl" />, path: '/profile' },
  ]
  useEffect(() => {
    if (currentUser && currentUser.role !== 'student') {
      navigate('/not-authorized')
    }
    if (!token) {
      navigate('/login')
    }

  }, [token])

  return (
    <div className='min-h-screen'>
      <Header hideSearchbar={true} currentUser={currentUser} CloseSidebar={null} />
      <div className="bg-gray-100 h-[calc(100vh-68.8px)] grid justify-center  items-center">

        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
          {navlinks.map((link) => (

            <a href={link.path} key={link.name}>
              <div
                key={link.name}
                className="bg-white cursor-pointer shadow-md rounded-xl p-6 w-40 h-32 flex flex-col items-center justify-center hover:shadow-lg transition">
                <div className="text-blue-600 mb-2">{link.icon}</div>
                <span className="text-gray-800 text-center text-xl font-medium">
                  {link.name}
                </span>
              </div>

            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
