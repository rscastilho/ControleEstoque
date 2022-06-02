import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Titulo from '../../../components/Titulo/Titulo'
import { AutContext } from '../../../context/AutContext'
import styles from './FinalizarPedido.module.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';
import { post } from '../../../Services/crudApi'


const FinalizarPedido = () => {

    const { setItensCarrinho } = useContext(AutContext);
    const [pedido, setCarrinho] = useState(JSON.parse(localStorage.getItem('@pedido')));
    const [nome] = useState(JSON.parse(localStorage.getItem('@nome')))
    const [pagamento, setPagamento] = useState('1')
    const navigate = useNavigate();
    
    let compraFinalizada = {}

    const postPedido = async (data) => {
         await post('/Pedidos', data).then((resultado) => {
            toast.success(`Pedido numero ${resultado.data.id} - valor R$ ${resultado.data.valorTotal} - Realizado com sucesso.` , 
            { autoClose: 3000, position:'bottom-center' })
            console.log('resultado',resultado)
            navigate('/');
                        
         })
    }

    const handleCancelarComprar = () => {
        localStorage.removeItem('carrinho')
        setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
        toast.warning("Compra cancelada com sucesso!", { autoClose: 2000 })
    }

    const handleComprar = () => {
        compraFinalizada = pedido;
        postPedido(compraFinalizada);
        localStorage.removeItem('carrinho')
        localStorage.setItem('@pedidoFinalizado', JSON.stringify(compraFinalizada))

        console.log('comprafinalizada', compraFinalizada)
    }

    useEffect(() => {
        console.log('pedido',pedido)

    }, [])

    return (
        <>
            <Titulo titulo={"Finalizar pedido de compra"} />
            <div className={`container ${styles.principal}`}>
                <div className='card w-50 shadow-sm'>
                    <div className="card-header p-4">
                        {pedido.userId}
                        <strong className={`${styles.nome}`} >{nome} </strong> seu pedido esta quase finalizado
                    </div>
                    <div className='card-body align-content-center p-4'>
                    </div>
                    <div className={`${styles.tabela}`}>
                        <table className='table table-bordered w-75'>
                            {pedido.itensCarrinho.map((x) => (
                                <>
                                    <tr>
                                        <td>{x.descricao}</td>
                                        <td>{x.Quantidade}</td>
                                        <td>{x.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    </tr>
                                </>
                            ))}
                        </table>
                    </div>
                    <div className={`${styles.botaoTabela}`}>
                        <div>
                            <Link to='/carrinho'>
                                <button className={`btn btn-outline-warning btn-sm mb-1 ${styles.botaoVoltar}`}>Voltar ao carrinho</button>
                            </Link>
                        </div>

                    </div>
                    <div className='card-footer p-4'>
                        <span>Forma de pagamento: </span>
                        <select className="form-select" onChange={(e) => setPagamento(e.target.value)}>
                            <option value='1'>Cartão de credito</option>
                            <option value='2'>Boleto</option>
                            <option value='3'>PIX</option>
                            <option value='4'>Débito em conta</option>
                        </select>
                    </div>
                    <div className={`card-footer p-4 ${styles.valorTotal}`}>
                        <div>
                            <span>Total a pagar:</span>
                            <span className={`${styles.valor}`}>
                                {pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            
                            </span>
                        </div>
                    </div>
                    <div className='card-footer p-2'>
                        <div className={`${styles.botoes}`}>
                            <div></div>
                            <Link to='/'>
                                <button className='btn btn-secondary ' >Continuar comprando</button>
                            </Link>
                            <Link to='/'>
                                <button onClick={() => handleCancelarComprar()} className='btn btn-danger me-2'>Cancelar compra</button>
                            </Link>
                            <Link to='/finalizarpedido'>
                                <button onClick={handleComprar} className='btn btn-primary'>Finalizar compra</button>
                            </Link>
                            <div></div>
                        </div>

                    </div>
                </div>


            </div>
        </>
    )
}

export default FinalizarPedido