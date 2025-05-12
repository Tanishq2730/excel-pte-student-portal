import React from "react";
import Modal from "react-bootstrap/Modal";


interface TimesUpModalProps {
  show: boolean;
  onHide: () => void;
  onButtonClick: () => void;
}

const TimesUpModal: React.FC<TimesUpModalProps> = ({ show, onHide, onButtonClick }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="modal-dcenter"
    >
      <Modal.Body className="text-center">
        <h2 className="modal-title">Times Up</h2>
        <br />
        <p>Please click "Next" to go to the next question</p>
        <br />
        <button className="btn btn-primary mt-2" onClick={onButtonClick}>
          Next
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default TimesUpModal;
