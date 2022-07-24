import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TituloDashboard from '../../../components/TituloDashboard/TituloDashboard'
import { getAll } from '../../../Services/crudApi'
import styles from './DashboardItens.module.css'

const DashboardItens = ({ titulo, descricaoQuantidade, linkListarPedidos, descricaoValoresPedidos, linkValoresPedidos}) => {
    const [quantidade, setQuantidade]= useState(0);

    useEffect(()=>{
        getAll("/dashboard").then((resultado)=>{
          setQuantidade(resultado.data)
        })
      },[])

    return (
        <>
            <TituloDashboard />
            <div className={`${styles.principal}`}>
                <div className='list-group list-group-flush w-75 shadow-sm'>
                    <div className={`list-group-item list-group-item-dark list-group-item-actionp-4`}>
                        <TituloDashboard titulo={titulo} />
                    </div>

                    <div className={`list-group-item p-4  ${styles.item}`}>
                        {quantidade && quantidade.pedidos}  - {descricaoQuantidade}.
                    </div>
                    <div className={`list-group-item p-4  ${styles.item}`}>
                        <Link to={linkListarPedidos}>
                            Listar pedidos
                        </Link>
                    </div>
                    <div className={`list-group-item p-4  ${styles.item}`}>
                        <Link to={linkValoresPedidos}>
                        {descricaoValoresPedidos}
                            
                        </Link>
                    </div>

                </div>
            </div>


        </>
    )
}

export default DashboardItens