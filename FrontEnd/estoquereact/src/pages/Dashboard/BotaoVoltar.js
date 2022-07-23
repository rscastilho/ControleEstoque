import React from 'react'
import { Link } from 'react-router-dom'

const BotaoVoltar = ({local, nome}) => {
  return (
    <>
     <div className='mt-4 text-center'>
        <Link to="/dashboard">
          <button className='btn btn-warning ms-5'>Voltar</button>
        </Link>
        <Link to={local}>
          <button className='btn btn-secondary ms-5'>{nome}</button>
        </Link>
          <button className='btn ms-5' onClick={()=>window.scrollTo(0,0)}>topo</button>
      </div>
    </>
  )
}

export default BotaoVoltar