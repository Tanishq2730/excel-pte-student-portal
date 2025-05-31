import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../audioPlayer";

interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
  setCountdownDone: (done: boolean) => void;
}

const SelectMissingWord: React.FC<getProps> = ({
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
  const [checkedOptions, setCheckedOptions] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const timeStartRef = useRef(Date.now());
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
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
        setCountdownDone(true);
      }
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showCountdown, countdown, setCountdownDone]);

  const options = [
    { id: "A", text: question?.option_one },
    { id: "B", text: question?.option_two },
    { id: "C", text: question?.option_three },
    { id: "D", text: question?.option_four },
    { id: "E", text: question?.option_five },
  ].filter((option) => option.text?.trim() !== "");

  const handleChange = (optionId: string) => {
    setCheckedOptions(optionId);
  };

  const handleSubmit = () => {
    if (!checkedOptions) {
      return false;
    }

    const correctAnswer = question?.answer_american || "";
    const correctAnswers = correctAnswer.split(",");
    const isCorrect = correctAnswers.includes(checkedOptions);
    const score = isCorrect ? 1 : 0;
    const totalscore = correctAnswers.length;

    const score_data = {
      user_answer: checkedOptions,
      correct_answer: correctAnswers,
      score,
    };

    const timeSpent = Math.floor((Date.now() - timeStartRef.current) / 1000);

    const payload = {
      questionId: question.id,
      mocktest_id: id,
      sessionId: session_id,
      totalscore,
      lateSpeak: 1,
      score,
      score_data: JSON.stringify(score_data),
      answer: checkedOptions,
    };

    // Instead of calling setAnswer directly, we'll return the answer as an object
    return payload;
  };

  useEffect(() => {
    setCheckedOptions(null); // Reset selection on question change
  }, [question]);
  useEffect(() => {
    registerSubmit(handleSubmit); // Register new submit function on change
  }, [question, checkedOptions]);

  return (
    <div className="container mt-3">
      <p className="mockHead">
        You will hear a recording about fiction writing. At the end of the
        recording the lost word or group of words has been replaced by a beep.
        Select the correct option to complete the recording.
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

      <div className="recorderQuestion mt-3">
        <div
          dangerouslySetInnerHTML={{
            __html: question.question,
          }}
        />
      </div>

      {/* Options */}
      <div className="card p-3 mt-4">
        {options.map((option) => (
          <div key={option.id} className="col-12 col-md-12">
            <div className="d-flex align-items-start border rounded p-3 h-100">
              <input
                type="radio"
                className="form-check-input m-auto me-3"
                id={`option-${option.id}`}
                checked={checkedOptions === option.id}
                onChange={() => handleChange(option.id)}
              />
              <label
                htmlFor={`option-${option.id}`}
                className="d-flex align-items-center w-100"
              >
                <div
                  className="me-3 d-flex justify-content-center align-items-center bg-primary text-white fw-bold rounded"
                  style={{ width: "30px", height: "30px", minWidth: "30px" }}
                >
                  {option.id}
                </div>
                <span>{option.text}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMissingWord;
