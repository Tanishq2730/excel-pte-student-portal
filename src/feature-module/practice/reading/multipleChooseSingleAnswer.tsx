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
import AlertComponent from "../../../core/common/AlertComponent";
import MyNotes from "../component/myNotes";
import PageHeading from "../component/pageHeading";

const MultipleChooseSingleAnswer = () => {
  const { subtype_id, question_id } = useParams<{
    subtype_id: string;
    question_id?: string;
  }>();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [checkedOptions, setCheckedOptions] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const startTime = useRef(Date.now());
  const [showNotes, setShowNotes] = useState<boolean>(false);

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
      const preparationTimeInSeconds = parseInt(
        questionData.Subtype.beginning_in,
        10
      );
      setCountdown(preparationTimeInSeconds);
      setTimerActive(true);
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
    }

    return () => clearInterval(intervalId);
  }, [countdown, timerActive]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  // Handling navigation to next and previous questions
  const handleNext = () => {
    if (questionData?.nextQuestionId) {
      navigate(
        `/multiple-choose-Single-answer/${subtype_id}/${questionData?.nextQuestionId}`
      );
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(
        `/multiple-choose-Single-answer/${subtype_id}/${questionData?.previousQuestionId}`
      );
    }
  };

  const handleRestart = () => {
    // Reset countdown to the initial preparation time
    const preparationTimeInSeconds = parseInt(
      questionData?.Subtype.beginning_in || "0",
      10
    );
    setCountdown(preparationTimeInSeconds);
    setTimerActive(true); // Restart the countdown

    setShowAnswer(false); // Optionally reset the answer view
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleChange = (optionId: string) => {
    setCheckedOptions(optionId);
  };

  const options = [
    { id: "A", text: questionData?.option_one },
    { id: "B", text: questionData?.option_two },
    { id: "C", text: questionData?.option_three },
    { id: "D", text: questionData?.option_four },
    { id: "E", text: questionData?.option_five },
  ].filter((option) => option.text?.trim() !== "");

  const handleSubmitPractice = async () => {
    if (!questionData?.id || !subtype_id) return;
    if (!checkedOptions) {
      setAlert({ type: "danger", message: "Please Select any from options" });
      return false;
    }
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
        const preparationTimeInSeconds = parseInt(
          questionData?.Subtype.beginning_in || "0",
          10
        );
        setCountdown(preparationTimeInSeconds);
        setTimerActive(true); // Restart the countdown
        setTimeSpent(0);
        setShowAnswer(false); // Optionally reset the answer view
        setCheckedOptions("");
        // setAlert({ type: "success", message: "Your Answer Saved!" });
      } else {
        setAlert({ type: "danger", message: "Failed to save practice" });
      }
    } catch (error) {
      console.error("Error saving practice:", error);
      setAlert({ type: "danger", message: "Something went wrong." });
    }
  };

  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };

  return (
    <div className="page-wrappers">
      {alert && (
        <AlertComponent
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
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
            <PageHeading title="Multiple Choose Single Answer" />
            <div className={showNotes ? "col-md-9" : "col-md-12"}>
              <div className="practiceLayout">
                <p className="my-3">
                  Read the text and answer the question by selecting all the
                  correct responses. More than one response is correct.
                </p>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title text-white">
                      {questionData?.question_name}
                      <span>{questionData?.tested === "yes" && `Tested (${questionData?.tested_count})`}</span>
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
                      <div className="row">
                        <div className="col-md-8">
                          <div className="innercontent mt-0">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: questionData?.question || "",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="chooseSection">
                            <div className="">
                              <div className="card shadow-sm">
                                <div className="card-header bg-white">
                                  <h5 className="mb-0">
                                    According to paragraph, sculptors in the
                                    Italian Renaissance stopped using
                                    cannonballs in bronze statues of horses
                                    because
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
                                            checkedOptions === option.id
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
                      </div>

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
                      {showAnswer && (
                        <div
                          className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                          style={{ background: "rgb(228 246 255)" }}
                        >
                          <div className="audio-inner p-4 rounded-3">
                          <h3 className="mb-3">Answer</h3>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: questionData?.answer_american || "",
                              }}
                            />
                            
                          </div>
                        </div>
                      )}
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

export default MultipleChooseSingleAnswer;
