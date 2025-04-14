import React, { useState } from "react";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";

const SummarizeWritinText = () => {
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
              Read the passage below and summarize it using one sentence. Type
              your response in the box at the bottom of the screen. You have 10
              minutes to finish this task. Your response will be judged on the
              quality of your writing and on how well your response presents the
              key points in the passage.
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
                      The ways of life Upper Paleolithic people are known
                      through the remains of meals scattered around their
                      hearths, together with many tools and weapons and the
                      debris left over from their making. The people were
                      hunter-gathers who lived exclusively from what they could
                      find in nature without practicing either agriculture or
                      herding. They hunted the bigger herbivores, while berries,
                      leaves, roots, wild fruit and mushrooms probably played a
                      major role in their diet. Their hunting was
                      indiscriminate; perhaps because so many animals were about
                      they did not need to spare pregnant females or the young.
                      In the cave of Enlene, for example, many bones of reindeer
                      and bison fetuses were found. Apparently, upper
                      Paleolithic people hunted like other predators and killed
                      the weakest prey first. They did, however, sometimes
                      concentrate on salmon suns and migrating herds of
                      reindeer. Contrary to popular beliefs about cave man,
                      upper Paleolithic people did not live deep inside caves.
                      They rather close the foot of cliffs, especially when an
                      overhang provided good shelter. On the plains and in the
                      valleys, they used tents made from hides of the animals
                      they killed. At time, on the great Russian plains, they
                      built huts with huge bones and tusks collected from
                      skeletons of mammals. Men hunted mostly with spears, the
                      bow and arrow were probably not invented until the
                      Magdalenian period that came at the end of the Upper
                      Paleolithic.
                    </p>
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

export default SummarizeWritinText;
