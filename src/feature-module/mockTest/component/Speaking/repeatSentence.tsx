import React, { useEffect, useRef, useState } from "react";

const RepeatSentence: React.FC<{ question: any }> = ({ question }) => {
  const [countdown, setCountdown] = useState(40);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayback, setIsPlayback] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(40);

  const playbackRef = useRef<number | null>(null);
  const recordingRef = useRef<number | null>(null);

  // Simulate 5s audio playback before recording
  useEffect(() => {
    if (isPlayback) {
      let duration = 5;
      playbackRef.current = window.setInterval(() => {
        setPlaybackProgress((prev) => {
          const next = prev + 20;
          if (next >= 100) {
            clearInterval(playbackRef.current!);
            setIsPlayback(false);
            setCountdown(40);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(playbackRef.current!);
  }, [isPlayback]);

  // Countdown before recording starts
  useEffect(() => {
    if (!isPlayback && countdown > 0) {
      const timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isPlayback) {
      setIsRecording(true);
    }
  }, [countdown, isPlayback]);

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
          {/* Playback Card */}
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
            <h3 style={{ marginTop: 0 }}>Completed ...</h3>
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
                  width: `${playbackProgress}%`,
                  backgroundColor: "#aaa",
                  borderRadius: 10,
                  transition: "width 1s linear",
                }}
              ></div>
            </div>
            <div style={{ textAlign: "right", marginTop: 5 }}>
              <span style={{ color: "red", fontSize: 20 }}>🔊</span>
            </div>
          </div>

          {/* Recording Card */}
          <div
            style={{
              border: "1px solid #111",
              padding: "20px",
              backgroundColor: "#f5f5f8",
              borderRadius: "5px",
              width: "fit-content",
            }}
          >
            <p style={{ fontWeight: 500, marginBottom: 5 }}>Recorded Answer</p>
            <p style={{ fontWeight: 600, marginBottom: 5 }}>Current Status:</p>
            <h3 style={{ marginTop: 0 }}>
              {isRecording
                ? "Recording...."
                : countdown > 0
                ? `Beginning in ${countdown} Seconds`
                : "Waiting..."}
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
                  width: `${recordingProgress}%`,
                  backgroundColor: "#111",
                  transition: "width 1s linear",
                  borderRadius: 10,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="recorderQuestion mt-3">
          <p>
            Globalization refers to a set of changes rather than a single
            change. Many of these changes are social, cultural and political
            rather than purely economic, and one of the main drivers in addition
            to the global marketplace is the communication revolution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepeatSentence;
