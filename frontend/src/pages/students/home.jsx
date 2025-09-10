import React  from 'react'
import { Link } from 'react-router'
import { Header } from "@/components/header"
import {   Settings, Handshake, CalendarDays,  Server } from 'lucide-react'
import {  useAuth } from '@/lib/dataContext'


export default function StudentHome() {
  const {  currentUser } = useAuth()
  const navlinks = [
    { name: "Internships", icon: <Handshake className="text-xl" />, path: '/internships' },
    { name: "Calendar", icon: <CalendarDays className="text-xl" />, path: '/coming-soon' },
    { name: "Techstacks", icon: <Server className="text-xl" />, path: '/coming-soon' },
    { name: "profile", icon: <Settings className="text-xl" />, path: '/profile' },
  ]
  return (
    <div className='min-h-screen'>
      <Header hideSearchbar={true} currentUser={currentUser} CloseSidebar={null} />
      <div className="bg-gray-100 h-[calc(100vh-68.8px)] grid justify-center  items-center">

        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
          {navlinks.map((link) => (

            <Link to={link.path} key={link.name}>
              <div
                key={link.name}
                className="bg-white cursor-pointer shadow-md rounded-xl p-6 w-40 h-32 flex flex-col items-center justify-center hover:shadow-lg transition">
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
