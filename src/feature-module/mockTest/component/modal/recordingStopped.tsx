import React from "react";
import Modal from "react-bootstrap/Modal";

interface RecordingStoppedModalProps {
  show: boolean;
  onHide: () => void;
  onButtonClick: () => void;
}

const RecordingStoppedModal: React.FC<RecordingStoppedModalProps> = ({
  show,
  onHide,
  onButtonClick,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="modal-dcenter"
    >
      <Modal.Body className="text-center">
        <h2 className="modal-title">Recording Stopped</h2>
        <br />
        <p>Please click "Next" to go to the next question</p>
        <br />
        <button className="btn-theme-v3" onClick={onButtonClick}>
          Next
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default RecordingStoppedModal;
