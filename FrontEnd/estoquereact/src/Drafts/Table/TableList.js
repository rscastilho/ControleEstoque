import React, { useState } from 'react'
import ItensPorPagina from '../../components/ItensPorPagina/ItensPorPagina';
import { getAll } from '../../Services/crudApi';
import ColsNamesTable from './ColsNamesTable'
import ItensTable from './ItensTable';
import SearchByName from './../../components/SearchByName/SearchByName';
import { useEffect } from 'react';


const TableList = ({ local, estilo, localPesquisa }) => {
    const [itens, setItens] = useState([]);
    const [loop, setLoop] = useState(true);
    const [itensPorPagina, setItensPorPagina] = useState(25)


    useEffect(() => {
        if (loop) {
            getAll(`${local}?skip=${0}&take=${itensPorPagina}`).then(resultado => {
                setItens(resultado.data)
                setLoop(false)
            })
        }

    }, [local, loop, itensPorPagina])

    return (
        <div>
            <div>
                {itens &&
                    <>
                        <SearchByName
                            localPesquisa={localPesquisa}
                            paginar={0}
                            itensPorPagina={itensPorPagina}
                            local={local}
                            setItens={setItens}

                        />
                        <table className={`table ${estilo}`}>
                            <ColsNamesTable
                                itens={itens}
                            />
                            {itens.map((_, i) => (
                                <ItensTable
                                    key={i}
                                    itens={itens}
                                    setItens={setItens}
                                    setLoop={setLoop}
                                    i={i}
                                    local={local}
                                    localPesquisa={localPesquisa}
                                />
                            ))}
                        </table>
                    </>
                }
                <ItensPorPagina
                    itens={itens.length}
                    setLoop={setLoop}
                    setItensPorPagina={setItensPorPagina}

                />
                
            </div >
        </div>
    )
}
export default TableList