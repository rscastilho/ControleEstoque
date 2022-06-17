import Titulo from '../../components/Titulo/Titulo'
import styles from './Dashboard.module.css'
import { useState, useCallback, useMemo } from 'react';
import GraphValoresProdutos from '../Graficos/Produtos/GraphValoresProdutos';
import { getAll } from '../../Services/crudApi.js'
import GraphQtdProdutos from '../Graficos/Produtos/GraphQtdProdutos';
import Loading from '../../components/Loading/Loading';


const Dashboard = () => {


  return (
    <div className={`${styles.areaGrafico}`}>
      <Titulo titulo={'Dashboard'} />
        <GraphQtdProdutos/>
    </div>
  )
}

export default Dashboard