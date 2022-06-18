import { useState, useEffect, useMemo, useCallback } from 'react';
import WebApi from '../../../api/WebApi';
import BotaoAcao from '../../../components/botoesAcao/BotaoAcao';
import Titulo from '../../../components/Titulo/Titulo';
import CadastrarCategoria from '../CadastrarCategoria/CadastrarCategoria';
import EditarCategoria from '../EditarCategoria/EditarCategoria';
import { getAll, getById } from './../../../Services/crudApi'
import styles from './ListagemCategorias.module.css'
import { FaRegPlusSquare } from 'react-icons/fa'
import SearchByName from '../../../components/SearchByName/SearchByName';
import ModalExclusao from '../../../components/ModalExclusao/ModalExclusao';
import ItensPorPagina from '../../../components/ItensPorPagina/ItensPorPagina';
import Loading from '../../../components/Loading/Loading';

const ListagemCategorias = () => {

  const [item, setItem] = useState("");
  const [itens, setItens] = useState([]);
  const [loop, setLoop] = useState(true);
  const [mostraCaixaCadastrar, setMostraCaixaCadastrar] = useState(false);
  const [mostraCaixaEditar, setMostraCaixaEditar] = useState(false);
  const [show, setShow] = useState(false);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [paginar, setPaginar] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //abertura e fechamento do modal exclusao
  const handleClose = useCallback((id) => {
    const categoria = getById(`categorias/pesquisarporid/${id}`).then(categoria => {
      setItem(categoria.data.usuario)

    })
    if (categoria) {
      setShow(!show)
    };
  }, [show])

  const handleCloseModal = () => setShow(!show)

  //deleta a categoria chamada no botao dentro do modal
  const deleteItem = async (id) => {
    const resultado = await WebApi.delete(`Categorias/${id}`)
    console.log(resultado)
    const novaLista = itens.filter((item) => item.id !== resultado.id);
    setItens([...novaLista])
    setLoop(true)

  }

  useEffect(() => {
    if (loop) {
      getAll(`Categorias?skip=${paginar}&take=${itensPorPagina}`).then(categorias => {
        setItens(categorias.data)
        setLoop(!loop)
        setIsLoading(false);
      })
    }
  }, [loop, paginar, itensPorPagina])


  //abre e fecha o componente cadasrtar 
  const handleCaixaCadastrar = () => {
    setMostraCaixaEditar(false);
    setMostraCaixaCadastrar(!mostraCaixaCadastrar);
  }

  //abre e fecha o componente editar carregando o item clicado
  const handleEditar = useCallback((id) => {
    setMostraCaixaEditar(true)
    setMostraCaixaCadastrar(false);
    getById(`categorias/pesquisarporid/${id}`).then(categoria => {
      setItem(categoria.data.usuario)
    })
  }, [])

  return (
    <div className='container'>
      {isLoading ?
        <Loading isLoading={isLoading} />
        :
        <>
          <div>
            <Titulo titulo={'Categorias cadastradas'} />
            <div>
              {mostraCaixaCadastrar &&
                <CadastrarCategoria setLoop={setLoop} setMostraCaixaCadastrar={setMostraCaixaCadastrar} />
              }
            </div>
            <div>
              {mostraCaixaEditar &&
                <EditarCategoria setLoop={setLoop} item={item} setMostraCaixaEditar={setMostraCaixaEditar} />
              }
            </div>
          </div>
          <div className={`${styles.botaoAcao} row`}>
            <div className={`${styles.botaoAdd}`}>
              {!mostraCaixaCadastrar &&
                <button className='btn btn-outline-secondary border-0 btn-sm mb-2'
                  type='button'
                  onClick={handleCaixaCadastrar}>
                  <FaRegPlusSquare size={18} className="me-2" />
                  Nova categoria
                </button>
              }
            </div>

            <div>
              <SearchByName
                setLoop={setLoop}
                setItens={setItens}
                itens={itens}
                local={'categorias'}
                localPesquisa={'categorias'}
                paginar={paginar}
                itensPorPagina={itensPorPagina}
              />
            </div>

          </div>

          <table className='table table-hover'>
            <thead>
              <tr>
                <th></th>
                <th> Descrição</th>
                <th> Ação</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {itens && itens.map((items) => (
                <tr key={items.id}>
                  <td></td>
                  <td>{items.descricao}</td>
                  {/* {items.quantidadeEstoque && <td>{items.quantidadeEstoque}</td>} */}
                  <td>
                    <BotaoAcao
                      nome={'Editar'}
                      handle={() => handleEditar(items.id)}
                      itens={items.id}
                    />
                    <BotaoAcao
                      nome={'Excluir'}
                      handle={() => handleClose(items.id)}
                      deleteCategoria={deleteItem}
                      item={items.descricao}
                    />
                  </td>
                  <td>
                  </td>
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
                      tipo={'categoria'}
                      nome={items.descricao}
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
  )
}

export default ListagemCategorias