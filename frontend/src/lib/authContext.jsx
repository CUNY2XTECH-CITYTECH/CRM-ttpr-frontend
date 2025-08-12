import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [user, setUser] = useState(null)

  const login = (info) => {
    setUser(info)
  }

  const logout = () => {
    setUser(null)
  }
  const values = {
    token: cookies.access_token, login, logout, user
  }

  return <AuthContext.Provider value={values}>
    {children}
  </AuthContext.Provider>

}
export const useAuth = () => {
  const tok = useContext(AuthContext)
  console.log(tok, 'token')
  return tok
}
