import React,{ useContext } from "react"
import { Navigate,Outlet } from "react-router-dom"
import {useAuth} from '@/lib/dataContext'
function ProtectedRoute({allowRoutes}) {
 const {currentUser,loading,token} = useAuth()
  if(!token){
    return <Navigate to="/login" replace/>
  }
  if(loading){
    return <div>Loading...</div>
  }
  if(currentUser && allowRoutes.includes(currentUser.role)){
  return <Outlet/> 
  }
  return <Navigate to="/not-authorized" replace/>
}

export default ProtectedRoute
