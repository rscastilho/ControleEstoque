import Titulo from '../../components/Titulo/Titulo'
import styles from './Dashboard.module.css'
import { useEffect, useState, useCallback, useMemo } from 'react';
import GraphValoresProdutos from '../Graficos/Produtos/GraphValoresProdutos';
import { getAll } from '../../Services/crudApi.js'
import GraphQtdProdutos from '../Graficos/Produtos/GraphQtdProdutos';


const Dashboard = () => {

  const [produtos, setProdutos] = useState([]);
  const paginar = 0;
  const itensPorPagina = 100;

  const getAllProdutos = () => {
    getAll(`Produtos?skip=${paginar}&take=${itensPorPagina}`).then((resultado) => {
      setProdutos(resultado.data)
    })
  }

  useMemo(() => {
    getAllProdutos();
    console.log(produtos)
  }, [])


  return (
    <div >
      {produtos &&
        <div className={`${styles.principal}`}>
          <Titulo titulo={'Dashboard'} />
          <div className={`${styles.grafico}`}>
            
              <GraphValoresProdutos
                produtos={produtos}
              />
            </div>
            <div className={`${styles.grafico}`}>
              <GraphQtdProdutos
                produtos={produtos}
              />
            </div>
          
        </div>
      }


    </div>
  )
}

export default Dashboard