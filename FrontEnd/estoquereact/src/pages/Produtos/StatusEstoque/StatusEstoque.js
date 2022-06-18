import React, { useCallback, useMemo, useState } from 'react'
import styles from './StatusEstoque.module.css'
import { getAll } from '../../../Services/crudApi'
import ToastMessage from '../../../components/toastMessages/ToastMessage';
import Loading from '../../../components/Loading/Loading';



let percentual =0;


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
                console.log(resultado.data)
            })
            .catch((error) => {
                ToastMessage.mensagemErro(`Erro: ${error.message}`);
                setIsLoading(false)
            })
            .finally(setIsLoading(false))
    }, [itensPorPagina, paginar])

    useMemo(() => {
        getAllProdutos();

    }, [])


    return (
        <>
            {isLoading ?
                <Loading isLoading={isLoading} />
                :
                <>
                <div className={''}>
                    {itens && itens.map((produto) => (
                        <>
                            <div key={produto.id}>
                                {produto.descricao}<br/>
                                Estoque: {produto.quantidadeEstoque}  -   Limite: {produto.quantidadeMinima} <br/> 
                                Estado atual: {percentual = Math.ceil((((produto.quantidadeMinima / produto.quantidadeEstoque) - 1) * 100) + 100)}%</div>
                            <div className="progress w-50">
                            <div 
                                className={`progress-bar progress-bar-striped progress-bar-animated ${percentual <= 10 ? 'bg-danger': 'bg'} `} 
                                role="progressbar" 
                                style={{"width":`${percentual}`+"%"}}
                                aria-valuenow={{percentual}} 
                                aria-valuemin={produto.quantidadeMinima} 
                                aria-valuemax={produto.quantidadeEstoque}
                                
                                >
                                    {percentual}%
                            </div>
                            
                            </div>

                        </>
                    ))}
                    </div>
                </>
            }

        </>
    )
}

export default StatusEstoque