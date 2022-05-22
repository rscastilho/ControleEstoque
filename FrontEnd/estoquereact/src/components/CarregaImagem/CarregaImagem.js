import React, { useState } from 'react'
import styles from './CarregaImagem.module.css'
import error from '../../assets/error-img.jpg'

const CarregaImagem = (props) => {
  const [carregaImagem, setCarregaImagem] = useState();
  const [imagemUrl, setImagemUrl] = useState('');

  // const handleCarregaImagem = (e) => {
  //   e.preventDefault();

  //   if (e.target.files[0]) {
  //     const image = e.target.files[0];
  //     if (image.type === 'image/jpeg' || image.type === 'image/png') {
  //       setCarregaImagem(URL.createObjectURL(e.target.files[0]))
  //       const imagemName = e.target.value;
  //       const nomeFinal = imagemName.slice(12).trim();
  //       props.setImagemUrl(nomeFinal)
  //     }
  //   }
  // }

  const handleCarregaImagem = (e) => {
    e.preventDefault();

    
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setCarregaImagem(URL.createObjectURL(e.target.files[0]))
         const imagemName = e.target.value;
        const nomeFinal = imagemName.slice(12).trim();
         setImagemUrl(nomeFinal)
         
        }
        console.log(imagemUrl)
      
    }
  }

  return (
    <div>
      <div className={`${styles.caixaImagem}`}  >
        {carregaImagem ?
          <img
            className={`${styles.imagem}`}
            src={`${carregaImagem}`}
            alt='imagem' />
          :
          <img
            className={`${styles.imagem}`}
            src={`https://localhost:5001/recursos/imagens/${props.imagemUrl}`}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = error
            }}
            alt={imagemUrl} />
        }
      </div>
      <div className={`${styles.caixaImagem}`}  >
        <input className='btn btn-sm mt-2' accept='image/*' type='file' onChange={handleCarregaImagem} />

      </div>
    </div>
  )
}

export default CarregaImagem