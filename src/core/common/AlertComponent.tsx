import React, { useEffect, useState } from "react";
import { Toast, Button } from "react-bootstrap";

interface AlertProps {
  type: "primary" | "secondary" | "warning" | "danger" | "success" | "info";
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const AlertComponent: React.FC<AlertProps> = ({ type, message, onClose, autoClose = true, duration = 3000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!show) return null;

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <Toast
        show={show}
        onClose={() => {
          setShow(false);
          if (onClose) onClose();
        }}
        className={`colored-toast bg-${type} text-white`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <Toast.Header className={`bg-${type} text-white`}>
          <strong className="me-auto">alert</strong>
          {/* <Button variant="close" onClick={() => setShow(false)} aria-label="Close" /> */}
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default AlertComponent;
