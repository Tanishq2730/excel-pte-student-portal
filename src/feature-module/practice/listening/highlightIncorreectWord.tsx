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

const HighlightIncorrectWord = () => {
  const { subtype_id, question_id } = useParams<{ subtype_id: string; question_id?: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [resetRecording, setResetRecording] = useState<boolean>(false); // Add reset state
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"select" | "answer">("select");
  const [timeSpent, setTimeSpent] = useState(0);
  const startTime = useRef(Date.now());

  const timeSpentRef = useRef(0);

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
    setSelectedWords([]);
    // Trigger reset for recording
    setResetRecording(true); // Set reset state to true
    setTimeout(() => setResetRecording(false), 100); // Reset state after a short delay
  };



  // Handling navigation to next and previous questions
  const handleNext = () => {
    if (questionData?.nextQuestionId) {
      navigate(`/highlight-incorrect-word/${subtype_id}/${questionData?.nextQuestionId}`);
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(`/highlight-incorrect-word/${subtype_id}/${questionData?.previousQuestionId}`);
    }
  };

  const processQuestionWithHighlights = (question: string, answer: string): string => {
    const correctMatch = answer.match(/correct\s*:\s*(.*?)(?:<br>|$)/i);
    const incorrectMatch = answer.match(/incorrect\s*:\s*(.*)/i);

    if (!correctMatch || !incorrectMatch) return question;

    const correctWords = correctMatch[1].split(',').map(word => word.trim());
    const incorrectWords = incorrectMatch[1].split(',').map(word => word.trim());

    let updatedQuestion = question;
    const placeholders: string[] = [];

    // First pass: Replace each incorrect word with a unique placeholder
    incorrectWords.forEach((incorrect, index) => {
      const escapedIncorrect = incorrect.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedIncorrect}\\b`, "gi");
      const placeholder = `__PLACEHOLDER_${index}__`;
      placeholders.push(placeholder);
      updatedQuestion = updatedQuestion.replace(regex, placeholder);
    });

    // Second pass: Replace placeholders with the actual highlight HTML
    placeholders.forEach((placeholder, index) => {
      const incorrect = incorrectWords[index];
      const correct = correctWords[index] || ""; // Handle case when there are less correct words

      const highlightHTML = `
        <span style="background-color: lightgray; padding: 2px 4px; border-radius: 4px; margin-right: 4px;">
          ${incorrect}
          <span style="background-color: lightgreen; color: black; padding: 2px 4px; border-radius: 4px; margin-left: 4px;">
            ${correct}
          </span>
        </span>`;

      updatedQuestion = updatedQuestion.replace(placeholder, highlightHTML);
    });

    return updatedQuestion;
  };



  const renderInteractiveQuestion = () => {
    if (!questionData?.question) return null;

    const words = questionData.question.split(" ");
    return (
      <p className="highlight-question">
        {words.map((word, index) => (
          <span
            key={index}
            onClick={() => toggleWordSelection(index)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedWords.includes(index)
                ? "#ffcdd2" // light red highlight
                : "transparent",
              padding: "2px",
              marginRight: "4px",
              borderRadius: "4px",
              userSelect: "none"
            }}
          >
            {word}
          </span>
        ))}
      </p>
    );
  };

  const toggleWordSelection = (index: number) => {
    setSelectedWords((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  
  const correctAnswers = questionData?.answer_american.match(/incorrect\s*:\s*([^<]+)/i);

  const correctWords = correctAnswers ? correctAnswers[1].split(',').map(word => word.trim()) : [];

  const handleSubmitPractice = async () => {
    if (!questionData?.id || !subtype_id) return;
    if (!selectedWords.length) {
      setAlert({ type: "danger", message: "Please Highlight at least one word" });
      return false;
    }
  
    try {
      // Ensure correctAnswers is defined and fall back to an empty array if not
      const ans: string[] = correctWords || []; // Explicitly type `ans` as an array of strings
  
      // Get the words that were selected based on the indices
      const selectedWordList = selectedWords.map(index => questionData.question.split(" ")[index]);
  
      // Calculate score
      const score = selectedWordList.reduce((acc, answer) => {
        const trimmedAnswer = answer.trim();
        console.log(trimmedAnswer);        
        return ans.includes(trimmedAnswer) ? acc + 1 : acc - 1;
      }, 0);
  
      // Ensure score is non-negative
      const yourScore = Math.max(score, 0);
  
      // Calculate total score
      const totalScore = ans.length;
  
      const score_data = {
        user_answer: selectedWordList,
        correct_answer: correctAnswers,
        score: yourScore,
      };
  
      const payload = {
        questionId: questionData.id,
        totalscore: totalScore,
        lateSpeak: 1,
        timeSpent: timeSpent,
        score: score,
        score_data: JSON.stringify(score_data),
        answer: selectedWordList.join(" "), // Send the selected words as a string
      };
  
      const response = await savePractice(false, payload);
  
      if (response.success) {
        getData();
        const preparationTimeInSeconds = parseInt(questionData?.Subtype.beginning_in || "0", 10);
        setCountdown(preparationTimeInSeconds);
        setTimerActive(true); // Restart the countdown
        setTimeSpent(0);
        setShowAnswer(false); // Optionally reset the answer view
        setSelectedWords([]);
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
                  <div className="innercontent">
                    {!showAnswer ? (
                      renderInteractiveQuestion()
                    ) : (
                      <p
                        className="highlight-question"
                        dangerouslySetInnerHTML={{
                          __html:
                            questionData?.question && questionData?.answer_american
                              ? processQuestionWithHighlights(
                                questionData.question,
                                questionData.answer_american
                              )
                              : "",
                        }}
                      />
                    )}
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

export default HighlightIncorrectWord;
