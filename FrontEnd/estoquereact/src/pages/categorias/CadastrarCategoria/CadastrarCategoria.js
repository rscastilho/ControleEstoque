import React, { useState } from 'react'

import styles from './CadastrarCategoria.module.css'
import 'react-toastify/dist/ReactToastify.css'

import {post} from './../../../Services/crudApi'



const CadastrarCategoria = (props) => {
    
    const [descricao, setDescricao] = useState('');
    const categoria = {
        descricao
    }
    
    const handleSalvar = (e) => {
        e.preventDefault()
         post('categorias', categoria).then(()=> {
            props.setLoop(true)
            handleLimpar()
            props.setMostraCaixaCadastrar(false)
            })
        }

    const handleLimpar = () => {
        setDescricao('');
        }
        

     return (
        <div className={``} >
            <div className={`card ms-4 me-4 mt-4 p-2 `}>
                <h6>Cadastrar nova categoria</h6>
                <form onSubmit={handleSalvar}>
                    <div className={`${styles.itensForm}`}>
                        <label className={`me-1`}> Descrição: 
                            <input type="text" 
                            className={`ms-2 me-1`} 
                            value={descricao} 
                            onChange={(e)=> {setDescricao(e.target.value)}} 
                            placeholder='Insira a categoria' />
                        </label>

                        <div>
                            {/* {descricao || props.itemEditar.id && <> */}
                            <button disabled={!descricao || descricao.length < 4} type='submit' className={`btn btn-outline-secondary btn-sm me-2 ${styles.bel}`}>Salvar</button>
                            <button type='button' className={`btn btn-outline-danger btn-sm ${styles.bel}`} onClick={()=> props.setMostraCaixaCadastrar(false)}>Cancelar</button>
                        {/* </>
                        } */}
                            {/* <button className={`btn btn-outline-secondary btn-sm me-1 ${styles.bel}`} >Salvar</button> */}
                        </div>
                    </div>
                </form>
            </div>
                <hr/>
        </div>
    )
}

export default CadastrarCategoria