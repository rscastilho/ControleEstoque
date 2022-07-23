import React, { useState } from 'react'

import { getAll, getByName } from '../../Services/crudApi'

const SearchByName = ({ localPesquisa, setItens, local, paginar, itensPorPagina }) => {
    const [pesquisa, setPesquisa] = useState('');

    const handleSearch = (e) => {
        setPesquisa(e.target.value)
        if (pesquisa.trim().length >= 3) {
            setTimeout(() => {
                getByName(`${localPesquisa}/${pesquisa}`).then((resultado) => {
                    setItens(resultado.data);
                })
            }, 500)
        } else {
            setTimeout(() => {
                getAll(`${local}?skip=${paginar}&take=${itensPorPagina}`)
                    .then((resultado) => {
                        setItens(resultado.data)
                    })
            }, 10)
        }
    }

    return (
        <>
            <input className='form-control'
                type="text"
                placeholder='Pesquisar por nome'
                value={pesquisa}
                onChange={(e) => handleSearch(e)}
                minLength='3'
                maxLength='60' />
        </>
    )
}

export default SearchByName