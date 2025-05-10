import React, { useState } from "react";

const WriteEmail: React.FC<{ question: any }> = ({ question }) => {
  return (
    <div className="container mt-3">
      <div className="card p-3">
        <div
            dangerouslySetInnerHTML={{
              __html: question.question,
            }}
          />
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

export default WriteEmail;
