import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";


interface CannotSkipProps {
  show: boolean;
  onHide: () => void;
}

const CannotSkipModal: React.FC<CannotSkipProps> = ({ show, onHide }) => {
  const [showModal, setShowModal] = useState<boolean>(show);

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const closeModal = () => {
    setShowModal(false);
    onHide();
  };

  return (
    <Modal show={showModal} className="modal-dcenter">
      <Modal.Body className="text-center">
        <h2 className="modal-title">Cannot Skip</h2>
        <br />
        <p>
          You need to finish answering this question before going to the next.
        </p>
        <br />
        <button className="btn-theme-v3" onClick={closeModal}>
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default CannotSkipModal;
