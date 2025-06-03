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
import WriteFromDictationScoring from "../component/scoring/WriteFromDictationScoring";
import PageHeading from "../component/pageHeading";

const WriteFromDictation = () => {
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
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [resetRecording, setResetRecording] = useState<boolean>(false); // Add reset state
  const [wordCount, setWordCount] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("American");
  const [timeSpent, setTimeSpent] = useState(0);
  const startTime = useRef(Date.now());
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };

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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSummaryText(text);
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };


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
      questionData?.Subtype.beginning_in || "0",
      10
    );
    setCountdown(preparationTimeInSeconds);
    setTimerActive(true); // Restart the countdown
    setWordCount(0);
    setShowAnswer(false); // Optionally reset the answer view

    // Trigger reset for recording
    setResetRecording(true); // Set reset state to true
    setTimeout(() => setResetRecording(false), 100); // Reset state after a short delay
  };

  // Handling navigation to next and previous questions
  const handleNext = () => {
    if (questionData?.nextQuestionId) {
      navigate(`/write-from-dictation/${subtype_id}/${questionData?.nextQuestionId}`);
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(`/write-from-dictation/${subtype_id}/${questionData?.previousQuestionId}`);
    }
  };

  const handleSubmitPractice = async () => {
    if (!questionData?.id || !subtype_id) return;

    try {
      const id = questionData.id;
      const question = questionData.question;
      const session_id = Math.random() * 1000;
      const answerText = summaryText;
      const wordCounts = wordCount;
      const scoringData = { id, session_id, question, answerText, wordCount };
console.log(answerText);

      const result = await WriteFromDictationScoring(
        scoringData,
        questionData,
        selectedLanguage
      );
console.log(result);

      if (result) {
        const { score, totalScore, userAnswerText, scoredText } = result;

        // Now you can safely use score, totalScore, userAnswerText, scoredText
        const payload = {
          questionId: questionData.id,
          totalscore: totalScore, // You can adjust this if you calculate it
          lateSpeak: 1,
          timeSpent: timeSpent,
          score: score,
          score_data: scoredText,
          answer: userAnswerText,
        };
        const response = await savePractice(false, payload);

        if (response.success) {
          getData();
          const preparationTimeInSeconds = parseInt(
            questionData?.Subtype.remaining_time || "0",
            10
          );
          setCountdown(preparationTimeInSeconds);
          setTimerActive(true); // Restart the countdown
          setTimeSpent(0);
          setShowAnswer(false); // Optionally reset the answer view
          setSummaryText("");
          setWordCount(0);
          setAlert({ type: "success", message: "Your Answer Saved!" });
        } else {
          setAlert({ type: "danger", message: "Failed to save practice" });
        }
        // Continue with your logic...
      } else {
        // Handle the case where result is null or undefined
        console.error("Scoring result is null or undefined");
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
            <div className={showNotes ? "col-md-9" : "col-md-12"}>
              <PageHeading title="Write From Dictation" />
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
                        <span className="text-danger">Beginning in: {countdown}</span>
                        <CardButton questionData={questionData} />
                      </div>
                      <div className="mb-3">
                        <AudioPlayer questionData={questionData} startCountdown={countdown} />
                      </div>
                      <div className="card">
                        <div className="card-header bg-white">
                          <div className="card-title">
                            <h5>Total Word Count: {wordCount || 0}</h5>
                          </div>
                        </div>
                        <div className="card-body">
                          <textarea
                            className="form-control"
                            rows={16}
                            placeholder="Write a Summary..."
                            value={summaryText}
                            onChange={handleTextChange}
                          ></textarea>
                        </div>
                      </div>
                      {showAnswer && (
                        <div
                          className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                          style={{ background: "#ffe4e4" }}
                        >
                          <div className="audio-inner p-4 rounded-3">
                          <h3 className="mb-3">Answer</h3>
                            <p>
                              <b>American Answers : </b>{" "}
                              {questionData?.answer_american}
                            </p>
                            {questionData?.answer_british && (
                              <p>
                                <b>British Answers : </b>{" "}
                                {questionData?.answer_british}
                              </p>
                            )}
                            {/* <h3 className="fw-semibold mb-2">Audio Answer:</h3> */}
                            
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
          </div>
          <div className="community">
            <Community questionData={questionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteFromDictation;
