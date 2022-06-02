import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react'
import styles from './ProdutosCompras.module.css'
import { getAll } from './../../../Services/crudApi';
import error from '../../../assets/error-img.jpg'
import Titulo from './../../../components/Titulo/Titulo';
import { AutContext } from '../../../context/AutContext';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const ProdutosCompras = () => {
    const [itens, setItens] = useState([]);
    const [paginar, setPaginar] = useState(0);
    const [itensPorPagina, setItensPorPagina] = useState(10);

    const { setItensCarrinho, itensCarrinho } = useContext(AutContext);

    const local = JSON.parse(localStorage.getItem('carrinho')) || ''
    const [quantidadeItem, setQuantidadeItem] = useState(local.quantidadeEstoque)
    const carrinho = [...local]


    const handleAddCar = (itemsAdd) => {

        let itensCarrinho = carrinho.find(x => x.id === itemsAdd.id);
        if (itensCarrinho) {
            if(itensCarrinho.quantidade < itensCarrinho.quantidadeEstoque){
                itensCarrinho.quantidade += 1;
                toast.success(`${itemsAdd.descricao} incluído no carrinho`, { autoClose: 2000 })
                setQuantidadeItem(itensCarrinho.quantidadeEstoque -= 1);
                setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
            }
            else{
                toast.warning("Quantidade maxima permitida")
                return
            }

        } else {
            carrinho.push({ ...itemsAdd, produtoId: itemsAdd.id, quantidade: 1, valor: itemsAdd.valor })

            toast.success(`${itemsAdd.descricao} incluído no carrinho`, { autoClose: 2000 })

        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))



    }

    useEffect(() => {

        getAll(`Produtos?skip=${paginar}&take=${itensPorPagina}`).then(produtos => {
            setItens(produtos.data)

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
                                {items.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div className={styles.disponivel}>
                                Disponivel:

                                <strong className={styles.quantidade}> {items.quantidadeEstoque} </strong> unids.
                            </div>


                        </div>
                        <div className={`card-footer ${styles.footer}`}>
                            <button
                                className={`btn btn-sm me-3 ${items.quantidadeEstoque === 0 ? styles.botaoEstoque : styles.botao}  `}
                                onClick={() => handleAddCar(items)}
                                disabled={items.quantidadeEstoque === 0 ? true : false}
                                >Comprar</button>
                                {/* {console.log(items)} */}
                            <button className={`btn btn-sm btn-secondary ${styles.botaoInfo}`}>+ info</button>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}

export default ProdutosCompras