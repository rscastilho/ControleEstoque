import { createContext, useEffect, useState } from "react";
import WebApi from './../api/WebApi';

export const AutContext = createContext();

export const AutContextProvider = ({children}) => {
      const [authentication, setAuthentication] = useState(false);
      const [itensCarrinho, setItensCarrinho]= useState(0);
      
            
      useEffect(()=>{
            const autent = localStorage.getItem('token');
            if(autent){
                  setAuthentication(true);
                  WebApi.defaults.headers.Authorization = `Bearer ${JSON.parse(autent)}`;
             }
            },[])
            
     
      return (
      <AutContext.Provider 
      value={{
            authentication, 
            setAuthentication, 
            itensCarrinho, 
            setItensCarrinho
            }}>
      {children}
      {console.log("carrinhoContext",itensCarrinho)}
      </AutContext.Provider>


      )
}



