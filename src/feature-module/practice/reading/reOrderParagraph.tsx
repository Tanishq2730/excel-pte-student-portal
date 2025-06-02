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
import ParaReorder from "../component/paraReorder";
import AlertComponent from "../../../core/common/AlertComponent";
import MyNotes from "../component/myNotes";
import PageHeading from "../component/pageHeading";

const ReOrderParagraph = () => {
  const { subtype_id, question_id } = useParams<{
    subtype_id: string;
    question_id?: string;
  }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resetParaReorder, setResetParaReorder] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const startTime = useRef(Date.now());
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const timeSpentRef = useRef(0);
  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      timeSpentRef.current = (Date.now() - startTime.current) / 1000 / 60;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    try {
      const subtypeIdNum = Number(subtype_id);
      const questionIdNum = question_id ? Number(question_id) : 0;
      const res = await fetchQuestionData(subtypeIdNum, questionIdNum);
      if (!res.success || !res.data) {
        navigate(all_routes.adminDashboard);
        return;
      }
      setQuestionData(res.data);
    } catch (err) {
      console.error("Error fetching question data:", err);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (subtype_id) getData();
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
        `/reorder-paragraph/${subtype_id}/${questionData?.nextQuestionId}`
      );
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(
        `/reorder-paragraph/${subtype_id}/${questionData?.previousQuestionId}`
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
    setResetParaReorder(true);
    setShowAnswer(false); // Optionally reset the answer view
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const correctAnswers = questionData?.answer_american?.split(",") ?? [];

  const handleSubmitPractice = async () => {
    if (!questionData?.id || !subtype_id) return;

    try {
      // Convert answers to string
      const answerArray = Object.values(answers);
      const userAnswerStr = answerArray.join(",");
      const correctAnswerStr = correctAnswers.join(",");

      // Score logic
      let score = 0;
      answerArray.forEach((answer, index) => {
        if (answer.trim() === correctAnswers[index]?.trim()) {
          score++;
        }
      });
      const totalscore = correctAnswers.length - 1;

      const user_answer = userAnswerStr.trim();
      let user_answer_arr = user_answer.split(",");

      let matchingPairs = 0;

      for (let i = 0; i < totalscore; i++) {
        // console.log("totalscore: ", totalscore);

        if (correctAnswers[i] && correctAnswers[i + 1]) {
          let pair1 = correctAnswers[i] + "," + correctAnswers[i + 1];
          let yourTotalPairs = user_answer_arr.length;

          for (let j = 0; j < yourTotalPairs - 1; j++) {
            if (user_answer_arr[j] && user_answer_arr[j + 1]) {
              let ypair = user_answer_arr[j] + "," + user_answer_arr[j + 1];

              if (pair1 === ypair) {                
                matchingPairs++;
              }
            }
          }
        }
      }

      score = matchingPairs;

      // console.log("user_question", user_question);
      let score_data = {
        user_question: "",
        user_answer: user_answer,
        answer: correctAnswers,
      };

      const payload = {
        questionId: questionData.id,
        totalscore: totalscore, // You can adjust this if you calculate it
        lateSpeak: 1,
        timeSpent: timeSpent,
        score: score,
        score_data: JSON.stringify(score_data),
        answer: userAnswerStr,
      };

      // Send to backend
      try {
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
          setResetParaReorder(true); // Trigger reset

          setTimeout(() => {
            setResetParaReorder(false); // Allow reset to be triggered again in the future
          }, 100); // Small delay to avoid state issues
          setAlert({ type: "success", message: "Your Answer Saved!" });
        } else {
          setAlert({ type: "danger", message: "Failed to save practice" });
        }
      } catch (error) {
        console.error("Submission Error:", error);
      }
    } catch (error) {
      console.error("Error saving practice:", error);
      setAlert({ type: "danger", message: "Something went wrong." });
    }
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
            <PageHeading title="Reorder Paragraph" />
            <div className={showNotes ? "col-md-9" : "col-md-12"}>
              <div className="practiceLayout">
                <p className="my-3">
                  There are some words missing in the following text. Please
                  select the correct word in the drop-down box.
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
                      <div className="reorderSection">
                        <ParaReorder
                          questionData={questionData}
                          onAnswerChange={setAnswers}
                          // resetTrigger={resetParaReorder}
                        />
                      </div>
                      {showAnswer && (
                        <div
                          className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                          style={{ background: "rgb(228 246 255)" }}
                        >
                          <div
                            className="audio-inner p-4 rounded-3"
             
                          >
                            <h3 className="mb-3">Answer</h3>
                            
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

export default ReOrderParagraph;
