import React from 'react'
import styles from './ListarProdutos.module.css';
import { useState, useEffect } from 'react';
import Titulo from './../../../components/Titulo/Titulo';
import BotaoAcao from '../../../components/botoesAcao/BotaoAcao';
import { del, getAll, getById } from './../../../Services/crudApi'
import { FaRegPlusSquare } from 'react-icons/fa'
import SearchByName from '../../../components/SearchByName/SearchByName';
import ModalExclusao from '../../../components/ModalExclusao/ModalExclusao';
import ItensPorPagina from '../../../components/ItensPorPagina/ItensPorPagina';
import { FiEye, FiEyeOff } from 'react-icons/fi'
import CadastrarProduto from './../cadastrarProduto/CadastrarProduto';
import error from '../../../assets/imageNotFount001.png'
import EditarProduto from './../EditarProduto/EditarProduto';
import CadastrarImagem from './../ImagensProduto/CadastrarImagem';
import Loading from './../../../components/Loading/Loading';



const ListarProdutos = () => {
  const [item, setItem] = useState("");
  const [itens, setItens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loop, setLoop] = useState(true);
  const [mostraCaixaCadastrar, setMostraCaixaCadastrar] = useState(false);
  const [mostraCaixaEditar, setMostraCaixaEditar] = useState(false);
  const [show, setShow] = useState(false);
  const [showImagem, setShowImagem] = useState(false);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [paginar] = useState(0);
  const [mostrarImg, setMostrarImg] = useState(false);
  const [exibeCaixaImagem, setExibeCaixaImagem] = useState(false)


  const handleCloseModal = () => setShow(!show)
  const handleCloseImagem = () => { setShowImagem(!showImagem) };
  const handleCloseModalImagem = () => setShowImagem(!showImagem)

  const handleCaixaCadastrar = () => {
    setMostraCaixaEditar(false);
    setMostraCaixaCadastrar(!mostraCaixaCadastrar);
  }

  const handleEditar = (id) => {
    setMostraCaixaEditar(true)
    setMostraCaixaCadastrar(false);
    getById(`produtos/pesquisarporid/${id}`).then(produto => {
      setItem(produto.data)

    })
  }
  const handleClose = (id) => {
    const produto = getById(`produtos/pesquisarporid/${id}`).then(produtos => {
      setItem(produtos.data)
      console.log(produtos.data)
    })
    if (produto) {
      setShow(!show)
    };
  }



  const deleteItem = async (id) => {
    const resultado = await del(`produtos/${id}`)
    console.log(resultado)
    const novaLista = itens.filter((item) => item.id !== resultado.id);
    setItens([...novaLista])
    setLoop(true)

  }

  const handleAbrirImagem = (id) => {
    getById(`produtos/pesquisarporid/${id}`).then(produtos => {
      setItem(produtos.data)
    })
    setExibeCaixaImagem(true)
    handleCloseImagem()
  }

  const handleAbrirImagemDestaque = (id) => {
    getById(`produtos/pesquisarporid/${id}`).then(produtos => {
      setItem(produtos.data)
    })
    setExibeCaixaImagem(true)
    handleCloseImagem()
  }



  useEffect(() => {

    if (loop) {
      // setIsLoading(true)
      getAll(`Produtos?skip=${paginar}&take=${itensPorPagina}`).then(produtos => {
        setItens(produtos.data)
        setLoop(!loop)
        setIsLoading(false)

      })
    }


  }, [loop, paginar, itensPorPagina])


  return (
    <>
      <div className='row col-md-12 row-cols-sm-12'>
        <Titulo titulo={'Produtos cadastrados'} />

        {isLoading ?
          <Loading
            isLoading={isLoading}
          />
          :
          <>

            <div>
              <div>
                {mostraCaixaCadastrar &&
                  <CadastrarProduto
                    setLoop={setLoop}
                    setMostraCaixaCadastrar={setMostraCaixaCadastrar} />
                }
              </div>
              <div>
                {mostraCaixaEditar &&
                  <EditarProduto
                    setLoop={setLoop}
                    item={item}
                    setMostraCaixaEditar={setMostraCaixaEditar}
                    handleAbrirImagemDestaque={handleAbrirImagemDestaque}

                  />
                }
              </div>
              <div>
                {exibeCaixaImagem &&
                  <CadastrarImagem
                    setLoop={setLoop}
                    show={showImagem}
                    setShow={setShowImagem}
                    onHide={handleCloseImagem}
                    handleClose={handleCloseImagem}
                    handleCloseModal={handleCloseModalImagem}
                    item={item}
                    setMostraCaixaEditar={setMostraCaixaEditar}
                    local={'produtos/salvarimagem'}

                  />
                }
              </div>
            </div>
            <div className={`${styles.botaoAcao} row`}>
              <div className={`${styles.botaoAdd}`}>
                {!mostraCaixaCadastrar &&
                  <button className='btn btn-outline-secondary border-0 btn-sm mb-2'
                    type='button'
                    onClick={handleCaixaCadastrar}

                  >
                    <FaRegPlusSquare size={18} className="me-2" />
                    Novo Produto
                  </button>
                }
              </div>

              <div>
                <SearchByName setLoop={setLoop}
                  setItens={setItens}
                  itens={itens}
                  localPesquisa={'produtos/pesquisarpornome'}
                  local={'produtos'}
                  paginar={paginar}
                  itensPorPagina={itensPorPagina}
                />
              </div>

            </div>

            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>
                    <button className='btn' onClick={() => setMostrarImg(!mostrarImg)}>
                      {mostrarImg ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </th>
                  <th> Estoque</th>
                  <th> Descrição</th>
                  <th> Valor</th>
                  <th> Valor estoque</th>
                  <th> Imagem destaque</th>
                  <th> Ação</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {itens && itens.map((items, i) => (
                  <tr key={i} className={items.quantidadeEstoque < 1 ? `${styles.estoqueZero}` : ''}>
                    <td key={i}>
                      {mostrarImg &&
                        <img
                          className={`${styles.imagem}`}
                          src={`https://localhost:5001/recursos/imagens/${items.imagemUrl}`}
                          alt={items.descricao}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = error
                          }}
                          onClick={() => handleAbrirImagem(items.id)}

                        />
                      }
                    </td>
                    <td>{items.quantidadeEstoque}</td>
                    <td>{items.descricao}</td>
                    <td>{items.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>{items.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>
                      <input type="checkbox" disabled checked={items.destacarImagem ? true : false} />


                    </td>

                    <td>
                      <BotaoAcao
                        nome={'Editar'}
                        handle={() => handleEditar(items.id)}
                        itens={items.id}
                      />
                      <BotaoAcao
                        nome={'Excluir'}
                        handle={() => handleClose(items.id)}
                        deleteItem={deleteItem}
                        item={items.descricao}
                      />
                    </td>

                    <td></td>
                    <>
                      <ModalExclusao
                        show={show}
                        setShow={setShow}
                        onHide={handleClose}
                        handleClose={handleClose}
                        deleteItem={deleteItem}
                        item={item}
                        id={items.id}
                        handleCloseModal={handleCloseModal}
                        tipo={'produto'}
                        nome={item.descricao}
                      />
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
            <ItensPorPagina
              setItensPorPagina={setItensPorPagina}
              setLoop={setLoop}
              loop={loop}
              itens={itens.length}
            />

          </>
        }
      </div>

    </>
  )
}

export default ListarProdutos
