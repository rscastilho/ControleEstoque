import React, { useState, useContext, useMemo, useCallback, useEffect } from 'react'
import styles from './ProdutosCompras.module.css'
import { getAll } from './../../../Services/crudApi';
import error from '../../../assets/error-img.jpg'
import Titulo from './../../../components/Titulo/Titulo';
import { AutContext } from '../../../context/AutContext';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UtilService } from '../../../Services/util'
import OpenModal from '../../../components/Modal/OpenModal';
import InformacaoProduto from '../InformacaoProduto/InformacaoProduto';
import ImagensDestacadas from '../ImagensDestacadas/ImagensDestacadas';
import SearchByName from '../../../components/SearchByName/SearchByName';
import Loading from './../../../components/Loading/Loading';


const ProdutosCompras = () => {
    const [itens, setItens] = useState([]);
    const [itemId, setItemId] = useState('')
    const [paginar, setPaginar] = useState(0);
    const [itensPorPagina, setItensPorPagina] = useState(20);
    const [show, setShow] = useState(false);
    const { setItensCarrinho, itensCarrinho } = useContext(AutContext);
    const local = JSON.parse(localStorage.getItem('carrinho')) || ''
    const [quantidadeItem, setQuantidadeItem] = useState(local.quantidadeEstoque)
    const carrinho = [...local]
    const [isLoading, setIsLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState(0);

    const handleClose = useCallback(() => {
        setShow(!show)
    }, [show]);

    const handleAddCar = useCallback((itemsAdd) => {
        let itensCarrinho = carrinho.find(x => x.id === itemsAdd.id);
        if (itensCarrinho) {
            if (itensCarrinho.quantidade < itensCarrinho.quantidadeEstoque) {
                itensCarrinho.quantidade += 1;
                toast.success(`${itemsAdd.descricao} incluído no carrinho`, { autoClose: 2000 })
                setQuantidadeItem(itensCarrinho.quantidadeEstoque -= 1);
                setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
            }
            else {
                toast.warning("Quantidade maxima permitida")
                return
            }
        } else {
            carrinho.push({ ...itemsAdd, produtoId: itemsAdd.id, quantidade: 1, valor: itemsAdd.valor })
            toast.success(`${itemsAdd.descricao} incluído no carrinho`, { autoClose: 2000 })
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        setItensCarrinho(JSON.parse(localStorage.getItem('carrinho')))
    }, [setItensCarrinho, carrinho])

    useMemo(() => {
        getAll(`Produtos?skip=${paginar}&take=${itensPorPagina}`).then(produtos => {
            setItens(produtos.data)
            setIsLoading(false);
        })
    }, [paginar, itensPorPagina])

    useMemo(() => {
        getAll('categorias?skip=0&take=100').then((resultado) => {
            setCategorias(resultado.data)

        })
    }, [])

    useEffect(() => {
        if (categoriaId == 0) {
            setIsLoading(true)
            getAll(`Produtos?skip=${paginar}&take=${itensPorPagina}`).then(produtos => {
                setItens(produtos.data)
                setIsLoading(false);
            })
        }
        else {
            getAll(`produtos/produtosporcategoria/${categoriaId}`).then((resultado) => {
                setItens(resultado.data);
                setIsLoading(false);
            })

        }



    }, [categoriaId, itensPorPagina, paginar])

    return (
        <div>
            <div className={`${styles.imagens}`}>
                <ImagensDestacadas />
            </div>

            <div>
                <Titulo
                    className='text-center'
                    titulo={"Compre seu produto..."}
                />


            </div>




            {isLoading ?
                <Loading isLoading={isLoading} />
                :
                <>
                    <div className={`${styles.search}`}>
                        <div>
                            <SearchByName
                                localPesquisa={"produtos/pesquisarpornome"}
                                setItens={setItens}
                                local={'produtos'}
                                paginar={paginar}
                                itensPorPagina={itensPorPagina}

                            />
                        </div>
                        <div>
                            <select className='form-select' onChange={(e) => setCategoriaId(e.target.value)}>
                                <option selected value={0}>- -Pesquisar por categoria- -</option>
                                {categorias && categorias.map((categoria, i) => (
                                    <>
                                        <option key={i} value={categoria.id}>{categoria.descricao}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div>
                                <span className={`${styles.data}`}>{UtilService.hoje()}</span>
                            </div>
                        </div>

                    </div>
                    <hr />

                    <div className={`${styles.principal}`}>
                        {itens && itens.map((items) => (
                            <div key={items.id} className={`card ${styles.card}`}>
                                <div className={`card-header ${styles.titulo}`}>
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
                                            onClick={() => {
                                                handleClose()
                                                setItemId(items.id)
                                            }}
                                            loading="lazy"

                                        />
                                    </div>
                                    <div className={styles.valor}>
                                        {UtilService.formatCurrency(items.valor)}
                                    </div>
                                    <div className={styles.disponivel}>
                                        Disponivel:

                                        <strong className={styles.quantidade} title="Quantidade disponivel"> {items.quantidadeEstoque} </strong> unids.
                                    </div>


                                </div>
                                <div className={`card-footer ${styles.footer}`}>
                                    <button
                                        className={`btn btn-sm me-3 ${items.quantidadeEstoque === 0 ? styles.botaoEstoque : styles.botao}  `}
                                        onClick={() => handleAddCar(items)}
                                        disabled={items.quantidadeEstoque === 0 ? true : false}
                                        title="Adicionar item no carrinho"
                                    >
                                        {items.quantidadeEstoque === 0 ? 'Indisponivel' : 'Comprar'}
                                    </button>

                                    <button
                                        className={`btn btn-sm btn-secondary ${styles.botaoInfo}`}
                                        onClick={() => {
                                            handleClose()
                                            setItemId(items.id)
                                        }}
                                        title={`informacoes de ${items.descricao}`}
                                    >
                                        + info
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                    <button className='btn' onClick={() => window.scrollTo(0, 0)}>topo</button>
                </>
            }
            <OpenModal
                show={show}
                handleClose={handleClose}
                itemId={itemId}
            >
                <InformacaoProduto
                    itemId={itemId}
                />
            </OpenModal>
        </div>
    )
}

export default ProdutosCompras