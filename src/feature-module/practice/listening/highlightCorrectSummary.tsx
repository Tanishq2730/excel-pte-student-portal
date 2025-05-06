import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";
import { fetchQuestionData, savePractice } from "../../../api/practiceAPI";
import { QuestionData } from "../../../core/data/interface";
import { all_routes } from "../../router/all_routes";
import CardButton from "../component/cardButton";
import QuestionNavigation from "../component/questionNavigation";
import AudioPlayer from "../component/audioPlayer";
import AlertComponent from "../../../core/common/AlertComponent";


const HighlightCorrectSummary = () => {
  const { subtype_id, question_id } = useParams<{ subtype_id: string; question_id?: string }>();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [resetRecording, setResetRecording] = useState<boolean>(false); // Add reset state

  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [checkedOptions, setCheckedOptions] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime.current) / 1000 / 60; // Convert to minutes
      setTimeSpent(parseFloat(elapsedTime.toFixed(2))); // Parse back to number
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

      setCorrectAnswer(res.data.answer_american);
    } catch (err) {
      console.error("Error fetching question data:", err);
      navigate(-1); // Redirect on fetch error as well
    }
  };

  useEffect(() => {
    if (subtype_id) {
      getData();
    }
  }, [subtype_id, question_id, navigate]);

  useEffect(() => {
    if (questionData?.Subtype?.beginning_in) {
      const preparationTimeInSeconds = parseInt(questionData.Subtype.beginning_in, 10);
      setCountdown(preparationTimeInSeconds);
      setTimerActive(true);
    }
  }, [questionData]);

  const startRecordingCallback = useCallback(() => {
    if (questionData && questionData.Subtype.beginning_in === "0") {
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
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleRestart = () => {
    // Reset countdown to the initial preparation time
    const preparationTimeInSeconds = parseInt(questionData?.Subtype.beginning_in || "0", 10);
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
      navigate(`/highlight-correct-summary/${subtype_id}/${questionData?.nextQuestionId}`);
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(`/highlight-correct-summary/${subtype_id}/${questionData?.previousQuestionId}`);
    }
  };

  const options = [
    { id: "A", text: questionData?.option_one },
    { id: "B", text: questionData?.option_two },
    { id: "C", text: questionData?.option_three },
    { id: "D", text: questionData?.option_four },
    { id: "E", text: questionData?.option_five },
  ].filter(option => option.text?.trim() !== "");

  const handleChange = (optionId: string) => {
    setCheckedOptions(optionId);
  };

  const handleSubmitPractice = async () => {
    if (!questionData?.id || !subtype_id) return;
    if (!checkedOptions) { setAlert({ type: "danger", message: "Please Select any from options" }); return false; }
    try {

      const ans = correctAnswer.split(",");
      const isCorrect = ans.includes(checkedOptions);
      const score = isCorrect ? 1 : 0;
      const totalscore = ans.length;

      const score_data = {
        user_answer: checkedOptions,
        correct_answer: ans,
        score: score,
      };


      const payload = {
        questionId: questionData.id,
        totalscore: totalscore, // You can adjust this if you calculate it
        lateSpeak: 1,
        timeSpent: timeSpent,
        score: score,
        score_data: JSON.stringify(score_data),
        answer: checkedOptions,
      };

      const response = await savePractice(false, payload);

      if (response.success) {
        getData();
        const preparationTimeInSeconds = parseInt(questionData?.Subtype.beginning_in || "0", 10);
        setCountdown(preparationTimeInSeconds);
        setTimerActive(true); // Restart the countdown
        setTimeSpent(0);
        setShowAnswer(false); // Optionally reset the answer view 
        setCheckedOptions("");
        setAlert({ type: "success", message: "Your Answer Saved!" });
      } else {
        setAlert({ type: "danger", message: "Failed to save practice" });
      }
    } catch (error) {
      console.error("Error saving practice:", error);
      setAlert({ type: "danger", message: "Something went wrong." });
    }
  };


  return (
    <div className="page-wrappers">
      {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <div className="content">
        <div className="container">
          <div className="practiceLayout">
            <p className="my-3">
              There are some words missing in the following text. Please select
              the correct word in the drop-down box.
            </p>
            <div className="card">
              <div className="card-header">
                <div className="card-title text-white">{questionData?.question_name}</div>
              </div>
              <div className="card-body">
                <div className="time">
                  <div className="headBtn">
                    <span className="text-danger">Time: {formatTime(countdown)}</span>
                    <CardButton questionData={questionData} />
                  </div>
                  <div className="mb-3">
                  <AudioPlayer questionData={questionData} />
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="row g-3">
                        {options.map((option) => (
                          <div key={option.id} className="col-12 col-md-12">
                            <div className="d-flex align-items-start border rounded p-3 h-100">
                              <input
                                type="checkbox"
                                className="form-check-input m-auto me-3"
                                id={`option-${option.id}`}
                                checked={checkedOptions === option.id}
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
                  {showAnswer && (
                    <div
                      className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                      style={{ background: "#ffe4e4" }}
                    >
                      <div
                        className="audio-inner p-4 rounded-3"
                      
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
                    <QuestionNavigation
                      questionData={questionData}
                      onAnswerClick={handleAnswerClick}
                      onRestart={handleRestart}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      onSubmit={handleSubmitPractice}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="community">
            <Community questionData={questionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCorrectSummary;
