import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Titulo from '../../../components/Titulo/Titulo'
import styles from './PedidosById.module.css'
import { getById } from './../../../Services/crudApi'
import error from './../../../assets/error-img.jpg'
import { UtilService } from '../../../Services/util'
import { useEffect } from 'react';
import ItensPorPagina from '../../../components/ItensPorPagina/ItensPorPagina'
import PesquisarPorDatas from '../../../components/PesquisarPorDatas/PesquisarPorDatas'



const PedidosById = () => {
    const [pedidos, setPedidos] = useState([]);
    const [numeroPedidos, setNumerosPedidos] = useState('');
    const [id] = useState(JSON.parse(localStorage.getItem('@id')));
    const [nome] = useState(JSON.parse(localStorage.getItem('@nome')));
    const [take, setTake] = useState(5);
    const [skip, setSkip] = useState(0);
    const tableRef = useRef(null)
    const [numeroBotoes, setNumeroBotoes] = useState('');
    const [loop, setLoop]=useState(false);

    useMemo(() => {
        getById(`Pedidos/pedidosbyuserId/${id}?skip=${skip}&take=${take}`).then((resultado) => {
            setPedidos(resultado.data);
        })
        
        getById(`Pedidos/contarpedidoporusuario/${id}`).then((resultado) => {
            setNumerosPedidos(resultado.data);
        })

    }, [id, take, skip])

    useEffect(() => {
        numeroBtn()
    })

    const numeroBtn = () => {
        const numero = Math.ceil(numeroPedidos / 5)
        setNumeroBotoes(numero)
        return numero;
    }



    return (
        <>
            <Titulo
                titulo="Consulte aqui seus pedidos" />
            <PesquisarPorDatas
            setPedidos={setPedidos}
            pedidos={pedidos}
            
            />
            {!pedidos ?
                <p className={`${styles.validaPedido}`}>
                    <span className={`${styles.nome}`}>
                        {nome}
                    </span> Você não possui pedidos registrados no sistema.</p>
                :
                <div>
                    <div className={`${styles.pedidos} mb-2`}>
                        <span>
                            <span className={`${styles.nome}`}>
                                {nome}
                            </span>. Você tem {numeroPedidos && numeroPedidos} pedidos</span>
                    </div>

                    {pedidos.map((itens, i) => (
                        <div key={itens.id} className={`${styles.pedidos}`}>
                            <div className={`accordion w-50 mb-3`} id="accordionExample">
                                <div className="accordion-item  ">
                                    <h2 className={`accordion-header`} id={`item00${i}`}>
                                        <button className={`accordion-button ${styles.tituloPedido}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${i}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse${i}`}>
                                            <span ref={tableRef}>
                                                Numero do pedido: {itens.id}
                                            </span>
                                            <span>
                                                Realizado em: {UtilService.formatDate(itens.createAt)}
                                            </span>
                                            <span>
                                                Total:  {UtilService.formatCurrency(itens.valorTotal)}
                                            </span>
                                            <div className={`${styles.statusPedido}`}>
                                                <apan>
                                                    Status do pedido:
                                                </apan>
                                                <span>
                                                    {UtilService.statusPedido(itens.statusPedidos)}
                                                </span>
                                            </div>
                                        </button>

                                    </h2>
                                    <div id={`collapse${i}`}
                                        className="accordion-collapse collapse collapse"
                                        aria-labelledby={`item00${i}`}
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th>Imagem</th>
                                                        <th>Descrição</th>
                                                        <th>Quantidade</th>
                                                        <th>Valor unit.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {itens.itensCarrinho.map((x) => (
                                                        <tr >
                                                            <td key={x.id} >
                                                                <img
                                                                    className={`${styles.imagem}`}
                                                                    src={`https://localhost:5001/recursos/imagens/${x.produto.imagemUrl}`}
                                                                    alt={itens.descricao}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null
                                                                        e.target.src = error
                                                                    }} />
                                                            </td>
                                                            <td> {x.produto.descricao}</td>
                                                            <td> {x.quantidade}</td>
                                                            <td> {UtilService.formatCurrency(x.valor)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className={`${styles.tipoPagamento}`}>
                                                <span>
                                                    Tipo de pagamento:
                                                </span>
                                                <span>
                                                    {UtilService.tipoPagamento(itens.tiposPagamentos)}
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <div className={`${styles.botoes}`}>
                <button
                    className='btn btn-sm btn-warning'
                    disabled={pedidos.length < 5 ? true : false}
                    onClick={(e) => {
                        setSkip(skip + 5)
                        setTake(take + 5)
                    }}
                >Anterior</button>
                {/* - {numeroBotoes}- */}
                <ItensPorPagina
                    setItensPorPagina={setTake}
                    itens={pedidos.length}
                    setLoop={setLoop}
                />

                <button
                    className='btn btn-sm btn-warning'
                    disabled={skip < 1 ? true : false}
                    onClick={(e) => {
                        
                        setSkip(skip - 5)
                        setTake(take - 5)
                    }}
                >Proximo</button>
            </div>
            <hr />
            <div>

                <Link to={'/'}>
                    <button className='btn btn-secondary'>Voltar</button>
                </Link>
                <button className='btn' onClick={()=>window.scrollTo(0,0)}>Topo da página</button>
            </div>
        </>
    )
}

export default PedidosById