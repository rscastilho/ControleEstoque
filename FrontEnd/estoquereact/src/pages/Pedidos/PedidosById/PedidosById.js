import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Titulo from '../../../components/Titulo/Titulo'
import styles from './PedidosById.module.css'
import { getById } from './../../../Services/crudApi'
import error from './../../../assets/error-img.jpg'
import { UtilService } from '../../../Services/util'


const PedidosById = () => {
    const [pedidos, setPedidos] = useState([]);
    const [id] = useState(JSON.parse(localStorage.getItem('@id')));
    const [nome] = useState(JSON.parse(localStorage.getItem('@nome')));

    useMemo(() => {
        getById(`Pedidos/pedidosbyuserId/${id}`).then((resultado) => {
            setPedidos(resultado.data);

        })
    }, [id])


    return (
        <>
            <Titulo
                titulo="Consulte aqui seus pedidos" />
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
                            </span>. Você tem {pedidos.length} pedidos</span>
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
                                            <span>
                                                Numero: {itens.id}
                                            </span>
                                            <span>
                                                Data do pedido: {itens.createAt}
                                            </span>
                                            <span>
                                                Valor total  {UtilService.formatCurrency(itens.valorTotal)}
                                            </span>
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
                                                        <th>Produto</th>
                                                        <th>descricao</th>
                                                        <th>quantidade</th>
                                                        <th>Valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {itens.itensCarrinho.map((x) => (
                                                        <tr>
                                                            <td>
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
                                                            <td> {x.valor}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <hr />
            <div>

                <Link to={'/'}>
                    <button className='btn btn-secondary'>Voltar</button>
                </Link>
            </div>
        </>
    )
}

export default PedidosById