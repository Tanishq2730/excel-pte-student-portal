import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

interface RecorderProps {
  resetRecording: boolean;
  startRecording: () => void;
}

const RecorderComponent: React.FC<RecorderProps> = ({ resetRecording, startRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<ReturnType<typeof WaveSurfer.create> | null>(null);

  // Start recording handler
  const startRecordingHandler = async () => {
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

  // Stop recording handler
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        if (blob.size > 0) {
          setAudioBlob(blob);
        }
      };

      setTimeout(() => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
      }, 200);
    }
  };

  // Handle mic click (start/stop recording)
  const handleMicClick = () => {
    isRecording ? stopRecording() : startRecordingHandler();
  };

  useEffect(() => {
    startRecording(); // Trigger start recording when the parent component calls this function
  }, [startRecording]);

  // Reset recording on `resetRecording` prop change
  useEffect(() => {
    if (resetRecording) {
      setIsRecording(false); // Reset recording state
      setAudioBlob(null); // Clear audioBlob
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy(); // Destroy old WaveSurfer instance
        waveSurferRef.current = null;
      }
    }
  }, [resetRecording]);

  // Initialize WaveSurfer when audioBlob is set
  useEffect(() => {
    if (audioBlob && waveformRef.current) {
      const audioURL = URL.createObjectURL(audioBlob);

      // Only initialize WaveSurfer if the audioBlob URL is valid
      if (audioURL) {
        const waveSurfer = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#ddd",
          progressColor: "#00aaff",
          height: 100,
          barWidth: 2,
          responsive: true, // Ensures the waveform is resized properly
        });

        // Load audio and ensure the waveform is rendered after a slight delay to avoid rendering issues
        waveSurfer.load(audioURL);

        // Store reference to the WaveSurfer instance
        waveSurferRef.current = waveSurfer;

        // Wait for the waveform to render before enabling play/pause button
        waveSurfer.on("ready", () => {
          setIsPlaying(false); // Ensure play/pause works only after the waveform is ready
        });

        return () => {
          // Cleanup WaveSurfer instance when the component unmounts or audioBlob changes
          waveSurfer.destroy();
        };
      }
    }
  }, [audioBlob]);

  const togglePlay = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
      setIsPlaying((prev) => !prev); // Toggle the playing state
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
