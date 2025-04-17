import React, { useRef, useState } from "react";

const MicrophoneCheck: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [status, setStatus] = useState("Idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setStatus("Recording...");
    } catch (error) {
      console.error("Microphone access denied or error:", error);
      setStatus("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handlePlayback = () => {
    setStatus("Playing...");
    const audio = new Audio(audioURL!);
    audio.play();
  };

  return (
    <div className="container">
      <div className="mockInfoContent">
        <h4>Microphone Check</h4>
        <div className="mockInfoContent">
          <p className="font-weight-bold">
            This is an opportunity to check that your microphone is working
            correctly.
            <br />
            1. Make sure your headset is on and the microphone is positioned
            near your mouth.
            <br />
            2. Click "Record" and say: "Testing, testing, one, two, three".
            <br />
            3. Click "Stop" when done, then click "Playback" to listen.
            <br />
            4. If you can’t hear your voice clearly, contact the administrator.
          </p>

          <div className="descimgage2">
            <p className="text-start">Current status:</p>
            {/* <p className="text-start">{status}</p> */}

            <input
              type="range"
              min="0"
              max="100"
              value={status === "Recording..." ? 50 : status === "Finished..." ? 100 : 0}
              readOnly
              className="progress-v3"
              style={{
                background:
                  "linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) 0%, #ccc 0%, #ccc 100%)",
              }}
            />


            <div className="my-3">
            {audioURL && (
              <audio
                controls
                style={{ height: "40px", width: "300px" }}
                src={audioURL}
              >
                Your browser does not support the audio element.
              </audio>
            )}
            </div>

            <button
              className="btn btn-theme"
              style={{
                backgroundColor: "#183052",
                color: "#fff",
                border: "none",
                margin: "0 2px",
              }}
              onClick={startRecording}
              disabled={recording}
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
              disabled={!audioURL}
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
              disabled={!recording}
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
