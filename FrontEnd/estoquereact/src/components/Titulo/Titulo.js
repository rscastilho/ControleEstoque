import React from 'react'
import styles from './Titulo.module.css'


const Titulo = ({icone, titulo}) => {
  return (
    <div className='mt-4'>
        <h4>{titulo}</h4>
        <hr className=''/>
    </div>
  )
}

export default Titulo