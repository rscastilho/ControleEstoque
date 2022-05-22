import React from 'react'
import styles from './ItensPorPagina.module.css'

const ItensPorPagina = (props) => {
    return (
        <div className={`${styles.itensPagina}`}>
            <div>
                <select className="form-select-sm" aria-label="Default select example" onChange={
                    (e) => {
                        props.setItensPorPagina(e.target.value)
                        props.setLoop(!props.loop)
                    }}>
                    <option defaultValue value="5"> 5 </option>
                    <option className="10" >10</option>
                    <option className="20">20</option>
                    <option className="50">50</option>
                </select>
            </div>
            <span className='ms-4'>
                {props.itens} - registros carregados
            </span>

        </div>



    )
}

export default ItensPorPagina