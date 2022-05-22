import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react'
import styles from './ProdutosCompras.module.css'
import { getAll } from './../../../Services/crudApi';
import error from '../../../assets/error-img.jpg'
import Titulo from './../../../components/Titulo/Titulo';
import { AutContext } from '../../../context/AutContext';



const ProdutosCompras = () => {
    const [itens, setItens] = useState([]);
    const [paginar, setPaginar] = useState(0);
    const [itensPorPagina, setItensPorPagina] = useState(10);

    const { setItensCarrinho, itensCarrinho } = useContext(AutContext);

    const local = JSON.parse(localStorage.getItem('carrinho')) || ''
    const carrinho = [...local]


    const handleAddCar = (itemsAdd) => {
        
        let itensCarrinho = carrinho.find(x => x.id === itemsAdd.id);
        if(itensCarrinho){
            itensCarrinho.quantidade +=1;
        }else{
            carrinho.push({ ...itemsAdd, quantidade: 1})
        }
        console.log(carrinho)
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        
        
    }

    useEffect(() => {

        getAll(`Produtos?skip=${paginar}&take=${itensPorPagina}`).then(produtos => {
            setItens(produtos.data)
            console.log(itens)
        })
        

    }, [])



    return (
        <>
            <Titulo
                titulo={"Compre aqui seu produto..."} />
            <div className={`${styles.principal} col-md-12`}>
                {itens && itens.map((items) => (
                    <div className={`card ${styles.card}`}>
                        <div className='card-header'>
                            <div className={`${styles.title}`}>
                                <div key={items.id}>{items.descricao}</div>
                            </div>
                        </div>
                        <div className={styles.conteudo} >
                            <div className={`card-body ${styles.body}`}>
                                <img
                                    className={styles.image}
                                    src={`https://localhost:5001/recursos/imagens/${items.imagemUrl}`}
                                    alt={items.descricao}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = error
                                    }}
                                />
                            </div>
                            <div className={styles.valor}>
                                R$ {items.valor}
                            </div>
                            <div className={styles.disponivel}>
                                Disponivel:
                                <strong className={styles.quantidade}> {items.quantidadeEstoque} </strong> unids.
                            </div>


                        </div>
                        <div className={`card-footer ${styles.footer}`}>
                            <button
                                className={`btn btn-sm me-3 ${items.quantidadeEstoque === 0 ? styles.botaoEstoque : styles.botao }  `}
                                onClick={() => handleAddCar(items)}
                                disabled={items.quantidadeEstoque === 0 ? true : false}


                            >Comprar</button>
                            <button className={`btn btn-sm btn-secondary ${styles.botaoInfo}`}>+ info</button>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}

export default ProdutosCompras