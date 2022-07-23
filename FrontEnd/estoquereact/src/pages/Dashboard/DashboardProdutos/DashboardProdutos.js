import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import Titulo from '../../../components/Titulo/Titulo'
import TituloDashboard from '../../../components/TituloDashboard/TituloDashboard';
import BotaoVoltar from '../BotaoVoltar';
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
  }, [contadorProdutos])

  return (
    <>
      <Titulo titulo={"Dashboard produtos"} />
      <div className={`${styles.principal}`}>
        <div className='list-group list-group-flush w-75 shadow-sm'>
          <div className={`list-group-item list-group-item-dark list-group-item-actionp-4`}>
            <TituloDashboard titulo={"Informações sobre produtos"}/>
          </div>

          <div className={`list-group-item p-4  ${styles.item}`}>
            {contador} produtos cadastrados.
          </div>
          <div className={`list-group-item p-4  ${styles.item}`}>
            <Link to="/dashboard/statusestoque">
              Consultar Estoque
            </Link>
          </div>

          <div className={`list-group-item p-4  ${styles.item}`}>
            XXX - produto mais comprado.
          </div>

          <div className={`list-group-item p-4  ${styles.item}`}>
            XXX - Top 10 produtos mais comprados.
          </div>

          <div className={`list-group-item p-4  ${styles.item}`}>
            XXX - produtos com estoque zero.
          </div>

          <div className={`list-group-item p-4  ${styles.item}`}>
            XXX - Valor por produtos.
          </div>

        </div>
      </div>
      <hr />

      <BotaoVoltar
        nome={'Produtos'}
        local={'/listarprodutos'}
      />
    </>
  )
}

export default DashboardProdutos