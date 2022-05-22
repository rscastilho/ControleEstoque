import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const ToastMessage = (props) => {
    
  
    useEffect(()=>{
    toast.success(props.mensagem, {autoClose: 2000})
}, [])


  return (
    <div>

        
        
    </div>
  )
}

export default ToastMessage