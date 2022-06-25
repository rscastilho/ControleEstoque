import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import Titulo from '../../../components/Titulo/Titulo'
import { getAll } from './../../../Services/crudApi';
import styles from './DashboardProdutos.module.css'




const DashboardProdutos = () => {
  const [contador, setContador] = useState('')

  const contadorProdutos = useCallback(() => {
    getAll('produtos/contador').then((resultado) => {
      setContador(resultado.data)
    })
  }, [])


  useMemo(() => {
    contadorProdutos()
  }, [])

  return (
    <>
      <Titulo titulo={"Dashboard de produtos"} />
      <div className={`${styles.principal}`}>
        <div className='card w-50'>
          <div className='card-body shadow-sm m-3 p-3'>
            {contador} produtos cadastrados.
          </div>
          <div className='card-body shadow-sm m-3 p-3'>
            <Link to="/dashboard/statusestoque">
            Consultar status do Estoque
            </Link>
          </div>

          <div className='card-body shadow-sm m-3 p-3'>
            XXX - produto mais comprado.
          </div>

          <div className='card-body shadow-sm m-3 p-3'>
            XXX - Top 10 produtos mais comprados.
          </div>

          <div className='card-body shadow-sm m-3 p-3'>
            XXX - produtos com estoque zero.
          </div>

          <div className='card-body shadow-sm m-3 p-3'>
            XXX - Valor por produtos.
          </div>

        </div>
      </div>
      
      <div className='mt-4'>
                            <Link to="/dashboard">
                                <button className='btn btn-warning'>Voltar</button>
                            </Link>
                            <Link to="/">
                                <button className='btn ms-5'>Topo</button>
                            </Link>
                        </div>
    </>
  )
}

export default DashboardProdutos