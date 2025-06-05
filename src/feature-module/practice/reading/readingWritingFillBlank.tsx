import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
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
import DictionaryModal from "../component/DictionaryModal";

const ReadingWritngFillBlank = () => {
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
  const [countdown, setCountdown] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const userAnswersRef = useRef<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
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
        `/reading-&-writng-fb/${subtype_id}/${questionData?.nextQuestionId}`
      );
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(
        `/reading-&-writng-fb/${subtype_id}/${questionData?.previousQuestionId}`
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

  useEffect(() => {
  if (questionData?.question) {
    const dropdownCount = (questionData.question.match(/<select/g) || []).length;
    const initialAnswers = Array(dropdownCount).fill("");
    setUserAnswers(initialAnswers);
    userAnswersRef.current = initialAnswers;
  }
}, [questionData]);

const handleDropdownChange = (index: number, value: string) => {
  const updated = [...userAnswers];
  updated[index] = value.trim();
  setUserAnswers(updated);
  userAnswersRef.current = updated;
};

 console.log(userAnswers);

  const handleSubmitPractice = async () => {
    setSubmitted(true);
    if (!questionData?.id || !subtype_id) return;

    try {
      // Convert answers to string
    const answerArray = userAnswersRef.current; // <--- use ref here
    const userAnswerStr = answerArray.join(",");
    const correctAnswerStr = correctAnswers.join(",");

      // Score logic
      let score = 0;
      answerArray.forEach((answer, index) => {
        if (answer.trim() === correctAnswers[index]?.trim()) {
          score++;
        }
      });
      
      const totalscore = answerArray.length;

      const score_data = {
        user_answer: userAnswerStr,
        correct_answer: correctAnswerStr,
        score: score,
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

          // setAlert({ type: "success", message: "Your Answer Saved!" });
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

  
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string>("");
  
  const handleWordClick = (word: string) => {
    console.log(word);
    
    setSelectedWord(word);
    setShowDictionaryModal(true);
  };
  
  
 const renderQuestionWithDropdowns = () => {
  if (!questionData?.question) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(questionData.question, "text/html");

  const elements: React.ReactNode[] = [];

  let dropdownIndex = 0;

  const traverse = (node: ChildNode | HTMLElement) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const words = text.split(/(\s+)/);

      words.forEach((word, i) => {
        const trimmed = word.trim();
        if (!trimmed) {
          elements.push(" ");
        } else {
          elements.push(
            <span
              key={`word-${elements.length}-${i}`}
              onClick={() => handleWordClick(trimmed)}
              style={{ 
                cursor: "pointer",
                display: "inline-block",
                margin: "0 2px",
                verticalAlign: "middle"
              }}
            >
              {word}
            </span>
          );
        }
      });
    } else if (node.nodeName === "SELECT") {
      const select = node as HTMLSelectElement;
      const options = Array.from(select.querySelectorAll("option"))
        .map(opt => opt.textContent || "")
        .filter(opt => opt.trim());

      const currentIndex = dropdownIndex;
      const selectedValue = userAnswers[currentIndex] || "";
      const correctAnswer = correctAnswers[currentIndex];

      const borderClass =
        showAnswer && selectedValue
          ? selectedValue === correctAnswer
            ? "border-success text-success"
            : "border-danger text-danger"
          : "";

      elements.push(
        <span
          key={`select-wrapper-${currentIndex}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            margin: "0 4px",
            verticalAlign: "middle"
          }}
        >
          <select
            key={`dropdown-${currentIndex}`}
            className={`form-select ${borderClass}`}
            value={selectedValue}
            onChange={(e) => {
              e.preventDefault();
              handleDropdownChange(currentIndex, e.target.value);
            }}
            style={{
              display: "inline-block",
              width: "auto",
              minWidth: "130px",
              padding: "0px 24px 0px 8px",
              margin: showAnswer ? "0px 0px 0px 8px " : "0 5px",
              verticalAlign: "middle",
              height: "30px"
            }}
          >
            <option value="">Select</option>
            {options.map((opt, idx) => (
              <option key={`${currentIndex}-${idx}`} value={opt.trim()}>
                {opt}
              </option>
            ))}
          </select>

          {showAnswer && (
            <strong
              key={`answer-${currentIndex}`}
              style={{
                display: "inline-block",
                backgroundColor: "#d4edda",
                padding: "4px 8px",
                borderRadius: "4px",
                color: "#155724",
                fontSize: "14px",
                verticalAlign: "middle",
                marginLeft: "4px"
              }}
            >
              {correctAnswer}
            </strong>
          )}
        </span>
      );

      dropdownIndex++;
    } else {
      node.childNodes.forEach((child) => traverse(child));
    }
  };

  traverse(doc.body);
  return (
    <div style={{ 
      lineHeight: "2",
      fontSize: "16px",
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}>
      {elements}
    </div>
  );
};

  const correctAnswers = questionData?.answer_american?.split(",") || [];




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
            <PageHeading title="Reading & Writng Fill in the Blank" />
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
                      <div className="readfib">{renderQuestionWithDropdowns()}</div>

                      <div className="bottomBtn mt-3">
                        <QuestionNavigation
                          questionData={questionData}
                          onAnswerClick={() => setShowAnswer((prev) => !prev)}
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
                            <div>
                              <strong>Correct Answer:</strong>{" "}
                              {questionData?.answer_american}
                            </div>
                            
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
        {alert && (
          <AlertComponent
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ReadingWritngFillBlank;
