import React from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Select } from '@radix-ui/react-select'
import { useState } from 'react'
import { LayoutDashboard, GraduationCap, Users, Briefcase, Settings, FileText, Handshake, CalendarDays, Building, Server, TableProperties, ShieldUser} from 'lucide-react'


export default function AdminHome() {
  const navlinks = [
    { name: "Internships", icon: <Handshake className="text-xl"/> },
    { name: "Calendar", icon: <CalendarDays className="text-xl"/> },
    { name: "Techstacks", icon: <Server className="text-xl" /> },
    { name: "Settings", icon: <Settings className="text-xl" /> },
  ]
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="text-black text-3xl font-bold mb-16 text-center">
        WELCOME "ADD BACKEND NAME"
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {navlinks.map((link) => (
          <div
            key={link.name}
            className="bg-white shadow-md rounded-xl p-6 w-40 h-32 flex flex-col items-center justify-center hover:shadow-lg transition">
            <div className="text-blue-600 mb-2">{link.icon}</div>
            <span className="text-gray-800 text-center text-xl font-medium">
              {link.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}