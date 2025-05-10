import React, { useState, useEffect, useCallback, useRef } from "react";

const McChooseSingleAnswer: React.FC<{ question: any }> = ({ question }) => {
  console.log("question", question);
  const [checkedOptions, setCheckedOptions] = useState<string | null>(null);

  const options = [
    { id: "A", text: question?.option_one },
    { id: "B", text: question?.option_two },
    { id: "C", text: question?.option_three },
    { id: "D", text: question?.option_four },
    { id: "E", text: question?.option_five },
  ].filter((option) => option.text?.trim() !== "");

  const handleChange = (optionId: string) => {
    setCheckedOptions(optionId);
  };

  return (
    <div className="container mt-3">
      <p>
        In the text below some words are missing. Drag words from the box below
        to the appropriate place in the text.
      </p>
      <div className="row">
        <div className="col-md-12">
          <div className="card p-3">
            <div className="card-header">
              <div className="card-title">
                <div
                  dangerouslySetInnerHTML={{
                    __html: question.question,
                  }}
                />
              </div>
            </div>
            <div className="card-body">
              <div className="col-12 col-md-12">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="col-12 col-md-12"
                  >
                    <div
                      className={`d-flex align-items-center border rounded p-3 h-100 ${checkedOptions === option.id
                          ? "border-primary"
                          : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="mcq-option"
                        className="form-check-input m-auto me-3"
                        id={`option-${option.id}`}
                        checked={
                          checkedOptions === option.id
                        }
                        onChange={() =>
                          handleChange(option.id)
                        }
                      />
                      <label
                        htmlFor={`option-${option.id}`}
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
                          {option.id}
                        </div>
                        <span>{option.text}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McChooseSingleAnswer;
