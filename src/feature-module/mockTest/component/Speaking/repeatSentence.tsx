import React, { useEffect, useRef, useState } from "react";

const RepeatSentence: React.FC<{ question: any }> = ({ question }) => {

  const [isPlayback, setIsPlayback] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [countdown, setCountdown] = useState(question.Subtype.preparation_time); // Countdown based on preparation time
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(question.Subtype.recording_time);

  const playbackRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
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
        setRecordingTimeLeft((prev: number) => prev - 1);
        setRecordingProgress(((question.Subtype.recording_time - recordingTimeLeft + 1) / question.Subtype.recording_time) * 100);
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

        <div className="recorderQuestion mt-3">
          <div
            dangerouslySetInnerHTML={{
              __html: question.question,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RepeatSentence;
