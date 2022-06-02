import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Titulo from '../../../components/Titulo/Titulo';
import styles from './Carrinho.module.css'
import { BsPlusCircle, BsFileMinus } from 'react-icons/bs'
import { AutContext } from '../../../context/AutContext';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import UtilService from './../../../Services/util';




const Carrinho = () => {
    const [itens, setItens] = useState([]);
    const [exibirImagem, setExibirImagem] = useState(false)
    const [quantidade, setQuantidade] = useState(0);
    const [loop, setLoop] = useState(false);
    const [valorTotalP, setValorTotal] = useState(0);
    const { setItensCarrinho } = useContext(AutContext);
    let pedido = {};
    let valorTotal = 0;

    const handleFinalizarCompra = () => {

        const usuarioId = JSON.parse(localStorage.getItem('@id'));
        const itensCarrinho = JSON.parse(localStorage.getItem('carrinho'));
        pedido = { usuarioId: usuarioId, itensCarrinho: itensCarrinho, valorTotal: valorTotal }

        localStorage.setItem('@pedido', JSON.stringify(pedido))
    
    }

    useEffect(() => {
        setValorTotal(valorTotal)
    }, [valorTotal])



    const handleLimparCarrinho = () => {
        localStorage.removeItem('carrinho')
        setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
        toast.warning("Carrinho esvaziado com sucesso!", { autoClose: 2000 })


    }

    const handleIncrementaQuantidade = (id) => {

        const carrinho = JSON.parse(localStorage.getItem('carrinho'))
        let encontra = carrinho.find((x => x.id === id))
        if (encontra) {
            if (encontra.quantidade < encontra.quantidadeEstoque) {
                setQuantidade(encontra.quantidade += 1)
                setLoop(true)
            } else {
                toast.warning("Quantidade maxima permitida")
                return
            }
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
        
    }

    const handleDecrementaQuantidade = (id) => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho'))
        let encontra = carrinho.find((x => x.id === id))
        if (encontra) {
            if (encontra.quantidade <= 1) {
                let carrinhoAtualiza = carrinho.filter((x => x.id !== id));
                localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualiza))
                setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
                toast.success("Item removido do carrinho!", { autoClose: 2000 })
                setLoop(true)
                return
            }
            encontra.quantidade -= 1
            setLoop(true)

        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
        }


    useEffect(() => {

        setItens(JSON.parse(localStorage.getItem('carrinho')))
        setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
        setLoop(false)


    }, [loop])


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
                                    <td>
                                        <BsFileMinus className='me-2' size={20}
                                            onClick={() => handleDecrementaQuantidade(items.id)} />
                                        {items.quantidade}
                                        <BsPlusCircle className='ms-2' size={20}
                                            onClick={() => handleIncrementaQuantidade(items.id)}
                                            />
                                    </td>
                                    <td>{items.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td> {(items.quantidade * items.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`${styles.botoes}`}>
                        <div></div>
                        <Link to='/'>
                            <button className='btn btn-sm btn-secondary ' >Continuar comprando</button>
                        </Link>
                        <Link to='/'>
                            <button onClick={() => handleLimparCarrinho()} className='btn btn-sm btn-danger me-2'>Limpar Carrinho</button>
                        </Link>
                        <Link to='/finalizarpedido'>
                            <button className='btn btn-sm btn-primary '
                                onClick={handleFinalizarCompra} >Finalizar compra</button>
                        </Link>
                        <div>
                            {itens.forEach((x) => (valorTotal += (x.valor * x.quantidade)))
                            }
                            <span className={`${styles.total}`}>Valor total: </span>
                            <strong className={`${styles.valorTotal}`}>
                                {UtilService.formatCurrency(valorTotal)}
                            </strong>
                        </div>

                    </div>

                </>
            }
        </div>
    )
}

export default Carrinho