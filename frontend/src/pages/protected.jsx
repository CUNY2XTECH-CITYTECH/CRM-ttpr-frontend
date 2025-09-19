import React, { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from '@/lib/dataContext'
import '@/styles/animation.css'
function ProtectedRoute({ allowRoutes }) {
  const { currentUser, loading, token } = useAuth()
  console.log(currentUser, 'current user in protected route')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  if (loading) return <div className="h-screen w-full grid items-center justify-items-center"><div className="loader"></div></div>;

  if (currentUser && allowRoutes.includes(currentUser.role)) {
    return <Outlet />
  }
  return <Navigate to="/not-authorized" replace />
}

export default ProtectedRoute

/* HTML: <div class="loader"></div> */

