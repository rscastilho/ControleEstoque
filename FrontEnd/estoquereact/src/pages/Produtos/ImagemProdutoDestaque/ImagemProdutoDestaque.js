import React, { useEffect, useState } from 'react'
import styles from './ImagemprodutoDestaque.module.css'
import CarregaImagem from './../../../components/CarregaImagem/CarregaImagem';
import { put } from '../../../Services/crudApi';

const ImagemProdutoDestaque = (props) => {
  const [nomeImagem, setNomeImagem]= useState('')



  const handleSalvarImagem = () => {
    
    
  }

  useEffect(()=>{
    console.log('item carregado', props.item)
    console.log(nomeImagem)
  },[])


  return (
    <div className={`${styles.boxPrincipal}`}>
      <div className={`${styles.imagem}`}>
      
      <CarregaImagem
      imagemDestaque = {props.item.imagemDestaque}
      setImagemDestaque = {props.setImagemDestaque}
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