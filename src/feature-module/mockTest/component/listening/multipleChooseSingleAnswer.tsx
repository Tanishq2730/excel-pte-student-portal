import React, { useEffect, useRef, useState } from "react";

const MultipleChooseSingleAnswer: React.FC = () => {
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
      <p>
        Look at the text below. In 40 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 40 seconds to read aloud.
      </p>
      <div className="recorderDetail">
        <div className="recorder">
          <div
            style={{
              border: "1px solid #111",
              padding: "20px",
              backgroundColor: "#f5f5f8",
              borderRadius: "5px",
              width: "fit-content",
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
          <div className="col-12 col-md-12">
            <div className="d-flex align-items-center border rounded p-3 h-100">
              <input
                type="radio"
                name="mcq-option"
                className="form-check-input m-auto me-3"
                id="option-A"
              />
              <label
                htmlFor="option-A"
                className="d-flex align-items-center w-100"
              >
                <div
                  className="me-3 d-flex justify-content-center align-items-center bg-primary text-white fw-bold rounded"
                  style={{
                    width: "30px",
                    height: "30px",
                    minWidth: "30px",
                  }}
                >
                  A
                </div>
                <span>This is static option A</span>
              </label>
            </div>
          </div>

          <div className="col-12 col-md-12 mt-3">
            <div className="d-flex align-items-center border rounded p-3 h-100">
              <input
                type="radio"
                name="mcq-option"
                className="form-check-input m-auto me-3"
                id="option-B"
              />
              <label
                htmlFor="option-B"
                className="d-flex align-items-center w-100"
              >
                <div
                  className="me-3 d-flex justify-content-center align-items-center bg-primary text-white fw-bold rounded"
                  style={{
                    width: "30px",
                    height: "30px",
                    minWidth: "30px",
                  }}
                >
                  B
                </div>
                <span>This is static option B</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChooseSingleAnswer;
