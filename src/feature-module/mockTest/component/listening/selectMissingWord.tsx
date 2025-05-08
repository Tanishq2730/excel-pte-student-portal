import React, { useEffect, useRef, useState } from "react";

const SelectMissingWord: React.FC = () => {
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
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectMissingWord;
