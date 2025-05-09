import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";
import { fetchQuestionData } from "../../../api/practiceAPI";
import { QuestionData } from "../../../core/data/interface";
import { all_routes } from "../../router/all_routes";
import CardButton from "../component/cardButton";
import QuestionNavigation from "../component/questionNavigation";
import AudioPlayer from "../component/audioPlayer";
import PageHeading from "../component/pageHeading";
import MyNotes from "../component/myNotes";

const SummarizeSpokenText = () => {
  const { subtype_id, question_id } = useParams<{
    subtype_id: string;
    question_id?: string;
  }>();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [resetRecording, setResetRecording] = useState<boolean>(false); // Add reset state
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const subtypeIdNum = Number(subtype_id);
        const questionIdNum = question_id ? Number(question_id) : 0;

        const res = await fetchQuestionData(subtypeIdNum, questionIdNum);

        if (!res.success || !res.data) {
          // Redirect back if no data found
          navigate(all_routes.adminDashboard); // Goes back to the previous page
          return;
        }

        setQuestionData(res.data);
      } catch (err) {
        console.error("Error fetching question data:", err);
        navigate(-1); // Redirect on fetch error as well
      }
    };

    if (subtype_id) {
      getData();
    }
  }, [subtype_id, question_id, navigate]);

  useEffect(() => {
    if (questionData?.Subtype?.preparation_time) {
      const preparationTimeInSeconds = parseInt(
        questionData.Subtype.preparation_time,
        10
      );
      setCountdown(preparationTimeInSeconds);
      setTimerActive(true);
    }
  }, [questionData]);

  const startRecordingCallback = useCallback(() => {
    if (questionData && questionData.Subtype.preparation_time === "0") {
      document.getElementById("startRecordingButton")?.click();
    }
  }, [questionData]);

  useEffect(() => {
    let intervalId: number;

    if (timerActive && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && countdown <= 0) {
      setTimerActive(false);
      startRecordingCallback(); // Start recording after countdown ends
    }

    return () => clearInterval(intervalId);
  }, [countdown, timerActive, startRecordingCallback]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleRestart = () => {
    // Reset countdown to the initial preparation time
    const preparationTimeInSeconds = parseInt(
      questionData?.Subtype.preparation_time || "0",
      10
    );
    setCountdown(preparationTimeInSeconds);
    setTimerActive(true); // Restart the countdown

    setShowAnswer(false); // Optionally reset the answer view

    // Trigger reset for recording
    setResetRecording(true); // Set reset state to true
    setTimeout(() => setResetRecording(false), 100); // Reset state after a short delay
  };

  // Handling navigation to next and previous questions
  const handleNext = () => {
    if (questionData?.nextQuestionId) {
      navigate(
        `/summarize-spoken-text/${subtype_id}/${questionData?.nextQuestionId}`
      );
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(
        `/summarize-spoken-text/${subtype_id}/${questionData?.previousQuestionId}`
      );
    }
  };
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <button
                className="btn btn-primary mynotesBtn"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={toggleNotes}
              >
                <i className="fa fa-book"></i>
                {showNotes ? "Close Notes" : "My Notes"}
              </button>
            </div>
            <div className={showNotes ? "col-md-9" : "col-md-12"}>
              <PageHeading title="Summarize Spoken Text" />
              <div className="practiceLayout">
                <p className="my-3">
                  Look at the text below. In 40 seconds, you must read this text
                  aloud as naturally and clearly as possible. You have 40
                  seconds to read aloud. Speak within 3 seconds otherwise the
                  microphone will close and you will lose the marks.
                </p>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title text-white">
                      {questionData?.question_name}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="time">
                      <div className="headBtn">
                        <span className="text-danger">
                          Prepare: {formatTime(countdown)}
                        </span>
                        <CardButton questionData={questionData} />
                      </div>
                      <div className="innercontent">
                        <AudioPlayer />
                      </div>
                      <div className="micSection">
                        <div className="card">
                          <div className="card-header bg-white">
                            <div className="card-title">
                              <h5>Total Word Count: 0</h5>
                            </div>
                          </div>
                          <div className="card-body">
                            <textarea
                              className="form-control"
                              rows={16}
                              placeholder="Write a Summary..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      {showAnswer && (
                        <div
                          className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                          style={{ background: "#ffe4e4" }}
                        >
                          <div className="audio-inner p-4 rounded-3">
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
                        <QuestionNavigation
                          questionData={questionData}
                          onAnswerClick={handleAnswerClick}
                          onRestart={handleRestart}
                          onNext={handleNext}
                          onPrevious={handlePrevious}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showNotes && (
              <div className="col-md-3">
                <MyNotes />
              </div>
            )}
          </div>
          <div className="community">
            <Community questionData={questionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizeSpokenText;
