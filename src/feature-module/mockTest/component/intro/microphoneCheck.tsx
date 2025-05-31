import React, { useRef, useState, useEffect } from "react";

const MAX_RECORD_DURATION = 30000; // 30 seconds

const MicrophoneCheck: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [status, setStatus] = useState("Idle");
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const autoStopTimeoutRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setStatus("Finished...");
        setProgress(100);
        clearInterval(progressIntervalRef.current!);
        clearTimeout(autoStopTimeoutRef.current!);
        stopStream();
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setStatus("Recording...");
      setProgress(0);

      progressIntervalRef.current = window.setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + 1 : 95));
      }, MAX_RECORD_DURATION / 100);

      autoStopTimeoutRef.current = window.setTimeout(() => {
        stopRecording();
      }, MAX_RECORD_DURATION);
    } catch (error) {
      console.error("Microphone access denied or error:", error);
      setStatus("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    // Stop recording if recording is active
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }

    // Stop audio playback if playing
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setStatus("Playback Stopped");
      setIsPlaying(false);
    }

    clearInterval(progressIntervalRef.current!);
    clearTimeout(autoStopTimeoutRef.current!);
    stopStream();
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handlePlayback = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setStatus("Playing...");
      setIsPlaying(true);

      audioRef.current.onended = () => {
        setStatus("Finished...");
        setIsPlaying(false);
      };
    }
  };

  // When audio is paused or stopped externally, update isPlaying
  useEffect(() => {
    if (!audioRef.current) return;

    const handlePause = () => setIsPlaying(false);
    const audioEl = audioRef.current;

    audioEl.addEventListener("pause", handlePause);
    audioEl.addEventListener("ended", handlePause);

    return () => {
      audioEl.removeEventListener("pause", handlePause);
      audioEl.removeEventListener("ended", handlePause);
    };
  }, [audioURL]);

  useEffect(() => {
    return () => {
      clearInterval(progressIntervalRef.current!);
      clearTimeout(autoStopTimeoutRef.current!);
      stopStream();
    };
  }, []);

  return (
    <div className="container">
      <div className="mockInfoContent">
        <h4>Microphone Check</h4>
        <div className="">
          <p className="font-weight-bold">
            This is an opportunity to check that your microphone is working
            correctly.
            <br />
            1. Make sure your headset is on and the microphone is positioned near your mouth.
            <br />
            2. Click "Record" and say: "Testing, testing, one, two, three".
            <br />
            3. Click "Stop" when done, then click "Playback" to listen.
            <br />
            4. If you can't hear your voice clearly, contact the administrator.
          </p>

          <div className="descimgage2">
            <p className="text-start mb-1">
              Current status: <strong>{status}</strong>
            </p>

            {/* Progress Bar */}
            <div
              className="progress mb-3"
              style={{ 
                height: "15px", 
                borderRadius: "25px", 
                backgroundColor: "#f0f0f0",
                width: "20em",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${progress}%`,
                  backgroundColor: recording ? "#ff4444" : "#183052",
                  transition: "width 0.3s ease-in-out",
                  borderRadius: "25px",
                  backgroundImage: "linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)",
                  backgroundSize: "1rem 1rem",
                  animation: recording ? "progress-bar-stripes 1s linear infinite" : "none"
                }}
              />
            </div>

            <style>
              {`
                @keyframes progress-bar-stripes {
                  from { background-position: 1rem 0; }
                  to { background-position: 0 0; }
                }
              `}
            </style>

            {/* Audio Player */}
            <div className="my-3">
              {audioURL && (
                <audio
                  ref={audioRef}
                  controls
                  style={{ height: "40px", width: "300px" }}
                  src={audioURL}
                >
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>

            {/* Buttons */}
            <button
              className="btn btn-theme"
              style={{
                backgroundColor: "#183052",
                color: "#fff",
                border: "none",
                margin: "0 2px",
              }}
              onClick={startRecording}
              disabled={recording || isPlaying}
            >
              Record
            </button>

            <button
              className="btn btn-theme"
              style={{
                backgroundColor: "#183052",
                color: "#fff",
                border: "none",
                margin: "0 2px",
              }}
              onClick={handlePlayback}
              disabled={!audioURL || recording || isPlaying}
            >
              Playback
            </button>

            <button
              className="btn btn-theme"
              style={{
                backgroundColor: "#183052",
                color: "#fff",
                border: "none",
                margin: "0 2px",
              }}
              onClick={stopRecording}
              disabled={false} // Always enabled
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicrophoneCheck;
