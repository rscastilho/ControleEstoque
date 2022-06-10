import React, { useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './CadastrarImagem.module.css'
import { salvarImagem, put } from './../../../Services/crudApi';
import error from '../../../assets/error-img.jpg'


const CadastrarImagem = (props) => {
  const [carregaImagem, setCarregaImagem] = useState('');
  const [imagemUrl, setImagemUrl] = useState('uploadImage.jpg');
  const [imagemFile, setImagemFile] = useState();
  const openFile = useRef();

  const dadosAtualizados = {
    id: props.item.id,
    descricao: props.item.descricao,
    quantidadeEstoque: props.item.quantidadeEstoque,
    quantidadeMinima: props.item.quantidadeMinima,
    valor: props.item.valor,
    categoriaId: props.item.categoriaId,
    imagemUrl: imagemUrl,
    imagemDestaque: 'uploadImage.jpg',
    destacarImagem: props.item.destacarImagem,
    fornecedorId: props.item.fornecedorId,

  }

  const handleCarregaImagem = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setCarregaImagem(URL.createObjectURL(e.target.files[0]))
        formData.append("image", e.target.files[0])
        setImagemFile(formData)
        const imagemName = e.target.value;
        const nomeFinal = imagemName.slice(12).trim();
        console.log(nomeFinal)
        setImagemUrl(nomeFinal)
        //setImagemFile(e.target.files[0])
      }
      console.log('imagem carregada', image, 'imagemstate', imagemFile)
    }
  }

  const handleOpenFile = () => {
    openFile.current.click()
  }

  const handleSalvarImagem = () => {
    console.log(imagemFile)
    salvarImagem(props.local, imagemFile).then((resultado) => {
      console.log("salvando imagem", resultado)
    }).finally(
      put('produtos', dadosAtualizados).then(() => {
        props.setMostraCaixaEditar(false)
        props.handleCloseModal()
        setCarregaImagem('')
        props.setLoop(true)
      })
    )
    props.setLoop(true)
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton >
        <Modal.Title><h5>Atualizar foto do produto</h5><strong>{props.item.descricao}</strong> </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <div className={`${styles.caixaImagem}`}  >
          {carregaImagem ?
            <img
              className={`${styles.imagem}`}
              src={`${carregaImagem}`}
              alt='imagem' />
            :
            <img
              className={`${styles.imagem}`}
              src={`https://localhost:5001/recursos/imagens/${props.item.imagemUrl}`}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = error
              }}
              alt='imagem'
              onClick={handleOpenFile}
            />
          }

        </div>
        <div className={`${styles.caixaImagem}`}  >
          <input
            className='btn btn-sm mt-2'
            accept='image/*'
            type='file'
            onChange={handleCarregaImagem}
            ref={openFile}

          />

        </div>


      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            handleSalvarImagem()
          }}
        >
          Confirmar
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            setCarregaImagem('')
            props.handleCloseModal()
          }}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CadastrarImagem