import React, { useState } from 'react'
import { getAll, put } from '../../../Services/crudApi';
import styles from './EditarProduto.module.css'
import { useEffect } from 'react';
import ImagemProdutoDestaque from '../ImagemProdutoDestaque/ImagemProdutoDestaque';
import CarregaImagem from '../../../components/CarregaImagem/CarregaImagem';
import CadastrarImagem from '../ImagensProduto/CadastrarImagem';


const EditarProduto = (props) => {
    const [descricao, setDescricao] = useState('');
    const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
    const [quantidadeMinima, setQuantidadeMinima] = useState('');
    const [valor, setValor] = useState('');
    const [categorias, setCategorias] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [imagemUrl, setImagemUrl] = useState('uploadImage.jpg');
    const [fornecedorId, setFornecedorId] = useState('');
    const [fornecedores, setFornecedores] = useState('');
    const [imagemDestaque, setImagemDestaque] = useState('');
    const [destacarImagem, setDestacarImagem] = useState('');
    const [boxImagemDestaque, setBoxImagemDestaque] = useState(false);


    const produto = {
        id: props.item.id,
        descricao,
        quantidadeEstoque,
        quantidadeMinima,
        valor,
        categoriaId,
        imagemUrl: props.imagemUrl ? props.imagemUrl : imagemUrl,
        imagemDestaque: 'uploadImage.jpg',
        destacarImagem,
        fornecedorId,

    }

    const handleBoxImagemDestaque = () => {
        setBoxImagemDestaque(!boxImagemDestaque)
    }

    const handleSalvar = (e) => {
        e.preventDefault()
        console.log(produto)
        put('produtos', produto).then(() => {
            props.setLoop(true)
            props.setMostraCaixaEditar(false)
        })
    }
    const carregarCategorias = () => {
        getAll('categorias').then(resultado => {
            setCategorias(resultado.data)
        })
    }
    const carregarFornecedores = () => {
        getAll('fornecedores').then(resultado => {
            setFornecedores(resultado.data)
        })
    }



    useEffect(() => {
        if (props.item) {
            setDescricao(props.item.descricao);
            setQuantidadeEstoque(props.item.quantidadeEstoque);
            setQuantidadeMinima(props.item.quantidadeMinima);
            setValor(props.item.valor);
            setCategoriaId(props.item.categoriaId);
            setImagemUrl(props.item.imagemUrl);
            setImagemDestaque(props.item.imagemDestaque);
            setDestacarImagem(props.item.destacarImagem);
            setFornecedorId(props.item.fornecedorId);
            carregarCategorias();
            carregarFornecedores();
        }
    }, [props.item])





    return (
        <div className={``} >

            <div className={`card ms-4 me-4 mt-4 p-2 `}>
                <h6>Cadastrar novo produto</h6>
                <form onSubmit={handleSalvar}>
                    <div className={`${styles.itensForm} row`}>
                        <div className={`col col-md-6 ${styles.forms}`}>

                            <label className={`me-1`}> Descrição:
                                <input type="text"
                                    className={`form-control form-control-sm me-1`}
                                    value={descricao}
                                    onChange={(e) => { setDescricao(e.target.value) }}
                                    placeholder='Nome do produto' />
                            </label>
                            <label className={`me-1`}> Valor:
                                <input type="text"
                                    className={`form-control form-control-sm me-1`}
                                    value={valor}
                                    onChange={(e) => { setValor(e.target.value) }}
                                    placeholder='Valor do produto' />
                            </label>

                            <label> Categoria:</label>
                            <select

                                onChange={(e) => setCategoriaId(e.target.value)}
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                value={categoriaId}
                            >
                                <option selected> Selecione a categoria: </option>
                                {categorias && categorias.map((itens) => (
                                    <>
                                        <option value={itens.id} key={itens.id}>
                                            {itens.descricao}
                                        </option>
                                    </>
                                ))}
                            </select>

                            <button
                                type='button'
                                className='btn btn-outline-info mt-4 btn-sm'
                                onClick={() => {
                                    handleBoxImagemDestaque()
                                                                    }}

                            >Destacar Imagem</button>
                            {boxImagemDestaque &&

                                <>imagem </>
                            }

                        </div>

                        <div className={`col col-md-6 ${styles.forms}`}>
                            <div>
                                <label className={`me-1`}> Quantidade Estoque:
                                    <input type="number"
                                        className={`form-control form-control-sm me-1`}
                                        value={quantidadeEstoque}
                                        onChange={(e) => { setQuantidadeEstoque(e.target.value) }}
                                        placeholder='Quantidade'
                                        min="1"
                                    />
                                </label>
                                <label className={`me-1`}> Quantidade minima:
                                    <input type="number"
                                        className={`form-control form-control-sm me-1`}
                                        value={quantidadeMinima}
                                        onChange={(e) => { setQuantidadeMinima(e.target.value) }}
                                        placeholder='Quantidade minima'
                                        min="1"
                                    />
                                </label>
                            </div>


                            <label> Fornecedor: </label>
                            <select
                                onChange={(e) => setFornecedorId(e.target.value)}
                                className="form-select form form-select-sm"
                                aria-label=".form-select-sm example"
                                value={fornecedorId}
                            >
                                <option selected > Selecione o fornecedor: </option>
                                {fornecedores && fornecedores.map((itens) => (
                                    <>
                                        <option value={itens.id} key={itens.id}>
                                            {itens.razaoSocial}
                                        </option>
                                    </>
                                ))}
                            </select>

                            <label className={`me-1`}> Valor do estoque:
                                <input type="number"
                                    className={`form-control form-control-sm me-1 border-0`}
                                    value={quantidadeEstoque * valor}
                                    placeholder='Valor do estoque'
                                    readOnly
                                />
                            </label>


                        </div>
                        <div className={`${styles.botao}`}>
                            <button
                                disabled={!descricao || !valor || !categoriaId || !fornecedorId || !quantidadeEstoque || !quantidadeMinima}
                                type='submit'
                                className={`btn btn-outline-secondary btn-sm me-2 ${styles.bel}`}
                            >
                                Salvar
                            </button>

                            <button
                                type='button'
                                className={`btn btn-outline-danger btn-sm ${styles.bel}`}
                                onClick={() => {
                                    props.setMostraCaixaEditar(false)

                                }}
                            >
                                Cancelar
                            </button>

                        </div>
                    </div>

                </form>
            </div>
            <hr />
        </div>
    )
}

export default EditarProduto