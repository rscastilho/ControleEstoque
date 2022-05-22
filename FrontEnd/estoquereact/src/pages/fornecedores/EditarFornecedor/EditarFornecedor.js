import React, { useEffect, useState } from 'react'
import { put } from '../../../Services/crudApi';
import styles from './EditarFornecedor.module.css'

const EditarFornecedor = (props) => {
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const fornecedor = {
    id: props.item.id,
    razaoSocial,
    cnpj
  }

  useEffect(() => {
    setRazaoSocial(props.item.razaoSocial)
    setCnpj(props.item.cnpj)
  }, [props.item])

  const Atualizar = (e) => {
    e.preventDefault()
    put('fornecedores', fornecedor).then((resultado) => {
      props.setMostraCaixaEditar(false);
      props.setLoop(true);
      setRazaoSocial('');
      setCnpj('');
    })
  }




  return (
    <div className={``} >
      <div className={`card ms-4 me-4 mt-4 p-2 `}>
        <h6>Atualizar fornecedor</h6>
        <form onSubmit={Atualizar}>
          <div className={`${styles.itensForm}`}>
            <label className={`me-1`}> Razão Social:
              <input type="text"
                className={`ms-2 me-1`}
                value={razaoSocial}
                onChange={(e) => { setRazaoSocial(e.target.value) }}
                placeholder='Razão social' />
            </label>
            <label className={`me-1`}> CNPJ:
              <input type="text"
                className={`ms-2 me-1`}
                value={cnpj}
                onChange={(e) => { setCnpj(e.target.value) }}
                placeholder='CNPJ' />
            </label>

            <div>
              <button disabled={!razaoSocial || razaoSocial.length < 4 || !cnpj || cnpj.length < 4} type='submit' className={`btn btn-outline-secondary btn-sm me-2 ${styles.bel}`}>Salvar</button>
              <button type='button' className={`btn btn-outline-warning btn-sm ${styles.bel}`} onClick={() => props.setMostraCaixaEditar(false)}>Cancelar</button>
              
            </div>
          </div>
        </form>
      </div>
      <hr />
    </div>
  )
}

export default EditarFornecedor