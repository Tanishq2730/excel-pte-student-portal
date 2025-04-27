import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// 👇 Create a custom Type
type WaveSurferType = ReturnType<typeof WaveSurfer>;

interface RecorderProps {
  resetRecording: boolean;
  startRecording: () => void;
}

const RecorderComponent: React.FC<RecorderProps> = ({ resetRecording, startRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurferType | null>(null);

  const { transcript, resetTranscript } = useSpeechRecognition();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecordingHandler();
    }
  };

  const startRecordingHandler = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.current.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
      });

      mediaRecorder.start();
      setIsRecording(true);
      resetTranscript();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const togglePlay = () => {
    if (waveSurferRef.current) {
      if (isPlaying) {
        waveSurferRef.current.pause();
      } else {
        waveSurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioBlob && waveformRef.current) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          if (waveSurferRef.current) {
            waveSurferRef.current.destroy();
          }

          const waveSurfer = WaveSurfer.create({
            container: waveformRef.current!,
            waveColor: "#97A3B9",
            progressColor: "#4F46E5",
            cursorColor: "#4F46E5",
            barWidth: 2,
            barRadius: 2,
            responsive: true,
            height: 100,
          });

          waveSurfer.load(reader.result);
          waveSurferRef.current = waveSurfer;
        }
      };
      reader.readAsDataURL(audioBlob);
    }
  }, [audioBlob]);

  return (
    <div
      className="recorder-section startspeak"
      style={{ maxWidth: "100%", margin: "auto" }}
    >
      <div className="body" style={{ textAlign: "center" }}>
        {!audioBlob && (
          <div className="micCard">
            <div className="text" style={{ marginBottom: "10px" }}>
              {isRecording ? "Recording... Click to Stop" : "Click to Start Recording"}
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
