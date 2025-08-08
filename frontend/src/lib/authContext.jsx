import { getData } from "@/utils/http-methods";
import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)
  const login = (tk, em) => {
    setEmail(em)
    setToken(tk)
  }
  const logout = () => {
    setEmail(null)
    setToken(null)
  }
  const values = {
    token, login, logout, email,
    isAuthenticated,
    setIsAuthenticated
  }
  useEffect(() => {
    setToken(cookies.access_token)
  }, [])

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}
export const useAuth = () => {
  return useContext(AuthContext)
}
