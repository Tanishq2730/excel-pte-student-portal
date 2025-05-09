import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "../audioPlayer";
interface DictationProps {
  question: any;
  queno: number;
}

const WriteFromDictation: React.FC<DictationProps> = ({ question, queno }) => {
  const preparationTime = question?.Subtype?.beginning_in || 0;
  const [isPlayback, setIsPlayback] = useState(true); // preparation progress
  const [countdown, setCountdown] = useState(3); // fixed countdown after preparation
  const [showCountdown, setShowCountdown] = useState(false); // control countdown visibility
  const [showAudio, setShowAudio] = useState(false); // show audio only after countdown
  const [progress, setProgress] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [summaryText, setSummaryText] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("American");

  const progressRef = useRef<number | null>(null);

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


 const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSummaryText(text);
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };

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
        <div className="card-header bg-white">
          <div className="card-title">
            <h5>Total Word Count: {wordCount || 0}</h5>
          </div>
        </div>

      {/* Options */}
      <div className="card p-3 mt-4">
        <textarea
          className="form-control"
          rows={16}
          placeholder="Write a Summary..."
          value={summaryText}
          onChange={handleTextChange}
        ></textarea>
      </div>
    </div>
  );
};

export default WriteFromDictation;
