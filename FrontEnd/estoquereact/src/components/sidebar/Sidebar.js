import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Routs from '../../routes/Routs'
import styles from './Sidebar.module.css'
import { FaUserCircle, FaIndustry, FaInstalod, FaBeer, FaDashcube } from 'react-icons/fa'
import { AutContext } from '../../context/AutContext'


const Sidebar = () => {
  const { perfil } = useContext(AutContext);

  return (
    <div className='row row-cols-sm-auto'>

      {perfil === 0 &&
        <>
          <div className={`${styles.sideBar} mt-0 navegacao d-none d-md-block  col-sm-2 col-md-2`}>
            <ul className='list-group mt-4'>

              <div>
                <Link className={styles.menu} to='/listarprodutos'>
                  <li className='list-group-item border-0 p-3 d-m d-no' >
                    <FaBeer className={styles.icone} />
                    Produtos
                  </li>
                </Link>
              </div>

              <div>
                <Link className={styles.menu} to='/listagemcategorias'>
                  <li className='list-group-item border-0 p-3'>
                    <FaInstalod className={styles.icone} />
                    Categorias
                  </li>
                </Link>
              </div>

              <div>
                <Link className={styles.menu} to='/listagemfornecedores'>
                  <li className='list-group-item border-0 p-3'>
                    <FaIndustry className={styles.icone} />
                    Fornecedores
                  </li>
                </Link>
              </div>

              <div>
                <Link className={styles.menu} to='/listagemusuarios'>
                  <li className='list-group-item border-0 p-3'>
                    <FaUserCircle className={styles.icone} />
                    Usuarios
                  </li>
                </Link>
              </div>
              <div>
                <Link className={styles.menu} to='/dashboard'>
                  <li className='list-group-item border-0 p-3'>
                    <FaDashcube className={styles.icone} />
                    Dashboard
                  </li>
                </Link>
              </div>

            </ul>
          </div>
        </>
      }

      <div className='conteudo col-sm col-md col-lg col-xl'>
        <Routs />
      </div>

    </div>
  )
}

export default Sidebar