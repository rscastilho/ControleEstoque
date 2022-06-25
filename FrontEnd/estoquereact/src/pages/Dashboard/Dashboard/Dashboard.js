import Titulo from '../../../components/Titulo/Titulo'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const cards = [
    { 'descricao': 'Produtos', "link": "/dashboard/produtos" },
    { 'descricao': 'Fornecedores', "link": "/dashboard/statusestoque" },
    { 'descricao': 'Categorias', "link": "/statusestoque" },
    { 'descricao': 'Usuarios', "link": "/statusestoque" },
    { 'descricao': 'Carregamento dinamico tabelas', "link": "/testes" },
    { 'descricao': 'Pedidos', "link": "/statusestoque" },

  ]

  return (
    <>
      <Titulo titulo={'Dashboard'} />
      <div className={`${styles.dashboard}`}>
        {cards.map((card, key) => (
          <div key={key} className='card w-25 text-center shadow-sm'>
            <div className='card-body p-4 alert-secondary m-1 '>
            <hr />
              <Link
                to={card.link}
                className={`${styles.link}`}
              >
                {card.descricao}
              </Link>
            <hr />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Dashboard