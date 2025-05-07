import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import "../../css/modal.css";

interface AlertModalProps {
  show: boolean;
  onHide: () => void;
  onButtonClick: () => void;
  onCloseClick: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  show,
  onHide,
  onButtonClick,
  onCloseClick,
}) => {
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
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      className="modal-dcenter"
    >
      <Modal.Body className="text-center">
        <h2 className="modal-title">Test Resumed</h2>
        <br />
        <p>Click "Continue" to start the test.</p>
        <br />
        <button className="btn-theme-v3 save" onClick={onButtonClick}>
          Continue
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn-theme-v3" onClick={onCloseClick}>
          No
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
