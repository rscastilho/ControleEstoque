import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useState, useEffect, useContext } from 'react';
import { FaReact, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa'

import { AutContext } from '../../context/AutContext'


const Navbar = () => {

  const navigate = useNavigate()
  const { authentication, setAuthentication, itensCarrinho } = useContext(AutContext)


  const [botaoMenu, setBotaoMenu] = useState(<FaSignOutAlt />)

  useEffect(() => {
    authentication ? setBotaoMenu(<FaSignOutAlt className={styles.logout} />) : setBotaoMenu('Login')
  }, [authentication])

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
            <FaReact className={styles.icone} /> myApp
          </Link>
        </h5>
      </div>
      <div></div>
      <div>
        <span className={styles.email}>{JSON.parse(localStorage.getItem('@email'))}</span>
        {authentication ?
        <>
        <div className={`${styles.botoes}`}>
          {localStorage.getItem('carrinho') &&
          <Link to='/carrinho'>
            <FaShoppingCart size={25} className='ms-2' color='blue' />
          </Link>
                    }
          <button className='btn btn-outline' onClick={handleLogin}>{botaoMenu}</button> 
        </div>
        </>
          :
          <button className='btn btn-outline' onClick={handleLogof}>{botaoMenu}</button>

        }
      </div>

    </nav>
  )
}

export default Navbar