import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Titulo from '../../../components/Titulo/Titulo'
import BotaoVoltar from '../BotaoVoltar'
import DashboardItens from './DashboardItens'
import styles from './DashboardPedidos.module.css'


const DashboardPedidos = () => {


  return (
    <>
      <Titulo titulo={"Dashboard Pedidos"} />
      <DashboardItens
        titulo={"Informações sobre pedidos"}
        descricaoQuantidade={"Pedidos processados"}
        linkListarPedidos={'/pedidos'}
        descricaoValoresPedidos={'Pedidos por valores'}
        linkValoresPedidos={'/dashboard/pedidos/valorespedidos'}


      />
      <hr />
      <BotaoVoltar
        local={'/pedidos'}
        nome={'Pedidos'}
      />
    </>
  )
}

export default DashboardPedidos