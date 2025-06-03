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
import WriteEssayScoring from "../component/scoring/WriteEssayScoring";
import PageHeading from "../component/pageHeading";
import MyNotes from "../component/myNotes";
import DictionaryModal from "../component/DictionaryModal";

const WriteEssay = () => {
  const { subtype_id, question_id } = useParams<{
    subtype_id: string;
    question_id?: string;
  }>();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [selectedLanguage, setSelectedLanguage] = useState("American");
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [summaryText, setSummaryText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSummaryText(text);
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };

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
    if (questionData?.Subtype?.remaining_time) {
      const preparationTimeInSeconds = parseInt(
        questionData.Subtype.remaining_time,
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
      navigate(`/write-essay/${subtype_id}/${questionData?.nextQuestionId}`);
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(
        `/write-essay/${subtype_id}/${questionData?.previousQuestionId}`
      );
    }
  };

  const handleRestart = () => {
    // Reset countdown to the initial preparation time
    const preparationTimeInSeconds = parseInt(
      questionData?.Subtype.remaining_time || "0",
      10
    );
    setCountdown(preparationTimeInSeconds);
    setTimerActive(true); // Restart the countdown

    setShowAnswer(false); // Optionally reset the answer view
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
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

      const result = await WriteEssayScoring(
        scoringData,
        questionData,
        selectedLanguage
      );

      if (result) {
        const { score, totalscore, user_answer, score_data } = result;

        // Now you can safely use score, totalScore, userAnswerText, scoredText
        const payload = {
          questionId: questionData.id,
          totalscore: totalscore, // You can adjust this if you calculate it
          lateSpeak: 1,
          timeSpent: timeSpent,
          score: score,
          score_data: JSON.stringify(score_data),
          answer: user_answer,
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
      }
    } catch (error) {
      console.error("Error saving practice:", error);
      setAlert({ type: "danger", message: "Something went wrong." });
    }
  };
  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };


   const [showDictionaryModal, setShowDictionaryModal] = useState(false);
    const [selectedWord, setSelectedWord] = useState<string>("");
    
    const handleWordClick = (word: string) => {
      console.log(word);
      
      setSelectedWord(word);
      setShowDictionaryModal(true);
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
              <PageHeading title="Write Essay" />
              <div className="practiceLayout">
                <p className="my-3">
                  Read the passage below and summarize it using one sentence.
                  Type your response in the box at the bottom of the screen. You
                  have 10 minutes to finish this task. Your response will be
                  judged on the quality of your writing and on how well your
                  response presents the key points in the passage.
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
                          Time: {formatTime(countdown)}
                        </span>
                        <CardButton questionData={questionData} />
                      </div>
                      <div className="innercontent">
                        <p>
                              {questionData?.question?.split(" ").map((word, idx) => (
                                <span
                                  key={idx}
                                  onClick={() => handleWordClick(word)}
                                  style={{ cursor: "pointer", marginRight: 4 }}
                                  title="Click to see definition"
                                >
                                  {word}
                                </span>
                              ))}
                            </p> 
                      </div>
                      <div className="card">
                        <div className="card-header bg-white">
                          <div className="card-title">
                            <h5>Total Word Count: {wordCount}</h5>
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
                          style={{ background: "#ffe4e4" }}
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
             <DictionaryModal
            isOpen={showDictionaryModal}
            onClose={() => setShowDictionaryModal(false)}
            word={selectedWord}
          />
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

export default WriteEssay;
