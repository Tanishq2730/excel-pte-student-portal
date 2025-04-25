import React, { useState } from "react";
import Swal from "sweetalert2";

const MyNotes: React.FC = () => {
  const [text, setText] = useState("");
  const [savedText, setSavedText] = useState("");

  const handleSave = () => {
    setSavedText(text);
    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Your note has been saved successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleReset = () => {
    setText("");
    setSavedText("");
  };

  return (
    <div className="card mt-3" style={{ backgroundColor: "#fff8dc" }}>
      <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
        <h5 className="mb-0 text-white">My Notes</h5>
        {/* Optional: Add a close button if you want */}
      </div>

      <div className="card-body">
        <textarea
          className="form-control"
          style={{ height: "200px", backgroundColor: "#fff8dc" }}
          value={savedText || text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="card-footer d-flex justify-content-end gap-2">
        <button className="btn btn-danger" onClick={handleReset}>
          <i className="bi bi-arrow-clockwise me-1"></i> RESET
        </button>
        <button className="btn btn-success" onClick={handleSave}>
          <i className="bi bi-save me-1"></i> SAVE
        </button>
      </div>
    </div>
  );
};

export default MyNotes;
