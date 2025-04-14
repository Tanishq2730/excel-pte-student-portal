import React, { useState } from "react";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";

const options = [
  { id: "A", text: "they began using a material that much stronger" },
  { id: "B", text: "they found a way to strengthen the statues internally" },
  { id: "C", text: "the aesthetic tastes of the public had changed over time" },
  { id: "D", text: "the cannonballs added too much weight to the statues" },
];

const MultipleChooseSingleAnswer = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container">
          <div className="practiceLayout">
            <p className="my-3">
              Read the text and answer the question by selecting all the correct
              responses. More than one response is correct.
            </p>
            <div className="card">
              <div className="card-header">
                <div className="card-title text-white">
                  <CardHeading />
                </div>
              </div>
              <div className="card-body">
                <div className="time">
                  <div className="headBtn">
                    <div>
                      <div>
                        <span className="text-danger">Time: 00:40</span>
                      </div>
                    </div>
                    <div className="cardBtns">
                      <button className="btn btn-outline-secondary  py-1 rounded-pill">
                        Easy
                      </button>
                      <button className="btn btn-outline-danger  py-1 rounded-pill">
                        New
                      </button>
                      <button className="btn btn-outline-info py-1 rounded-pill">
                        Prediction
                      </button>
                      <button className="btn btn-outline-success py-1 rounded-pill">
                        Attempted
                      </button>
                      <button className="btn btn-outline-light py-1 rounded-pill">
                        <i className="fa fa-bookmark"></i>
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="innercontent mt-0">
                        <p>
                          Sensitivity to physical laws is thus an important
                          consideration for the maker of applied-art objects. It
                          is often taken for granted that this is also true for
                          the maker of fine-art objects. This assumption misses
                          a significant difference between the two disciplines.
                          Fine-art objects are not constrained by the laws of
                          physics in the same way that applied-art objects are.
                          Because their primary purpose is not functional, they
                          are only limited in terms of the materials used to
                          make them. Sculptures must, for example, be stable,
                          which requires an understanding of the properties of
                          mass, weight distribution, and stress. Paintings must
                          have rigid stretchers so that the canvas will be taut,
                          and the paint must not deteriorate, crack, or
                          discolor. These are problems that must be overcome by
                          the artist because they tend to intrude upon his or
                          her conception of the work. For example, in the early
                          Italian Renaissance, bronze statues of horses with a
                          raised foreleg usually had a cannonball under that
                          hoof. This was done because the cannonball was needed
                          to support the weight of the leg. In other words, the
                          demands of the laws of physics, not the sculptor's
                          aesthetic intentions, placed the ball there. That this
                          device was a necessary structural compromise is clear
                          from the fact that the cannonball quickly disappeared
                          when sculptors learned how to strengthen the internal
                          structure of a statue with iron braces (iron being
                          much stronger than bronze).
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="chooseSection">
                        <div className="">
                          <div className="card shadow-sm">
                            <div className="card-header bg-white">
                              <h5 className="mb-0">
                                According to paragraph, sculptors in the Italian
                                Renaissance stopped using cannonballs in bronze
                                statues of horses because
                              </h5>
                            </div>
                            <div className="card-body">
                              <div className="row g-3">
                                {options.map((option) => (
                                  <div
                                    key={option.id}
                                    className="col-12 col-md-12"
                                  >
                                    <div
                                      className={`d-flex align-items-center border rounded p-3 h-100 ${
                                        selectedOption === option.id
                                          ? "border-primary"
                                          : ""
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name="mcq-option"
                                        className="form-check-input m-auto me-3"
                                        id={`option-${option.id}`}
                                        checked={selectedOption === option.id}
                                        onChange={() => handleChange(option.id)}
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
                  </div>
                  {showAnswer && (
                    <div
                      className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                      style={{ background: "#ffe4e4" }}
                    >
                      <div
                        className="audio-inner p-4 rounded-3"
                        style={{ background: "#ffe4e4" }}
                      >
                        <h3 className="fw-semibold mb-2">Audio Answer:</h3>
                        <hr />
                        <div className="rounded-pill">
                          <audio controls className="w-100">
                            <source
                              src="your-audio-file.mp3"
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bottomBtn mt-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="btnBottom">
                          <button className="btn btn-outline-secondary">
                            Submit
                          </button>
                          <button
                            className="btn btn-outline-secondary mx-3"
                            onClick={handleAnswerClick}
                          >
                            Answer
                          </button>
                          <button className="btn btn-outline-secondary">
                            Re-Start
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="btnBottom text-end">
                          <button
                            className="btn btn-outline-secondary mx-3"
                            disabled
                          >
                            Previous
                          </button>
                          <button className="btn btn-outline-secondary">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="community">
            <Community />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChooseSingleAnswer;
