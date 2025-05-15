import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "../audioPlayer";
import parse, { DOMNode, Element } from "html-react-parser";
import { useParams } from 'react-router-dom';

interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
}


const FillIntheBlank: React.FC<getProps> = ({ question, setAnswer, registerSubmit }) => {

  const preparationTime = question?.Subtype?.beginning_in || 0;
  const [isPlayback, setIsPlayback] = useState(true); // preparation progress
  const [countdown, setCountdown] = useState(3); // fixed countdown after preparation
  const [showCountdown, setShowCountdown] = useState(false); // control countdown visibility
  const [showAudio, setShowAudio] = useState(false); // show audio only after countdown 
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const progressRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
  // Start the progress bar for preparation time
  useEffect(() => {
    if (!isPlayback) return;

    let elapsed = 0;
    const interval = 100;
    const totalDuration = preparationTime * 1000;

    progressRef.current = window.setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));

      if (elapsed >= totalDuration) {
        clearInterval(progressRef.current!);
        setIsPlayback(false);
        setShowCountdown(true); // start countdown after preparation
      }
    }, interval);

    return () => clearInterval(progressRef.current!);
  }, [isPlayback, preparationTime]);

  // Countdown effect
  useEffect(() => {
    if (!showCountdown || countdown <= 0) return;

    const timer = window.setTimeout(() => {
      if (countdown === 1) {
        setShowCountdown(false);
        setShowAudio(true); // finally show audio
      }
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showCountdown, countdown]);


  const handleSubmit = () => {
      const userAnswerArray = Object.values(answers);
      const correctAnswerArray = correctAnswers;
      let user_answer = userAnswerArray.join(",").trim();
      let score = 0;
      const resultDetails = [];
  
      for (let i = 0; i < correctAnswerArray.length; i++) {
        const userAns = userAnswerArray[i]?.trim() || "";
        const correctAns = correctAnswerArray[i]?.trim();
  
        const isCorrect = userAns === correctAns;
  
        resultDetails.push({
          userAnswer: userAns,
          correctAnswer: correctAns,
          isCorrect,
        });
  
        score += isCorrect ? 1 : 0;
      }
  
      const payload = {
        questionId: question.id,
        totalscore: correctAnswerArray.length,
        mocktest_id: id,
        sessionId: session_id,
        score,
        answer: user_answer,
        score_data: JSON.stringify({
          user_question: question.question,
          user_answer: user_answer,
          answer: correctAnswers,
        }),
      };
  
      return payload;
    };
  
    useEffect(() => {
      registerSubmit(handleSubmit);
    }, [answers]);
    
  const dragDropOptions = question?.drag_drop
    ? question.drag_drop.split(",").map((text: any) => text.trim())
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

  const correctAnswers = question?.answer_american
    ? question.answer_american.split(",").map((ans: any) => ans.trim())
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
    (word: any) => !usedWords.includes(word)
  );

  return (
    <div className="container mt-3">
      <p>{question?.question_name}</p>

      {/* Progress Bar for Preparation Time */}
      <div className="recorderDetail">
        <div className="recorder">
          <div
            style={{
              border: "1px solid #111",
              padding: "20px",
              backgroundColor: "#f5f5f8",
              borderRadius: "5px",
              width: "fit-content",
              marginBottom: "15px",
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 5 }}>Current status :</p>
            <h3 style={{ marginTop: 0 }}>
              {isPlayback ? "Preparing..." : countdown > 0 ? "Starting soon..." : "Completed"}
            </h3>
            <div
              style={{
                height: 8,
                backgroundColor: "#d3d3d3",
                borderRadius: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: "#aaa",
                  borderRadius: 10,
                  transition: "width 0.1s linear",
                }}
              ></div>
            </div>
            <div style={{ textAlign: "right", marginTop: 5 }}>
              <span style={{ color: "red", fontSize: 20 }}>🔊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown or AudioPlayer */}
      {isPlayback ? null : showCountdown ? (
        <div className="text-center mb-3">
          <h5>Get ready... starting in {countdown}s</h5>
        </div>
      ) : showAudio ? (
        <AudioPlayer questionData={question} />
      ) : null}

      {/* Options */}
      <div className="card p-3 mt-4">
        <div
          className="p-4 space-y-4 fillDropdown"
          style={{ fontSize: "1.25rem" }}
        >
          {parse(
            question?.question || "",
            customParseOptions
          )}

          <div
            className="innercontent mt-4"
            onDrop={(e) => handleDrop(e, null)} // Enable dropping *into* the word bank
            onDragOver={handleDragOver} // Allow drop
          >
            <div className="selectableBtn d-flex flex-wrap gap-2">
              {availableWords.map((word:any, idx:any) => (
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
      </div>
    </div>
  );
};

export default FillIntheBlank;
