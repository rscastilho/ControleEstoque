import React, { useRef, useState } from 'react'
import styles from './CarregaImagem.module.css'
import error from '../../assets/error-img.jpg'

const CarregaImagem = (props) => {
  const [carregaImagem, setCarregaImagem] = useState();
  const [imagemUrl, setImagemUrl] = useState('');
  const openFile = useRef();

  const handleOpenFile = () => {
    console.log(openFile.current.click)
    openFile.current.click()
  }

  const handleCarregaImagem = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setCarregaImagem(URL.createObjectURL(e.target.files[0]))
        formData.append("image", e.target.files[0]);
        props.setImagemFile(formData)
        const imagemName = e.target.value;
        const nomeFinal = imagemName.slice(12).trim();
        setImagemUrl(nomeFinal);
        props.setImagemDestaque(nomeFinal);
        props.setDestacarImagem(true);

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
            src={`https://localhost:5001/recursos/imagens/${props.imagemDestaque}`}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = error
            }}
            alt={imagemUrl}

            onClick={handleOpenFile}
          />
        }
      </div>
      <div className={`${styles.caixaImagem}`}  >
        <input
          className='btn btn-sm mt-2'
          accept='image/*'
          type='file'
          onChange={handleCarregaImagem}
          ref={openFile} />

      </div>
    </div>
  )
}

export default CarregaImagem