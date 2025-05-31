import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import WriteFromDictationScoring from "../../../practice/component/scoring/WriteFromDictationScoring";
import AudioPlayer from "../audioPlayer";

interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
  setCountdownDone: (done: boolean) => void;
}

const WriteFromDictation: React.FC<getProps> = ({
  question,
  setAnswer,
  registerSubmit,
  setCountdownDone,
}) => {
  const preparationTime = question?.Subtype?.beginning_in || 0;
  const [isPlayback, setIsPlayback] = useState(true); // preparation progress
  const [countdown, setCountdown] = useState(3); // fixed countdown after preparation
  const [showCountdown, setShowCountdown] = useState(false); // control countdown visibility
  const [showAudio, setShowAudio] = useState(false); // show audio only after countdown
  const [progress, setProgress] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("American");
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
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
        setCountdownDone(true);
      }
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showCountdown, countdown, setCountdownDone]);

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
    setSummaryText(""); // Reset selection on question change
  }, [question]);

  useEffect(() => {
    registerSubmit(handleSubmit); // Register new submit function on change
  }, [question, summaryText]);

  const handleSubmit = async () => {
    console.log(question, "question");
    if (!summaryText) {
      return false;
    }

    const question_id = question.id;
    const questionData = question.question;
    const session_id = Math.random() * 1000;
    const answerText = summaryText;
    const wordCounts = wordCount;
    const scoringData = {
      question_id,
      session_id,
      question,
      answerText,
      wordCount,
    };

    const result = await WriteFromDictationScoring(
      scoringData,
      question,
      selectedLanguage
    );

    if (result) {
      const { score, totalScore, userAnswerText, scoredText } = result;

      // Now you can safely use score, totalScore, userAnswerText, scoredText
      const payload = {
        questionId: question.id,
        mocktest_id: id,
        sessionId: session_id,
        totalscore: totalScore, // You can adjust this if you calculate it
        lateSpeak: 1,
        score: score,
        score_data: scoredText,
        answer: userAnswerText,
      };
      return payload;
    }
    return false;
  };

  return (
    <div className="container mt-3">
      <p className="mockHead">
        You will hear a sentence. Type the sentence in the box below exactly as
        you hear it. Write as much of the sentence as you can. You will hear the
        sentence only once.
      </p>
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
              width: "25em",
              marginBottom: "15px",
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 5 }}>Current status :</p>
            <h3 style={{ marginTop: 0 }}>
              {isPlayback
                ? "Preparing..."
                : countdown > 0
                ? "Starting soon..."
                : "Completed"}
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
        <AudioPlayer questionData={question} startCountdown={countdown} />
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
