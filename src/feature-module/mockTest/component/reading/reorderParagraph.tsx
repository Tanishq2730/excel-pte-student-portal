import React, { useState } from "react";
import ParaReorder from "../../../practice/component/paraReorder";
const RedorderParagraph: React.FC = () => {
  return (
    <div className="container mt-3">
      <p>
        There are some words missing in the following text. Please select the
        correct word in the drop-down box.
      </p>
      <div className="card p-3">
        Reorder
      </div>
    </div>
  );
};

export default RedorderParagraph;   
