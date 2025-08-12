import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const values = {
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const tok = useContext(AuthContext);
  return tok;
};
