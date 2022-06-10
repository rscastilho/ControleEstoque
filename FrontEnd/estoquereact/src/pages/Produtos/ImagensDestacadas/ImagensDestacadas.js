import React, { useEffect, useState } from 'react'
import styles from './ImagensDestacadas.module.css'
import { getAll } from '../../../Services/crudApi'
import { UtilService } from '../../../Services/util'


const ImagensDestacadas = () => {

    const [imagens, setImagens] = useState([]);
   

    const getImagensDestacadas = () => {
        getAll('produtos/imagemdestaque').then((resultado) => {
            setImagens(resultado.data);
        })
    }
    
    useEffect(() => {
        getImagensDestacadas();

    }, [])

    return (
        
        <div className={`${styles.principal}`}>
            <div className='card'>
            <div className={`${styles.imagensLista}`}>
                {imagens && imagens.map((img) => (
                    <>
                        <img
                            className={`${styles.imagens}`}
                            src={UtilService.localImagem(img.imagemDestaque)} alt={img.imagemDestaque}
                        />
                    </>
                )).sort()}

            </div>

            </div>
        </div>
    )
}

export default ImagensDestacadas