import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "../audioPlayer";

interface IncorrectWordProps {
  question: any;
  queno: number;
}

const HighlightIncorrectWord: React.FC<IncorrectWordProps> = ({ question, queno }) => {
  const preparationTime = question?.Subtype?.beginning_in || 0;
  const [isPlayback, setIsPlayback] = useState(true); // preparation progress
  const [countdown, setCountdown] = useState(3); // fixed countdown after preparation
  const [showCountdown, setShowCountdown] = useState(false); // control countdown visibility
  const [showAudio, setShowAudio] = useState(false); // show audio only after countdown 
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);

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


  const processQuestionWithHighlights = (
    question: string,
    answer: string
  ): string => {
    const correctMatch = answer.match(/correct\s*:\s*(.*?)(?:<br>|$)/i);
    const incorrectMatch = answer.match(/incorrect\s*:\s*(.*)/i);

    if (!correctMatch || !incorrectMatch) return question;

    const correctWords = correctMatch[1].split(",").map((word) => word.trim());
    const incorrectWords = incorrectMatch[1]
      .split(",")
      .map((word) => word.trim());

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
    if (!question?.question) return null;

    const words = question.question.split(" ");
    return (
      <p className="highlight-question">
        {words.map((word: any, index: any) => (
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
              userSelect: "none",
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

  const correctAnswers = question?.answer_american.match(
    /incorrect\s*:\s*([^<]+)/i
  );

  const correctWords = correctAnswers
    ? correctAnswers[1].split(",").map((word: any) => word.trim())
    : [];


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
        <div className="innercontent">
          {!showAnswer ? (
            renderInteractiveQuestion()
          ) : (
            <p
              className="highlight-question"
              dangerouslySetInnerHTML={{
                __html:
                  question?.question &&
                    question?.answer_american
                    ? processQuestionWithHighlights(
                      question.question,
                      question.answer_american
                    )
                    : "",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightIncorrectWord;
