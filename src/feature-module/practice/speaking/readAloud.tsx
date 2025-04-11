import React, { useState } from "react";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";

const ReadAloud = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container">
          <div className="practiceLayout">
            <p className="my-3">
              Look at the text below. In 40 seconds, you must read this text
              aloud as naturally and clearly as possible. You have 40 seconds to
              read aloud. Speak within 3 seconds otherwise the microphone will
              close and you will lose the marks.
            </p>
            <div className="card">
              <div className="card-header">
                <div className="card-title text-white">issues and Organs</div>
                {/* <div className="cardBtns">
                  <button className="btn btn-soft-secondary rounded-pill">
                    Easy
                  </button>
                  <button className="btn btn-soft-danger rounded-pill">
                    Easy
                  </button>
                  <button className="btn btn-soft-info rounded-pill">
                    Easy
                  </button>
                  <button className="btn btn-soft-success rounded-pill">
                    Easy
                  </button>
                  <button className="btn btn-outline-light rounded-pill">
                    <i className="fa fa-bookmark"></i>
                  </button>
                </div> */}
              </div>
              <div className="card-body">
                <div className="time">
                  <div className="headBtn">
                    <span className="text-danger">Prepare: 00:40</span>
                    <div className="cardBtns">
                      <button className="btn btn-outline-secondary rounded-pill">
                        Easy
                      </button>
                      <button className="btn btn-outline-danger rounded-pill">
                        New
                      </button>
                      <button className="btn btn-outline-info rounded-pill">
                        Prediction
                      </button>
                      <button className="btn btn-outline-success rounded-pill">
                        Attempted
                      </button>
                      <button className="btn btn-outline-light rounded-pill">
                        <i className="fa fa-bookmark"></i>
                      </button>
                    </div>
                  </div>
                  <div className="innercontent">
                    <p>
                      Tissues are grouped together in the body to form organs.
                      These include the brain, heart, lungs, kidneys, and liver.
                      Each body organ has a specific shape and is made up of
                      different types of tissue that work together. For example,
                      the heart consists mainly of a specialized type of muscle
                      tissue, which contracts rhythmically to provide the
                      heart's pumping action.
                    </p>
                  </div>
                  <div className="micSection">
                    <RecorderComponent />
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

export default ReadAloud;
