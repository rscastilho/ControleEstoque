import React from 'react'
import Titulo from '../../../components/Titulo/Titulo'
import BotaoVoltar from '../BotaoVoltar'

const DashboardFornecedores = () => {
  return (
    <div>
        <Titulo titulo={'Dashboard Fornecedores'}/>
        <BotaoVoltar
          nome={'Fornecedores'}
          local={'/listagemfornecedores'}
        />
    </div>
  )
}

export default DashboardFornecedores