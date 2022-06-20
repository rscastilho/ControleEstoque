import React, { useCallback, useState } from 'react'
import WebApi from '../../api/WebApi';
import BotaoAcao from '../../components/botoesAcao/BotaoAcao';
import ModalExclusao from '../../components/ModalExclusao/ModalExclusao';
import { del, getById } from '../../Services/crudApi';


const ItensTable = ({ itens, setItens, setLoop, i, local, localPesquisa }) => {

    const [item, setItem] = useState("");
    const [show, setShow] = useState(false);
    const [mostraCaixaCadastrar, setMostraCaixaCadastrar] = useState(false);
    const [mostraCaixaEditar, setMostraCaixaEditar] = useState(false);
    let coluna = Object.values(itens[i]);
    let novo = Array.from(coluna);

    const handleCloseModal = () => setShow(!show)


    const handleClose = useCallback((id) => {
        const itemCarregado = getById(`${localPesquisa}/${id}`).then(resultado => {
            setItem(resultado.data)
        })
        if (itemCarregado) {
            setShow(!show)
        };
    }, [show])


    const handleEditar = useCallback((id) => {
        getById(`${localPesquisa}/${id}`).then(categoria => {
            setItem(categoria.data)
        })
    }, [])


    const deleteItem = async (id) => {
        const resultado = await del(`${local}/${id}`)
        console.log(resultado)
        const novaLista = itens.filter((item) => item.id !== resultado.id);
        setItens([...novaLista])
        setLoop(true)
    }

    return (
        <>
            {itens &&
                <tbody>
                    <tr>
                        {novo.map((x, i) => (
                            <>
                                <td key={i}>{x}</td>
                            </>
                        ))}
                        <BotaoAcao
                            nome={'Editar'}
                            handle={() => handleEditar(item.id)}
                            itens={item.id}
                        />
                        <BotaoAcao
                            nome={'Excluir'}
                            handle={() => handleClose(item.id)}
                            deleteItem={deleteItem}
                            item={item.descricao}
                        />
                    </tr>
                </tbody>
            }
            <>
                <ModalExclusao
                    show={show}
                    setShow={setShow}
                    onHide={handleClose}
                    handleClose={handleClose}
                    deleteItem={deleteItem}
                    item={item}
                    handleCloseModal={handleCloseModal}
                    tipo={local}
                    nome={itens.descricao}
                />
            </>
        </>

    )
}

export default ItensTable