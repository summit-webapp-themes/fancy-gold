import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const PurityWarningModal = ({show,handleClose, purity,handleClearCart}:any) => {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Body>Please complete your 22KT order or clear cart</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Continue with {purity}
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default PurityWarningModal