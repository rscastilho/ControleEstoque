import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useState, useEffect, useContext } from 'react';
import { FaReact, FaSignOutAlt, FaShoppingCart, FaCoins } from 'react-icons/fa'
import { AutContext } from '../../context/AutContext'
import { UtilService } from '../../Services/util'


const Navbar = () => {

  const navigate = useNavigate()
  const { authentication, setAuthentication, perfil, setPerfil } = useContext(AutContext)
  const [botaoMenu, setBotaoMenu] = useState(<FaSignOutAlt />)
  const [botaoPedido, setBotaoPedido] = useState(<FaCoins size={25} color="blue" />)

  const consultarPedidos = useCallback(() => {
    navigate('/pedidos')

  }, [])

  useEffect(() => {
    authentication ? setBotaoMenu(<FaSignOutAlt className={styles.logout} />) : setBotaoMenu('Login')

  }, [authentication])

  useEffect(() => {
    setPerfil(+localStorage.getItem('@perfil'))

  }, [perfil, setPerfil])

  const handleLogof = () => {
    localStorage.clear();
    setAuthentication(false)
    navigate('/home')

    setBotaoMenu('Login')
  }

  const handleLogin = () => {
    localStorage.clear();
    navigate('/login')
    setAuthentication(false)
  }


  return (
    <nav className={`navbar navbar-light ${styles.navbar}`}>
      <div>
        <h5>
          <Link className={styles.links} to={'/'}>
            <FaReact className={styles.icone} /> <span className={`${styles.tituloLogo}`}>myApp</span>
          </Link>
        </h5>
      </div>
      <div></div>
      <div>
        <span className={styles.email}>{JSON.parse(localStorage.getItem('@email'))}</span>

        <button className='btn btn-outline' onClick={consultarPedidos}>{botaoPedido}</button>

        {authentication ?
          <>
            <div className={`${styles.botoes}`}>
              {localStorage.getItem('carrinho') &&
                <Link to='/carrinho'>
                  <FaShoppingCart size={25} className='ms-2' color='blue' />
                  <span class="translate-middle badge rounded-pill bg-danger ms-1">
                    {JSON.parse(localStorage.getItem("carrinho")).length}
                  </span>
                </Link>

              }
              <span className={`${styles.perfil}`}>{UtilService.validaPerfil(perfil)}</span>
              <button className='btn btn-outline' onClick={handleLogin}>{botaoMenu}</button>
            </div>
          </>
          :
          <>
            <button className='btn btn-outline' onClick={handleLogof}>{botaoMenu}</button>
          </>
        }

      </div>

    </nav>
  )
}

export default Navbar