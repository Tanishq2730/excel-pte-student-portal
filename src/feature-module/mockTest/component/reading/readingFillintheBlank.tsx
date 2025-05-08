import React, { useState } from "react";

const ReadingFillintheBlank: React.FC = () => {
  return (
    <div className="container mt-3">
      <p>
        In the text below some words are missing. Drag words from the box below
        to the appropriate place in the text. To undo an answer choice, drag the
        word back to the box below the text.
      </p>
      <div className="card p-3">
        <p>
          In the text below some words are missing. Drag words from the box
          below to the appropriate place in the text. To undo an answer choice,
          drag the word back to the box below the text.
        </p>
      </div>
      <div className="card p-3">
        <div className="cardButton">
          <button className="btn btn-primary mx-2">Create</button>
          <button className="btn btn-primary mx-2">Regular</button>
        </div>
      </div>
    </div>
  );
};

export default ReadingFillintheBlank;
