import React, { useEffect, useRef, useState } from "react";
import { image_url } from "../../../../environment";

const DescribeImage: React.FC<{ question: any }> = ({ question }) => {
  const [countdown, setCountdown] = useState(question.Subtype.preparation_time); // Countdown based on preparation time
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(question.Subtype.recording_time); // Recording time from the question data

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
        setRecordingTimeLeft((prev: number) => prev - 1);
        setRecordingProgress(((question.Subtype.recording_time - recordingTimeLeft + 1) / question.Subtype.recording_time) * 100);
      }, 1000);
    }
    return () => clearTimeout(recordingRef.current!);
  }, [isRecording, recordingTimeLeft]);

  return (
    <div className="container mt-3">
      <p>
        Look at the image below. In {question.Subtype.preparation_time} seconds, you must describe this image aloud as naturally and clearly as possible. You have {question.Subtype.recording_time} seconds to speak.
      </p>
      <div className="recorderDetail">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`${image_url}${question.describe_image}`}
              alt="Describe"
              style={{ width: "100%", height: "auto", borderRadius: "5px" }}
            />
          </div>
          <div className="col-md-6">
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
          </div>
        </div>
      </div>
      {/* Optionally render the question */}
      <div className="questionContent">
        <h5>{question.question_name}</h5>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: question.question,
          }}
        /> */}
      </div>
    </div>
  );
};

export default DescribeImage;
