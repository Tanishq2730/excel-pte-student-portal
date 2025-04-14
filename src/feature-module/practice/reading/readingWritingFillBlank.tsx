import React, { useState } from "react";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";

const ReadingWritngFillBlank = () => {
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
                    <span className="text-danger">
                      Submit your response before time finishes! Otherwise your
                      response won`t be saved and scored.
                    </span>
                    <span className="text-danger">Prepare: 00:40</span>
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
                  <div className="innercontent">
                    <p>
                      The discovery of a set of what look like ancient hominin
                      footprints on the island of Crete could throw our
                      understanding of human evolution into disarray. Received
                      wisdom is that after from the chimp lineage, our hominin
                      ancestors were confined to Africa until around 1.5 million
                      years ago. The prints found in Crete, however, to a
                      creature that appears to have lived 5.7 million years ago
                      — suggesting a more complex story. More research is needed
                      to confirm what kind of animal made them. However, the
                      prints seem to have been by a creature that walked
                      upright, on the soles of clawless feet (rather than on its
                      toes), with a big toe positioned like our own, rather than
                      sticking out sideways like an ape's. It may yet turn out
                      to have been a unknown non-hominin that had evolved with a
                      human-like foot; but the explanatory paper, in the
                      Proceedings of the Geologists' Association, is not the
                      first to suggest that hominins could have originated in
                      Europe. A few months ago, a team put forward evidence,
                      gleaned from fossils found in Greece and Bulgaria that a
                      7.2 million-year old ape known as Graecopithecus was in
                      fact a hominin.
                    </p>
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

export default ReadingWritngFillBlank;
