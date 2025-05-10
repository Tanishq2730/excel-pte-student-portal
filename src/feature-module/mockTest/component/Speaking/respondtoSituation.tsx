import React, { useState ,useRef, useEffect} from "react";

const RespondtoSituation: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [countdown, setCountdown] = useState(40); // Initial countdown
    const [isRecording, setIsRecording] = useState(false);
    const [recordingProgress, setRecordingProgress] = useState(0);
  
    const timerRef = useRef<number | null>(null);
  
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
  
   

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error("Error accessing mic:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  const reset = () => {
    setAudioUrl("");
    setRecording(false);
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}

        {audioUrl && (
          <div style={{ marginTop: "20px" }}>
            <audio controls src={audioUrl} />
            <div style={{ marginTop: "10px" }}>
              <a href={audioUrl} download="recording.webm">
                <button>Download</button>
              </a>
              <button onClick={reset} style={{ marginLeft: "10px" }}>
                Record Again
              </button>
            </div>
          </div>
        )}
      </div>
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
  );
};

export default RespondtoSituation;
