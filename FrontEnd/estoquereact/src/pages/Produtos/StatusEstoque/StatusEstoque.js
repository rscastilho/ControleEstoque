import React, { useCallback, useMemo, useState } from 'react'
import styles from './StatusEstoque.module.css'
import { getAll } from '../../../Services/crudApi'
import ToastMessage from '../../../components/toastMessages/ToastMessage';
import Loading from '../../../components/Loading/Loading';
import Titulo from './../../../components/Titulo/Titulo';
import { Link } from 'react-router-dom';

let percentual = 0;

const StatusEstoque = () => {
    const [itens, setItens] = useState([]);
    const [paginar, setPaginar] = useState(0);
    const [itensPorPagina, setItensPorPagina] = useState('100');
    const [isLoading, setIsLoading] = useState(true);


    const getAllProdutos = useCallback(() => {
        getAll(`produtos?skip=${paginar}&take=${itensPorPagina}`)
            .then((resultado) => {
                setItens(resultado.data)
                setIsLoading(false)

            })
            .catch((error) => {

                ToastMessage.mensagemErro(`Erro: ${error.message}`);
                setIsLoading(false)
            })
            .finally(setIsLoading(false))
    }, [itensPorPagina, paginar])

    const abreviar = (texto) => {
        let resultado = (texto.substring(0, 15) + '...')
        return resultado


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
                            {itens && itens.map((produto) => (
                                <div key={produto.id}>

                                    <>
                                        <div key={produto.id}>
                                            <div className={`${styles.descricao}`}>
                                                <span> {abreviar(produto.descricao)} </span>
                                                <span>Estoque atual: {produto.quantidadeEstoque}</span>
                                                <span>Estoque minimo: {produto.quantidadeMinima}</span>
                                                <span className={`${styles.estadoAtual}`}>Estado atual: {percentual = Math.ceil((((produto.quantidadeMinima / produto.quantidadeEstoque) - 1) * 100) + 100)}%</span>
                                            </div>
                                        </div>
                                        {produto.quantidadeEstoque > 0
                                            ?
                                            <>
                                                <div className="progress mb-1" style={{ "height": "30px" }}>
                                                    <div
                                                        className={`progress-bar progress-bar-striped progress-bar-animated ${percentual <= 10 ? 'bg-danger' : 'bg'} `}
                                                        role="progressbar"
                                                        style={{ "width": `${percentual}` + "%" }}
                                                        aria-valuenow={percentual}
                                                        aria-valuemin={produto.quantidadeMinima}
                                                        aria-valuemax={produto.quantidadeEstoque}
                                                        title={percentual + "%"}
                                                    >

                                                        {percentual}%
                                                    </div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        style={{ "width": `${(percentual - 100) * -1}` + "%" }}
                                                        aria-valuenow={produto.quantidadeEstoque}
                                                        aria-valuemin={percentual}
                                                        aria-valuemax={produto.quantidadeEstoque}
                                                        title={((percentual - 100) * -1) + '%'}
                                                    >
                                                        {(percentual - 100) * -1}%
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
                                                        aria-valuenow={percentual}
                                                        aria-valuemin={produto.quantidadeMinima}
                                                        aria-valuemax={produto.quantidadeEstoque}
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
                            <Link to="/dashboard">
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