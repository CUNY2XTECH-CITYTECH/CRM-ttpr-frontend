import { Client } from "@/api/http-client";
import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { fetchUserData } from "./commonFunctions";

const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [currentUser, setCurrentUser] = useState(null);
  const token = cookies.access_token;
  const client = new Client(token);

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        const userData = await fetchUserData(client, token);
        if (userData) {
          setCurrentUser(userData.data[0]);
        }
      } else {
        setCurrentUser(null); // Clear user data if no token
      }
    };
    loadData();
  }, [token]); 

  const values = {
    client: client,
    currentUser: currentUser, // Provide the fetched data
    token: cookies.access_token,
    logout,

  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export const useClient = () => {
  const { client} = useContext(DataContext);
  if (client) {
    console.log("error");
  }

  return { client};
};

export const useAuth = () => {
  const { token,currentUser } = useContext(DataContext);
  return { token,currentUser };
};
