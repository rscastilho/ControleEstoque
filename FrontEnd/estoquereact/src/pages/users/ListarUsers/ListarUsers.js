import React, { useEffect, useState } from 'react'
import WebApi from '../../../api/WebApi';
import styles from './ListarUsers.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { UtilService } from '../../../Services/util';
import Titulo from '../../../components/Titulo/Titulo';

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
                <Titulo titulo={'Usuarios Cadastrados'}/>
                
                <table className='table table-hover table-responsive-sm'>
                    <thead>
                        <tr>
                            <th></th>
                            <th> Nome</th>
                            <th> email</th>
                            <th> CPF</th>
                            <th>Bloqueado</th>
                            <th> Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {itens.map((item) => (
                            <tr key={item.id}>
                                <td><FaUserCircle
                                         size={30} 
                                         color={"blue"}
                                         /></td>
                                <td>{UtilService.getUpperCase(item.nome)}</td>
                                <td>{item.email}</td>
                                <td>{UtilService.cpf(item.cpf)}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={item.blocked ? true : false}
                                        disabled="true"
                                    />
                                </td>

                                <td>
                                    <button className='btn btn-outline-secondary btn-sm'>Editar</button>
                                    <button className='btn btn-outline-danger btn-sm '>Excluir</button>
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