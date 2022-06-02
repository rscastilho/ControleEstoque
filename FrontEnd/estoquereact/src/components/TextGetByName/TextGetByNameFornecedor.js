import React, { useState } from 'react'

import {getAll, getByName} from '../../Services/crudApi'

const TextGetByNameFornecedor = (props) => {
    const [pesquisa, setPesquisa] = useState('');

const handleSearch = (e)=>{
    setPesquisa(e.target.value)
    if(pesquisa.trim().length >=3 ){
             
        setTimeout(()=>{
            props.setItens('')
            getByName(`${props.localPesquisa}/${pesquisa}`).then((resultado)=>{
                props.setItens(resultado.data);
                            })
        },500)
    } else{
        setTimeout(()=> {
            getAll(`${props.local}?skip=${props.paginar}&take=${props.itensPorPagina}`)
                       
            .then((resultado)=> {
                  props.setItens(resultado.data)
            })
        },500)
    }
}
    

  return (
    <>
    <input className='form-control'
            type="text"
            placeholder='Pesquisar'
            value={pesquisa}
            onChange={(e)=> handleSearch(e) }
            minLength='3'
            maxLength='60' />
    </>
  )
}

export default TextGetByNameFornecedor