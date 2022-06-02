import React, { useState } from 'react'
import { post } from '../../../Services/crudApi';
import styles from './CadastrarProduto.module.css'
import upload from './../../../assets/upload.jpg'
import { getAll, salvarImagem } from './../../../Services/crudApi'
import { useEffect } from 'react';


const CadastrarProduto = (props) => {

    const [descricao, setDescricao] = useState('');
    const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
    const [quantidadeMinima, setQuantidadeMinima] = useState('');
    const [valor, setValor] = useState('');
    const [categorias, setCategorias] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [imagemUrl, setImagemUrl] = useState('uploadImage.jpg');
    const [fornecedorId, setFornecedorId] = useState('');
    const [fornecedores, setFornecedores] = useState('');
    
    const [carregaImagem, setCarregaImagem] = useState('');
    


    const produto = {
        descricao,
        quantidadeEstoque,
        quantidadeMinima,
        valor,
        categoriaId,
        imagemUrl,
        fornecedorId
    }

    const handleSalvar = (e) => {
        e.preventDefault()
        console.log(produto)
        post('produtos', produto).then(() => {
            props.setLoop(true)
            // handleLimpar()
            props.setMostraCaixaCadastrar(false)
        })
    }

 
    const handleCarregaImagem = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            const image = e.target.files[0];
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setCarregaImagem(URL.createObjectURL(e.target.files[0]))
               

            }
         }
        const imagemName = e.target.value;
        const nomeFinal = imagemName.slice(12).trim();
        setImagemUrl(nomeFinal)
        console.log(nomeFinal)
        console.log(imagemUrl)
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

    const HandlelimparCampos = (e) => {
        e.preventDefault();
        setDescricao('');
        setValor('');
        setCategorias('');
        setFornecedores('');
        setQuantidadeEstoque('');
        setQuantidadeMinima('');
    }

    useEffect(() => {
        carregarCategorias();
        carregarFornecedores();

    }, [])



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
                                aria-label=".form-select-sm example">
                                    <option defaultValue> Selecione a categoria: </option>
                                {categorias && categorias.map((itens,i) => (
                                    <>
                                        <option key={i} value={itens.id}>
                                            {itens.descricao}
                                        </option>
                                    </>
                                ))}
                            </select>



                            {/* <label className={`me-1`}> Imagem:
                                <input type="file"
                                    accept='image/*'
                                    className={`ms-2 me-1`}
                                    value={''}
                                    onChange={handleCarregaImagem}
                                    placeholder='Insira a categoria'

                                />
                            </label> */}
                        </div>
                        
                        <div className={`col col-md-6 ${styles.forms}`}>
                            <div>
                            <label className={`me-1`}> Quantidade Estoque:
                                <input type="number"
                                    className={`form-control form-control-sm me-1`}
                                    value={quantidadeEstoque}
                                    onChange={(e) => { setQuantidadeEstoque(e.target.value) }}
                                    placeholder='Quantidade'
                                    min="0"
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
                                aria-label=".form-select-sm example">
                                <option defaultValue > Selecione o fornecedor: </option>
                                {fornecedores && fornecedores.map((itens,i) => (
                                    <>
                                        <option key={i} value={itens.id}>
                                            {itens.razaoSocial}
                                        </option>
                                    </>
                                ))}
                            </select>
                            {valor &&
                            <label className={`me-1`}> Valor do estoque:
                                <input type="number"
                                    className={`form-control form-control-sm me-1 border-0`}
                                    value={quantidadeEstoque * valor}
                                    placeholder='Valor do estoque'
                                    readOnly
                                    />
                            </label>
                                }
                            

                            {/* <div className={`${styles.caixaImg}`}>

                                {carregaImagem ? <img className={`${styles.miniatura}`} src={carregaImagem} alt='Imagem' /> : <img className={`${styles.miniatura}`} src={upload} alt='Imagem' />}
                            </div> */}
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
                                disabled={!descricao || !valor || !categoriaId || !fornecedorId || !quantidadeEstoque || !quantidadeMinima}
                                className={`btn btn-outline-warning btn-sm me-2 ${styles.bel}`}
                                onClick={HandlelimparCampos}
                            >
                                Limpar
                            </button>
                            <button
                                type='button'
                                className={`btn btn-outline-danger btn-sm ${styles.bel}`}
                                onClick={() => props.setMostraCaixaCadastrar(false)}
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

export default CadastrarProduto