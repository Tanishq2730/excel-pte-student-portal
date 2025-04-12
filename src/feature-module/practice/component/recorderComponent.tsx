import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const RecorderComponent: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<ReturnType<typeof WaveSurfer.create> | null>(null); // ✅


  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunks.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.current.push(e.data);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });

        if (blob.size > 0) {
          setAudioBlob(blob);
        } else {
          console.warn("Empty audio blob — recording might have been too short.");
        }
      };

      setTimeout(() => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
      }, 200); // Delay to ensure data is flushed
    }
  };

  const handleMicClick = () => {
    isRecording ? stopRecording() : startRecording();
  };

  useEffect(() => {
    if (audioBlob && waveformRef.current) {
      const url = URL.createObjectURL(audioBlob);

      // Cleanup old instance
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }

      const waveSurfer = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: "#6c6c6c",
        progressColor: "#2e2e2e",
        cursorColor: "#333",
        barWidth: 2,
        height: 100,
      });

      waveSurfer.load(url).catch((err: any) => {
        console.error("WaveSurfer load error:", err);
      });
      

      waveSurfer.on("finish", () => setIsPlaying(false));
      waveSurferRef.current = waveSurfer;
    }
  }, [audioBlob]);

  // Handle resizing: retrigger waveform by setting blob again
  useEffect(() => {
    const handleResize = () => {
      if (audioBlob) {
        setAudioBlob(audioBlob);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [audioBlob]);

  const togglePlay = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <div
      className="recorder-section startspeak"
      style={{ maxWidth: "100%", margin: "auto" }}
    >
      <div className="body" style={{ textAlign: "center" }}>
        {!audioBlob && (
          <div className="micCard">
            <div className="text" style={{ marginBottom: "10px" }}>
              {isRecording
                ? "Recording... Click to Stop"
                : "Click to Start Recording"}
            </div>

            <div
              className={`mic-button ${isRecording ? "bg-theme" : ""}`}
              onClick={handleMicClick}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: isRecording ? "#f44336" : "#fff",
                border: "1px solid #ccc",
                display: "grid",
                placeItems: "center",
                margin: "auto",
                cursor: "pointer",
                marginBottom: "0px",
              }}
            >
              <i
                className="fa fa-microphone"
                style={{
                  fontSize: "16px",
                  color: isRecording ? "#fff" : "#333",
                }}
              />
            </div>
          </div>
        )}

        {audioBlob && (
          <div className="wavecard">
            <div
              ref={waveformRef}
              style={{
                background: "#f3e6e6",
                borderRadius: "12px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={togglePlay}
                className="btn btn-primary"
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "18px",
                  borderRadius: "6px",
                  border: "none",
                  color: "#fff",
                  backgroundColor: "#007bff",
                  cursor: "pointer",
                }}
              >
                <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecorderComponent;
