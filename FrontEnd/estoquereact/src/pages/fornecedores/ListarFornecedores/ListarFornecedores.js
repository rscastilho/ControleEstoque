import React, { useCallback, useMemo, useState } from 'react'
import Titulo from '../../../components/Titulo/Titulo';
import CadastrarFornecedor from '../CadastrarFornecedor/CadastrarFornecedor';
import styles from './ListarFornecedores.module.css'
import EditarFornecedor from './../EditarFornecedor/EditarFornecedor';
import { FaRegPlusSquare } from 'react-icons/fa';
import BotaoAcao from './../../../components/botoesAcao/BotaoAcao';
import { del, getAll, getById } from '../../../Services/crudApi';
import ModalExclusao from '../../../components/ModalExclusao/ModalExclusao';
import ItensPorPagina from '../../../components/ItensPorPagina/ItensPorPagina';
import SearchByName from '../../../components/SearchByName/SearchByName';
import { UtilService } from '../../../Services/util'
import Loading from './../../../components/Loading/Loading';

const ListarFornecedores = () => {
  const [item, setItem] = useState("");
  const [itens, setItens] = useState([]);
  const [loop, setLoop] = useState(true);
  const [mostraCaixaCadastrar, setMostraCaixaCadastrar] = useState(false);
  const [mostraCaixaEditar, setMostraCaixaEditar] = useState(false);
  const [show, setShow] = useState(false);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [paginar] = useState(0);
  const [isLoading, setIsloading] = useState(true);


  const handleCaixaCadastrar = () => {
    setMostraCaixaEditar(false);
    setMostraCaixaCadastrar(!mostraCaixaCadastrar);
  }
  const handleEditar = useCallback((id) => {
    setMostraCaixaEditar(true)
    setMostraCaixaCadastrar(false);
    getById(`fornecedores/${id}`).then(fornecedor => {
      setItem(fornecedor.data)
    })
  }, []);

  const handleClose = useCallback((id) => {
    const fornecedor = getById(`fornecedores/${id}`).then(fornecedor => {
      setItem(fornecedor.data)
    })
    if (fornecedor) {
      setShow(!show)
    };
  }, [show]);

  const handleCloseModal = () => setShow(!show);

  const deleteItem = useCallback(async (id) => {
    const resultado = await del(`fornecedores/${id}`)
    const novaLista = itens.filter((item) => item.id !== resultado.id);
    setItens([...novaLista])
    setLoop(true)
    setIsloading(false);
  }, [itens]);

  const carregar = useCallback(() => {
    getAll(`Fornecedores?skip=${paginar}&take=${itensPorPagina}`).then(fornecedores => {
      setItens(fornecedores.data)
      setLoop(!loop)
      setIsloading(false);
    })
  }, [itensPorPagina, loop, paginar]);

  useMemo(() => {
    if (loop) {
      carregar()
    }
  }, [loop])


  return (
    <div className='container'>
      <Titulo
        titulo={'Fornecedores cadastrados'} />
      {isLoading
        ?
        <>
          <Loading isLoading={isLoading} />
        </>
        :
        <>
          <div>
            <div>
              {mostraCaixaCadastrar &&
                <CadastrarFornecedor
                  setLoop={setLoop}
                  setMostraCaixaCadastrar={setMostraCaixaCadastrar} />
              }
            </div>
            <div>
              {mostraCaixaEditar &&
                <EditarFornecedor
                  setLoop={setLoop}
                  item={item}
                  setMostraCaixaEditar={setMostraCaixaEditar} />
              }
            </div>
          </div>
          <div className={`${styles.botaoAcao} row`}>
            <div className={`${styles.botaoAdd}`}>
              {!mostraCaixaCadastrar &&
                <button className='btn btn-outline-secondary border-0 btn-sm mb-2'
                  type='button'
                  onClick={handleCaixaCadastrar}>
                  <FaRegPlusSquare
                    size={18}
                    className="me-2" />
                  Novo fornecedor
                </button>
              }
            </div>

            <div>
              <SearchByName
                setLoop={setLoop}
                setItens={setItens}
                itens={itens}
                localPesquisa={'Fornecedores/listarfornecedores'}
                local={'Fornecedores'}
                paginar={paginar}
                itensPorPagina={itensPorPagina}
              />
            </div>

          </div>

          <table className='table table-hover'>
            <thead>
              <tr>
                <th> Descrição</th>
                <th> CNPJ</th>
                <th> Ação</th>
              </tr>
            </thead>

            <tbody>
              {itens && itens.map((items) => (

                <tr key={items.id}>
                  <td>{UtilService.getUpperCase(items.razaoSocial)}</td>
                  <td>{UtilService.cnpj(items.cnpj)}</td>
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
                    />
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
                      tipo={'fornecedor'}
                      nome={item.razaoSocial}
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

export default ListarFornecedores