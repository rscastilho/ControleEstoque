import Titulo from '../../components/Titulo/Titulo'
import styles from './Dashboard.module.css'
import GraphQtdProdutos from '../Graficos/Produtos/GraphQtdProdutos';
import StatusEstoque from '../Produtos/StatusEstoque/StatusEstoque';

const Dashboard = () => {

  return (
  <>
      <Titulo titulo={'Dashboard'} />
    <div className={`${styles.areaGrafico}`}>
        
        <StatusEstoque/>
    </div>
  </>
  )
}

export default Dashboard