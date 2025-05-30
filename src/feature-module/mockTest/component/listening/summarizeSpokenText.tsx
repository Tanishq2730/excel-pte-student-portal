import React, { useEffect, useRef, useState } from "react";

interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
  setCountdownDone: (done: boolean) => void;
}

const SummarizeSpokenText: React.FC<getProps> = ({
  question,
  setAnswer,
  registerSubmit,
  setCountdownDone,
}) => {
  const [countdown, setCountdown] = useState(40); // Initial countdown
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(40); // Recording duration

  const timerRef = useRef<number | null>(null);
  const recordingRef = useRef<number | null>(null);

  // Countdown before recording starts
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = window.setTimeout(
        () => setCountdown(countdown - 1),
        1000
      );
    } else {
      setIsRecording(true);
    }
    return () => clearTimeout(timerRef.current!);
  }, [countdown]);

  // Recording timer
  useEffect(() => {
    if (isRecording && recordingTimeLeft > 0) {
      recordingRef.current = window.setTimeout(() => {
        setRecordingTimeLeft((prev) => prev - 1);
        setRecordingProgress(((40 - recordingTimeLeft + 1) / 40) * 100);
      }, 1000);
    }
    return () => clearTimeout(recordingRef.current!);
  }, [isRecording, recordingTimeLeft]);

  return (
    <div className="container mt-3">
      <p className="mockHead">
        You will hear a short report. Write a summary for a fellow student who
        was not present. You should write 50-70 words. You have 10 minutes to
        finish this task. Your response will be judged on the quality of your
        writing and on how well your response presents the key points presented
        in the lectur
      </p>
      <div className="recorderDetail">
        <div className="recorder">
          <div
            style={{
              border: "1px solid #111",
              padding: "20px",
              backgroundColor: "#f5f5f8",
              borderRadius: "5px",
              width: "25em",
            }}
          >
            <p style={{ marginBottom: 5 }}>Recorded Answer</p>
            <p style={{ marginBottom: 5 }}>Current status :</p>
            <h4 style={{ marginTop: 0 }}>
              {isRecording
                ? "Recording...."
                : `Beginning in ${countdown} Seconds`}
            </h4>
            <div
              style={{
                height: 8,
                backgroundColor: "#d3d3d3",
                borderRadius: 10,
                position: "relative",
                overflow: "hidden",
                marginTop: 10,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: isRecording ? `${recordingProgress}%` : "0%",
                  backgroundColor: "#111",
                  transition: "width 1s linear",
                  borderRadius: 10,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card p-3 mt-4">
          <textarea
            className="form-control"
            rows={16}
            placeholder="Write a Summary..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SummarizeSpokenText;
