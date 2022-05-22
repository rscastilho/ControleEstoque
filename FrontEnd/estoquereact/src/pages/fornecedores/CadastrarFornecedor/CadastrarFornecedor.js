import React, { useState } from 'react'
import { post } from '../../../Services/crudApi'
import styles from './CadastrarFornecedor.module.css'

const CadastrarFornecedor = (props) => {
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const fornecedor = {
      razaoSocial, 
      cnpj
  }
  const handleSalvar = (e) => {
    e.preventDefault()
     post('fornecedores', fornecedor).then(()=> {
        props.setLoop(true)
        handleLimpar()
        props.setMostraCaixaCadastrar(false)
        })
    }

    const handleLimpar = () => {
      setRazaoSocial('');
      }

  return (
    <div className={``} >
    <div className={`card ms-4 me-4 mt-4 p-2 `}>
        <h6>Cadastrar novo fornecedor</h6>
        <form onSubmit={handleSalvar}>
            <div className={`${styles.itensForm}`}>
                <label className={`me-1`}> Razão Social: 
                    <input type="text" 
                    className={`ms-2 me-1`} 
                    value={razaoSocial} 
                    onChange={(e)=> {setRazaoSocial(e.target.value)}} 
                    placeholder='Insira a razão social' />
                </label>
                <label className={`me-1`}> CNPJ: 
                    <input type="text" 
                    className={`ms-2 me-1`} 
                    value={cnpj} 
                    onChange={(e)=> {setCnpj(e.target.value)}} 
                    placeholder='Insira o CNPJ' />
                </label>

                <div>
                    {/* {descricao || props.itemEditar.id && <> */}
                    <button disabled={!razaoSocial || razaoSocial.length < 4 || !cnpj || cnpj.length < 4 } type='submit' className={`btn btn-outline-secondary btn-sm me-2 ${styles.bel}`}>Salvar</button>
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

export default CadastrarFornecedor