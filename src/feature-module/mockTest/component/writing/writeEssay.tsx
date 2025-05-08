import React, { useState } from "react";

const WriteEssay: React.FC = () => {
  return (
    <div className="container mt-3">
      <div className="card p-3">
        <p>
          The 1920's movie goers experience was largely dominated by silent
          movies but saw the introduction of synchronized sound.
        </p>
      </div>
      <div className="card p-3 mt-3">
        <textarea
          className="form-control"
          rows={16}
          placeholder="Write a Summary..."
        ></textarea>
      </div>
    </div>
  );
};

export default WriteEssay;
