import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

interface ConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onButtonClick: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, onHide, onButtonClick }) => {
  const [showModal, setShowModal] = useState<boolean>(show);

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const closeModal = () => {
    setShowModal(false);
    onHide();
  };

  return (
    <Modal
      show={showModal}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="modal-dcenter"
    >
      <Modal.Body className="text-center">
        <h2 className="modal-title">Confirm</h2>
        <br />
        <p>
          Are you sure if you want to submit this answer and go to the next question?
        </p>
        <br />
        <button className="btn btn-primary save" onClick={onButtonClick}>
          Yes
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={closeModal}>
          No
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
