import React, { useState } from "react";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";
import AudioPlayer from "../component/audioPlayer";

const options = [
  { id: "A", text: "they began using a material that much stronger" },
  { id: "B", text: "they found a way to strengthen the statues internally" },
  {
    id: "C",
    text: "the aesthetic tastes of the public had changed over time",
  },
  { id: "D", text: "the cannonballs added too much weight to the statues" },
];
const WriteFromDictation = () => {
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
              There are some words missing in the following text. Please select
              the correct word in the drop-down box.
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
                    <span className="text-danger">Time: 00:40</span>
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
                  <div className="mb-3">
                    <AudioPlayer />
                  </div>
                  <div className="card">
                    <div className="card-header bg-white">
                      <div className="card-title"><h5>Total Word Count: 0</h5></div>
                    </div>
                    <div className="card-body">
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Write a Summary..."
                      ></textarea>
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

export default WriteFromDictation;
