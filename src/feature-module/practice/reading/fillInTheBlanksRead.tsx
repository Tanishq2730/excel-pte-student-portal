import React, { useState } from "react";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";
import Mcq from "../component/mcq";

const FillInTheBlanksRead = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const options = [
    { id: "A", text: "fear" },
    { id: "B", text: "should" },
    {
      id: "C",
      text: "arises",
    },
    { id: "D", text: "all" },
    { id: "E", text: "it" },
    { id: "F", text: "find" },
    { id: "G", text: "never" },
  ];

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
                      <button className="btn btn-outline-secondary py-1 rounded-pill">
                        Easy
                      </button>
                      <button className="btn btn-outline-danger py-1 rounded-pill">
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

                  <div className="innercontent mt-0">
                    <p>
                      Sensitivity to physical laws is thus an important
                      consideration for the maker of applied-art objects. It is
                      often taken for granted that this is also true for the
                      maker of fine-art objects. This assumption misses a
                      significant difference between the two disciplines.
                      Fine-art objects are not constrained by the laws of
                      physics in the same way that applied-art objects are.
                      Because their primary purpose is not functional, they are
                      only limited in terms of the materials used to make them.
                      Sculptures must, for example, be stable, which requires an
                      understanding of the properties of mass, weight
                      distribution, and stress. Paintings must have rigid
                      stretchers so that the canvas will be taut, and the paint
                      must not deteriorate, crack, or discolor. These are
                      problems that must be overcome by the artist because they
                      tend to intrude upon his or her conception of the work.
                      For example, in the early Italian Renaissance, bronze
                      statues of horses with a raised foreleg usually had a
                      cannonball under that hoof. This was done because the
                      cannonball was needed to support the weight of the leg. In
                      other words, the demands of the laws of physics, not the
                      sculptor's aesthetic intentions, placed the ball there.
                      That this device was a necessary structural compromise is
                      clear from the fact that the cannonball quickly
                      disappeared when sculptors learned how to strengthen the
                      internal structure of a statue with iron braces (iron
                      being much stronger than bronze).
                    </p>
                  </div>

                  {/* ✅ Options rendered here */}
                  <div className="innercontent">
                    <div className="selectableBtn d-flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option.id}
                          className="btn btn-soft-secondary rounded-pill"
                        >
                          {option.text}
                        </button>
                      ))}
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

export default FillInTheBlanksRead;
