import React, { useCallback, useMemo, useState } from 'react'
import styles from './DashboardStatusEstoque.module.css'
import { getAll } from '../../../../Services/crudApi'
import ToastMessage from '../../../../components/toastMessages/ToastMessage';
import Loading from '../../../../components/Loading/Loading';
import Titulo from '../../../../components/Titulo/Titulo';
import { Link } from 'react-router-dom';


const StatusEstoque = () => {
    const [itens, setItens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getAllProdutos = useCallback(() => {
        getAll(`produtos/statusestoque`)
            .then((resultado) => {
                setItens(resultado.data)
                setIsLoading(false)
            })
            .catch((error) => {
                ToastMessage.mensagemErro(`Erro: ${error.message}`);
                setIsLoading(false)
            })
            // .finally(setIsLoading(false))
    }, [])

     const status = (quantidadeEstoque, quantidadeMinima) => {
        if (quantidadeEstoque < quantidadeMinima) {
            return 'bg-danger'
        } else if (quantidadeEstoque === quantidadeMinima) {
            return 'bg-warning'
        } else {
            return 'bg'
        }
    }

    useMemo(() => {
        getAllProdutos();
    }, [])

    return (
        <>
            <Titulo titulo={"Estado atual do estoque de produtos"} />
            <div className={`${styles.principal}`}>
                {isLoading ?
                    <Loading isLoading={isLoading} />
                    :
                    <>
                        <div className={''}>
                            {itens && itens.map((produto, i) => (
                                <div key={i}>
                                    <>
                                        <div key={i}>
                                            <span>{produto.mensagem}</span>
                                            <div className={`${styles.descricao}`}>
                                                <span>Estoque atual: {produto.objeto.quantidadeEstoque}</span>
                                                <span>Estoque minimo: {produto.objeto.quantidadeMinima}</span>
                                                <span className={`${styles.estadoAtual}`}>Estado atual: {produto.situacao}%</span>
                                            </div>
                                        </div>
                                        {produto.objeto.quantidadeEstoque > 0
                                            ?
                                            <>
                                                <div className="progress mb-1" style={{ "height": "30px" }}>
                                                    <div
                                                        className={`progress-bar ${status(produto.objeto.quantidadeEstoque, produto.objeto.quantidadeMinima)}`}
                                                        role="progressbar"
                                                        style={{ "width": `${produto.objeto.quantidadeEstoque}` + "%" }}
                                                        aria-valuenow={produto.objeto.quantidadeEstoque}
                                                        aria-valuemin={0}//{produto.situacao}
                                                        aria-valuemax={100}//{produto.objeto.quantidadeEstoque}
                                                        title={produto.objeto.quantidadeEstoque}
                                                    >
                                                        {produto.objeto.quantidadeEstoque}
                                                    </div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        style={{ "width": `${(produto.objeto.quantidadeMinima)}` + "%" }}
                                                        aria-valuenow={produto.objeto.quantidadeMinima}
                                                        aria-valuemin={0}//{produto.situacao}
                                                        aria-valuemax={100}//{produto.objeto.quantidadeEstoque}
                                                        title={produto.objeto.quantidadeMinima}
                                                    >
                                                        {(produto.objeto.quantidadeMinima)}
                                                    </div>

                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="progress mb-1"
                                                    style={{
                                                        "height": "38px",
                                                        "fontSize": "1.1em",
                                                        "fontWeight": "bold",
                                                    }}>
                                                    <div
                                                        className={`progress-bar bg-danger`}
                                                        role="progressbar"
                                                        style={{ "width": `${100}` + "%" }}
                                                        aria-valuenow={produto.situacao}
                                                        aria-valuemin={produto.objeto.quantidadeMinima}
                                                        aria-valuemax={produto.objeto.quantidadeEstoque}
                                                    >
                                                        {'Estoque zerado - 0%'}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </>
                                </div>
                            ))}
                            <hr />
                        </div>
                        <div className='mt-4'>
                            <Link to="/dashboard/produtos">
                                <button className='btn btn-warning'>Voltar</button>
                            </Link>
                            <Link to="/listarprodutos">
                                <button className='btn btn-secondary ms-5'>Acessar produtos</button>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default StatusEstoque