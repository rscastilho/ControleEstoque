import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Titulo from '../../../components/Titulo/Titulo';
import CadastrarFornecedor from '../CadastrarFornecedor/CadastrarFornecedor';
import styles from './ListarFornecedores.module.css'
import EditarFornecedor from './../EditarFornecedor/EditarFornecedor';
import { FaRegPlusSquare } from 'react-icons/fa';
import TextGetByName from '../../../components/TextGetByName/TextGetByName';
import BotaoAcao from './../../../components/botoesAcao/BotaoAcao';
import { del, getAll, getById } from '../../../Services/crudApi';
import ModalExclusao from '../../../components/ModalExclusao/ModalExclusao';
import ItensPorPagina from '../../../components/ItensPorPagina/ItensPorPagina';
import TextGetByNameFornecedor from '../../../components/TextGetByName/TextGetByNameFornecedor';

const ListarFornecedores = () => {
  const [item, setItem] = useState("");
  const [itens, setItens] = useState([]);
  const [itens2, setItens2] = useState([]);
  const [loop, setLoop] = useState(true);
  const [mostraCaixaCadastrar, setMostraCaixaCadastrar] = useState(false);
  const [mostraCaixaEditar, setMostraCaixaEditar] = useState(false);
  const [show, setShow] = useState(false);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [paginar, setPaginar] = useState(0);


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

  const handleClose = useCallback ((id) => {
    const fornecedor = getById(`fornecedores/${id}`).then(fornecedor => {
      setItem(fornecedor.data)
    })
    if (fornecedor) {
      setShow(!show)
    };
  },[show]);
  
  const handleCloseModal = () => setShow(!show)

  const deleteItem = useCallback(async (id) => {
    const resultado = await del(`fornecedores/${id}`)
    const novaLista = itens.filter((item) => item.id !== resultado.id);
    setItens([...novaLista])
    setLoop(true)
  }, [itens]);

  const carregar =async() => {
    await getAll(`Fornecedores?skip=${paginar}&take=${itensPorPagina}`).then(fornecedores => {
      setItens(fornecedores.data)
      setLoop(!loop)
      console.log('listaFornecedor')
    })
  };

  useEffect(() => {
    if (loop) {
      carregar()
    }
  }, [loop])


  return (
    <div className='container'>
      <Titulo
        titulo={'Fornecedores cadastrados'} />

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
          <TextGetByNameFornecedor
            setLoop={setLoop}
            setItens={setItens}
            itens={itens}
            setItens2={setItens2}
            itens2={itens2}
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
              <td>{items.razaoSocial}</td>
              <td>{items.cnpj}</td>
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
    </div>

  )
}

export default ListarFornecedores