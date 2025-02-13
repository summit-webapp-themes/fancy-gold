import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ClearCartModal({ show, handleClose, onConfirmDelete, title, message }: any) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirmDelete}>
          {title}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClearCartModal;
