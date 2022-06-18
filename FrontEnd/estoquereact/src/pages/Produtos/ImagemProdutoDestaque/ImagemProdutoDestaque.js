import React from 'react'
import styles from './ImagemprodutoDestaque.module.css'
import CarregaImagem from './../../../components/CarregaImagem/CarregaImagem';

const ImagemProdutoDestaque = (props) => {
  
  return (
    <div className={`${styles.boxPrincipal}`}>
      <div className={`${styles.imagem}`}>
        <CarregaImagem
          imagemDestaque={props.item.imagemDestaque}
          setImagemDestaque={props.setImagemDestaque}
          setDestacarImagem={props.setDestacarImagem}
          setImagemFile={props.setImagemFile}
        />
      </div>
      <div className={`${styles.botao}`} >
        <button type='button' className={`${styles.botao} btn `}>Salvar</button>
      </div>
    </div>
  )
}

export default ImagemProdutoDestaque