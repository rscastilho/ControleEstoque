import React, { useState } from 'react'
import styles from './CarregarImagens.module.css'

const CarregarImagens = () => {
    const [imagem, setImagem] = useState();
    const [imagem2, setImagem2] = useState();

    const handleImage = (e)=>{
        if(e.target.files[0]){
         const img = e.target.files[0]
         if(img.type === 'image/jpeg' || img.type === 'image/png'){
              setImagem(URL.createObjectURL(e.target.files[0]))
              setImagem2(img)
            //setImagem(img)
            console.log(typeof imagem)
            console.log(typeof imagem2)
            let nomeimagem = e.target.value
            console.log(nomeimagem.slice(12).trim())
            console.log('nome completo',nomeimagem)
         }
        }


    }


  return (

    <div>
    <input type='file' accept='image/*' onChange={handleImage}/><br>
    </br>
    {imagem &&
    < img src={imagem} alt="imagem"/>

    }

    </div>
  )
}

export default CarregarImagens