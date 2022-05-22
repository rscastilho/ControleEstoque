import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Titulo from '../../../components/Titulo/Titulo';
import styles from './Carrinho.module.css'


const Carrinho = () => {
    const [itens, setItens] = useState([]);
    const [exibirImagem, setExibirImagem] = useState(false)

    const handleLimparCarrinho = () => {
        localStorage.removeItem('carrinho')

    }


    useEffect(() => {

        setItens(JSON.parse(localStorage.getItem('carrinho')))
        console.log(itens)

    }, [])


    return (
        <div className='container'>
            {!itens ?
                <>
                    <Titulo titulo={'Carrinho de compra vazio'} />
                    <Link to='/'>
                        <button className='btn btn-sm btn-primary ' >Continuar comprando</button>
                    </Link>
                </> :
                <>
                    <Titulo titulo={'Carrinho de compra'} />

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th onClick={() => setExibirImagem(!exibirImagem)}><button className='btn btn-sm btn-outline-secondary'>Imagem</button></th>
                                <th> Produtos </th>
                                <th> Quantidade </th>
                                <th> R$ Unitário </th>
                                <th> R$ Total </th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens && itens.map((items) => (
                                <tr >
                                    <td key={items.id}>
                                        {exibirImagem &&
                                            <img src={`https://localhost:5001/recursos/imagens/${items.imagemUrl}`} alt={items.descricao} />
                                        }
                                    </td>
                                    <td>{items.descricao}</td>
                                    <td>{items.quantidade}</td>
                                    <td>R$ {items.valor}</td>
                                    <td> R$ {items.quantidade * items.valor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`${styles.botoes}`}>
                        <div></div>
                        <Link to='/'>
                            <button onClick={() => handleLimparCarrinho()} className='btn btn-sm btn-warning me-2'>Limpar Carrinho</button>
                        </Link>
                        <Link to='/'>
                            <button className='btn btn-sm btn-primary ' >Continuar comprando</button>
                        </Link>
                        <div></div>
                    </div>

                </>
            }
        </div>
    )
}

export default Carrinho