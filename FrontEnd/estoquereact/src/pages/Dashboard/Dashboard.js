import Titulo from '../../components/Titulo/Titulo'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const cards = [
    { 'descricao': 'Status estoque', "link": "/statusestoque" },
    { 'descricao': 'Carregamento dinamico tabelas', "link": "/testes" },
    { 'descricao': 'Categorias cadastradas', "link": "/statusestoque" },
    { 'descricao': 'Produtos cadastrados', "link": "/statusestoque" },

  ]

  return (
    <>
      <Titulo titulo={'Dashboard'} />
      <div className={`${styles.dashboard} col-12`}>
        {cards.map((card, key) => (
          <div key={key} className='card w-25'>
            <div className='card-header p-4'></div>
            <div className='card-body p-4 '>
              <Link
               to={card.link}
               className={`${styles.link}`}
               >
                {card.descricao}
              </Link>
            </div>
            <div className='card-footer p-4'></div>
          </div>
        ))}
      </div>

    </>
  )
}

export default Dashboard