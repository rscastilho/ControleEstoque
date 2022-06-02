import { createContext, useEffect, useState } from "react";
import WebApi from './../api/WebApi';

export const AutContext = createContext();

export const AutContextProvider = ({ children }) => {
      const [authentication, setAuthentication] = useState(false);
      const [itensCarrinho, setItensCarrinho] = useState(0);
      const [perfil, setPerfil] = useState('');

      useEffect(() => {
            const autent = localStorage.getItem('token');
            setPerfil(JSON.parse(localStorage.getItem('@perfil')))

            if (autent) {
                  setAuthentication(true);
                  WebApi.defaults.headers.Authorization = `Bearer ${JSON.parse(autent)}`;
            }
      }, [])

      return (
            <AutContext.Provider
                  value={{
                        authentication,
                        setAuthentication,
                        itensCarrinho,
                        setItensCarrinho,
                        perfil, 
                        setPerfil
                  }}>
                  {children}
            </AutContext.Provider>
      )
}



