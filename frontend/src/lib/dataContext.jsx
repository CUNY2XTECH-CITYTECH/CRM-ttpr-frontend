import { Client } from "@/api/http-client";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router";
import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";


const DataContext = createContext(null)

export const DataContextProvider = ({ children }) => {

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const token = cookies.access_token
  const client = new Client(token)
  console.log(client, token, 'tf')
  const values = {
    client: client  }
  return <DataContext.Provider value={values}>
    {children}
  </DataContext.Provider>
}

export const useClient = () => {
  const { client } = useContext(DataContext)
  if (!client) {
    console.log('error')
  }
  return {client}
}


