import React from 'react'
import { Link } from 'react-router-dom'
import Titulo from '../../components/Titulo/Titulo'
import TableList from './TableList'


const TestComponent = () => {

  return (
    <>
      <Titulo titulo={'Testando tabelas dinamicamente'} />
      <TableList
        estilo={``}
        local={'fornecedores'}
        localPesquisa={'Fornecedores/listarfornecedores'}
      />
      <div className='mt-4'>
        <Link to="/dashboard">
          <button className='btn btn-warning'>Voltar</button>
        </Link>

      </div>
    </>
  )
}

export default TestComponent