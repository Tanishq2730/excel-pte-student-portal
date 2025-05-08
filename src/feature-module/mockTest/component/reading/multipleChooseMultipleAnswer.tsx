import React from "react";

const MultipleChooseMultipleAnswer: React.FC = () => {
  return (
    <div className="container mt-3">
      <p>
        In the text below some words are missing. Drag words from the box below
        to the appropriate place in the text.
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="card p-3">
            In the text below some words are missing. Drag words from the box
            below to the appropriate place in the text. To undo an answer
            choice, drag the word back to the box below the text.
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <div className="card-header">
              <div className="card-title">
                According to paragraph, sculptors in the Italian Renaissance
                stopped using cannonballs in bronze statues of horses because
              </div>
            </div>
            <div className="card-body">
              <div className="col-12 col-md-12">
                <div className="d-flex align-items-center border rounded p-3 h-100">
                  <input
                    type="radio"
                    name="mcq-option"
                    className="form-check-input m-auto me-3"
                    id="option-A"
                  />
                  <label
                    htmlFor="option-A"
                    className="d-flex align-items-center w-100"
                  >
                    <div
                      className="me-3 d-flex justify-content-center align-items-center bg-primary text-white fw-bold rounded"
                      style={{
                        width: "30px",
                        height: "30px",
                        minWidth: "30px",
                      }}
                    >
                      A
                    </div>
                    <span>This is static option A</span>
                  </label>
                </div>
              </div>

              <div className="col-12 col-md-12 mt-3">
                <div className="d-flex align-items-center border rounded p-3 h-100">
                  <input
                    type="radio"
                    name="mcq-option"
                    className="form-check-input m-auto me-3"
                    id="option-B"
                  />
                  <label
                    htmlFor="option-B"
                    className="d-flex align-items-center w-100"
                  >
                    <div
                      className="me-3 d-flex justify-content-center align-items-center bg-primary text-white fw-bold rounded"
                      style={{
                        width: "30px",
                        height: "30px",
                        minWidth: "30px",
                      }}
                    >
                      B
                    </div>
                    <span>This is static option B</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChooseMultipleAnswer;
