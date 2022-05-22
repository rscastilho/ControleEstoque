import React, { useState } from 'react'
import styles from './EditarCategoria.module.css'
import { put } from '../../../Services/crudApi'
import { useEffect } from 'react';



const EditarCategoria = (props) => {
    const [descricao, setDescricao] = useState([]);

    const categoriaAtualizada = {
        id: props.item.id,
        descricao
    }

    useEffect(() => {
        setDescricao(props.item)
    }, [props.item])

    const Atualizar = (e) => {
        e.preventDefault()
        put('categorias', categoriaAtualizada).then((resultado) => {
            props.setMostraCaixaEditar(false);
            props.setLoop(true);
            setDescricao('');
        })
    }


    return (
        <div className={``} >
            <div className={`card ms-4 me-4 mt-4 p-2 ${styles.card}`}>
                <h6 className={`${styles.titulo}`}>Editar categoria: {descricao.descricao}</h6>
                <form onSubmit={Atualizar}>
                    <div className={`${styles.itensForm}`}>
                        <label className={`me-1`}> Descrição:
                            <input type="text"
                                className={`ms-2 me-1`}
                                value={descricao.descricao}
                                onChange={(e) => { setDescricao(e.target.value) }}
                                placeholder='Atualizar categoria' />
                        </label>

                        <div>

                            <button type='submit' className={`btn btn-outline-secondary btn-sm me-2 ${styles.bel}`}>Salvar</button>
                            <button type='button' className={`btn btn-outline-warning btn-sm ${styles.bel}`} onClick={() => props.setMostraCaixaEditar(false)}>Cancelar</button>

                        </div>
                    </div>
                </form>
            </div>
                <hr/>
        </div>
    )
}

export default EditarCategoria