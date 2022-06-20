import { Modal, Button } from 'react-bootstrap'

const ModalExclusao = ({
    show,
    handleClose,
    tipo,
    item,
    deleteItem,
    handleCloseModal
}) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton >
                <Modal.Title>Confirmar exclusão </Modal.Title>
            </Modal.Header>
            <Modal.Body>Deseja realmente excluir {tipo}
                <strong className='ms-1' style={{ color: 'red' }}>
                    {item.descricao ? item.descricao : item.razaoSocial}
                </strong> ?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => {
                    deleteItem(item.id)
                    handleCloseModal()
                }} size="sm">
                    Confirmar
                </Button>
                <Button variant="outline-danger" onClick={() => handleCloseModal()} size="sm">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalExclusao