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

  const handleDropdownChange = (index: number, value: string) => {
    const updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  };

  const handleSubmitPractice = async () => {
    setSubmitted(true);
    if (!questionData?.id || !subtype_id) return;

    try {
      // Convert answers to string
      const answerArray = Object.values(correctAnswers);
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

  
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string>("");
  
  const handleWordClick = (word: string) => {
    console.log(word);
    
    setSelectedWord(word);
    setShowDictionaryModal(true);
  };
  
  
  const renderQuestionWithDropdowns = (): { __html: string } | undefined => {
  if (!questionData?.question) return undefined;

  const parser = new DOMParser();
  const doc = parser.parseFromString(questionData.question, "text/html");

  const wrapWords = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const words = text.split(/(\s+)/); // keep spaces

      const wrapped = words
        .map((word) => {
          const trimmed = word.trim();
          if (!trimmed) return word;

          const span = document.createElement("span");
          span.textContent = word;
          span.style.cursor = "pointer";

          span.onclick = () => handleWordClick(trimmed);

          const wrapper = document.createElement("span");
          wrapper.appendChild(span);
          return wrapper.innerHTML;
        })
        .join("");

      const wrapper = document.createElement("span");
      wrapper.innerHTML = wrapped;
      node.replaceWith(wrapper);
    } else if (node.childNodes) {
      Array.from(node.childNodes).forEach(wrapWords);
    }
  };

  wrapWords(doc.body);

  const selects = Array.from(doc.querySelectorAll("select"));
  selects.forEach((select, index) => {
    const options = Array.from(select.querySelectorAll("option")).map(
      (opt) => opt.textContent || ""
    );
    const selectedValue = userAnswers[index] || "";
    const correctAnswer = correctAnswers[index];

    const borderClass =
      showAnswer && selectedValue
        ? selectedValue === correctAnswer
          ? "border-success text-success"
          : "border-danger text-danger"
        : "";

    const dropdown = (
      <select
        value={selectedValue}
        onChange={(e) => handleDropdownChange(index, e.target.value)}
        className={`form-select d-inline w-auto mx-1 align-baseline ${borderClass}`}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );

    const wrapper = document.createElement("span");
    wrapper.innerHTML = ReactDOMServer.renderToStaticMarkup(dropdown);
    select.replaceWith(wrapper);

    if (showAnswer) {
      const correctSpan = document.createElement("strong");
      correctSpan.textContent = ` ${correctAnswer}`;
      correctSpan.style.backgroundColor = "#d4edda";
      correctSpan.style.padding = "2px 6px";
      correctSpan.style.borderRadius = "4px";
      correctSpan.style.marginLeft = "4px";
      correctSpan.style.color = "#155724";

      wrapper.appendChild(correctSpan);
    }
  });

  return { __html: doc.body.innerHTML };
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
                      <div
                        className="innercontent"
                        dangerouslySetInnerHTML={renderQuestionWithDropdowns()}
                      />

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
