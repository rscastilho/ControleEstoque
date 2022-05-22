import { Modal, Button } from 'react-bootstrap'

const ModalExclusao = (props) => {


    return (

        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton >
                <Modal.Title>Confirmar exclusão </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>Deseja realmente excluir {props.tipo} 
                <strong className='ms-1' style={{ color: 'red' }}>
                {props.nome} 
                </strong> ?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => {
                    props.deleteItem(props.id)
                    props.handleCloseModal()
                }} size="sm">
                    Confirmar
                </Button>
                <Button variant="outline-danger" onClick={()=> props.handleCloseModal()} size="sm">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalExclusao