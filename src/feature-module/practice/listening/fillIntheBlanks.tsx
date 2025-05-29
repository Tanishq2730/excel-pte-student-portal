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
import parse, { DOMNode, Element } from "html-react-parser";
import AlertComponent from "../../../core/common/AlertComponent";
import PageHeading from "../component/pageHeading";
import MyNotes from "../component/myNotes";

const FillInTheBlanks = () => {
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
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [usedWords, setUsedWords] = useState<string[]>([]);

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
    setShowAnswer(false); // Optionally reset the answer view
    setAnswers({});
    setUsedWords([]);
    // Trigger reset for recording
    setResetRecording(true); // Set reset state to true
    setTimeout(() => setResetRecording(false), 100); // Reset state after a short delay
  };
  console.log(questionData, "questionData");

  const dragDropOptions = questionData?.drag_drop
    ? questionData.drag_drop.split(",").map((text) => text.trim())
    : [];

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLSpanElement>,
    word: string
  ) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDrop = (e: React.DragEvent, index: number | null = null) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");

    if (index !== null) {
      setAnswers((prevAnswers) => {
        const existingWord = prevAnswers[index];

        if (existingWord === word) return prevAnswers; // if same word, do nothing

        const updatedAnswers = { ...prevAnswers, [index]: word };

        // Remove old word from usedWords if present
        if (existingWord) {
          setUsedWords((prevUsed) =>
            prevUsed.filter((w) => w !== existingWord)
          );
        }

        // Add new word to usedWords if not already present
        setUsedWords((prevUsed) =>
          prevUsed.includes(word) ? prevUsed : [...prevUsed, word]
        );

        return updatedAnswers;
      });
    } else {
      // Dropping back into word bank
      const indexToRemove = Object.keys(answers).find(
        (key) => answers[parseInt(key, 10)] === word
      );
      if (indexToRemove !== undefined) {
        setAnswers((prev) => {
          const newAnswers = { ...prev };
          delete newAnswers[parseInt(indexToRemove)];
          return newAnswers;
        });
        setUsedWords((prev) => prev.filter((w) => w !== word));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  let blankCounter = 0;

  const correctAnswers = questionData?.answer_american
    ? questionData.answer_american.split(",").map((ans) => ans.trim())
    : [];

  const customParseOptions = {
    replace: (domNode: DOMNode) => {
      if (
        (domNode as Element).name === "span" &&
        (domNode as Element).attribs?.class === "blank"
      ) {
        const currentIndex = blankCounter++;

        const userAnswer = answers[currentIndex];
        const correctAnswer = correctAnswers[currentIndex];

        const isCorrect = showAnswer && userAnswer === correctAnswer;
        const isFilled = !!userAnswer;

        return (
          <span
            key={currentIndex}
            onDrop={(e) => handleDrop(e, currentIndex)}
            onDragOver={handleDragOver}
            style={{
              borderBottom: "2px dashed #aaa",
              padding: "2px 10px",
              minWidth: "60px",
              marginRight: "4px",
              textAlign: "center",
              backgroundColor: isCorrect
                ? "#d4edda" // ✅ Green for correct answer
                : isFilled && showAnswer
                ? "#f8d7da" // ❌ Light red for incorrect (optional)
                : "#fff",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            {userAnswer || "___"}
          </span>
        );
      }
    },
  };

  const availableWords = dragDropOptions.filter(
    (word) => !usedWords.includes(word)
  );

  // Handling navigation to next and previous questions
  const handleNext = () => {
    if (questionData?.nextQuestionId) {
      navigate(`/fib/${subtype_id}/${questionData?.nextQuestionId}`);
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(`/fib/${subtype_id}/${questionData?.previousQuestionId}`);
    }
  };

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
          setAnswers({});
          setUsedWords([]);
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
            <div className={showNotes ? "col-md-9" : "col-md-12"}>
              <PageHeading title="Fill in the Blanks" />
              <div className="practiceLayout">
                <p className="my-3">
                  There are some words missing in the following text. Please
                  select the correct word in the drop-down box.
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
                       <span className="text-danger">Beginning in: {countdown}</span>
                        <CardButton questionData={questionData} />
                      </div>
                      <div>
                        <AudioPlayer questionData={questionData} startCountdown={countdown } />
                      </div>
                      <div
                        className="p-4 space-y-4 fillDropdown bottomborder"
                        style={{ fontSize: "1.25rem" }}
                      >
                        {parse(
                          questionData?.question || "",
                          customParseOptions
                        )}

                        <div
                          className="innercontent mt-4"
                          onDrop={(e) => handleDrop(e, null)} // Enable dropping *into* the word bank
                          onDragOver={handleDragOver} // Allow drop
                        >
                          <div className="selectableBtn d-flex flex-wrap gap-2">
                            {availableWords.map((word, idx) => (
                              <div
                                key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, word)}
                                className="btn btn-soft-secondary rounded-pill"
                              >
                                {word}
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
                          <div className="audio-inner p-4 rounded-3">
                            <p>
                              <b>Correct Answers : </b>{" "}
                              {questionData?.answer_american}
                            </p>
                           
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

export default FillInTheBlanks;
