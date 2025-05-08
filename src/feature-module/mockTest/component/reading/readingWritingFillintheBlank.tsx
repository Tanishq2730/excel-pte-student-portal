import React, { useState } from "react";

const ReadingWritingFillintheBlank: React.FC = () => {
  return (
    <div className="container mt-3">
      <p>
      There are some words missing in the following text. Please select the correct word in the drop-down box.
      </p>
      <div className="card p-3">
        <p>
          In the text below some words are missing. Drag words from the box
          below to the appropriate place in the text. To undo an answer choice,
          drag the word back to the box below the text.
        </p>
      </div>
    </div>
  );
};

export default ReadingWritingFillintheBlank;
