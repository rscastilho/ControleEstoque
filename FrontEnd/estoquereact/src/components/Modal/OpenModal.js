import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const OpenModal = ({ children, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton >
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="outline-secondary" size="sm"> Confirmar </Button> */}
                <Button
                    variant="outline-warning"
                    size="md"
                    onClick={() => {
                        handleClose()
                    }}
                > Fechar 
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OpenModal