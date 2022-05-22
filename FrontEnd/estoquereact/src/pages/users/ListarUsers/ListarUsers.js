import React, { useEffect, useState } from 'react'
import WebApi from '../../../api/WebApi';
import styles from './ListarUsers.module.css'
import {FaUser, FaUserCircle} from 'react-icons/fa'

const ListarUsers = () => {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        // const aut = `bearer ${JSON.stringify(localStorage.getItem(('token')))}`
        const getAllUsers = async () => {
            await WebApi.get('Usuarios').then((resultado) => {
                setItens(resultado.data)
            }).catch((error) => console.log(error.message))
        }
        getAllUsers()
    }, [])
    return (
        <div>
            
            <div className='container-fluid mt-4 col-sm'>
                <h4> Usuarios Cadastrados</h4>
                <hr />
               
               
            <table className='table table-hover table-responsive-sm'>
                <thead>
                    <tr>
                        <th></th>
                        <th> Nome</th>
                        <th> email</th>
                        <th> CPF</th>
                        <th> Ação</th>
                    </tr>
                </thead>
                <tbody>

                    {itens.map((item)=>(
                    <tr key={item.id}>
                        <td><FaUserCircle size={28}/></td>
                        <td>{item.nome}</td>
                        <td>{item.email}</td>
                        <td>{item.cpf}</td>
                        
                        <td>
                            <button className='btn btn-outline-warning btn-sm '>Edit</button>
                            <button className='btn btn-outline-danger btn-sm '>Delete</button>
                        </td>
                    </tr>
                        ))}
            
               </tbody>
            </table>
            <hr />
                <span className={styles.quantidade}>
                    {itens.length}<span> registros encontrados</span>
                </span>
            </div>

        </div>
    )
}

export default ListarUsers