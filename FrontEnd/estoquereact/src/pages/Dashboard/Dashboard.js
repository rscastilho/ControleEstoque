import Titulo from '../../components/Titulo/Titulo'
import styles from './Dashboard.module.css'
import GraphQtdProdutos from '../Graficos/Produtos/GraphQtdProdutos';

const Dashboard = () => {

  return (
  <>
      <Titulo titulo={'Dashboard'} />
    <div className={`${styles.areaGrafico}`}>
        {/* <GraphQtdProdutos/> */}
    </div>
  </>
  )
}

export default Dashboard