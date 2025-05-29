import React, { useRef, useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

type MockRecorderProps = {
  onRecordingComplete: (audioBlob: Blob, audioUrl: string) => void;
  onStopRecording: () => void;
  resetRecording: boolean;
  startRecording?: boolean; 
};

const MockRecorder: React.FC<MockRecorderProps> = ({
  onRecordingComplete,
  onStopRecording,
  resetRecording,
  startRecording,
}) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (resetRecording) {
      resetRecordingHandler();
    }
  }, [resetRecording]);

  // 🟢 Automatically start recording when the prop becomes true
  useEffect(() => {
    if (startRecording) {
      handleStartRecording();
    }
  }, [startRecording]);

  const resetRecordingHandler = () => {
    resetTranscript();
    setRecording(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(0);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      const localChunks: Blob[] = [];

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          localChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(localChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        onRecordingComplete(audioBlob, url);
        onStopRecording();

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setProgress(0);
      };

      recorder.start();
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

      setMediaRecorder(recorder);
      setRecording(true);

      let progressValue = 0;
      intervalRef.current = window.setInterval(() => {
        progressValue += 1;
        if (progressValue > 100) progressValue = 100;
        setProgress(progressValue);
      }, 100);
    } catch (error) {
      console.error('Microphone access error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      SpeechRecognition.stopListening();
      onStopRecording();

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setProgress(0);
    }
  };

  return (
    <div className="recorder-section startspeak" style={{ maxWidth: "100%", margin: "auto" }}>
      <div className="body" style={{ textAlign: "center" }}>
        <div className="micCard">
          <div className="text" style={{ marginBottom: "10px" }}>
            {recording ? "Recording..." : "Click to Start Recording"}
          </div>

          {recording && (
            <div style={{ width: '100%', height: '5px', backgroundColor: '#eee', marginBottom: '10px' }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#007bff',
                transition: 'width 0.1s linear'
              }} />
            </div>
          )}

          <div
            className={`mic-button ${recording ? "bg-theme" : ""}`}
            onClick={recording ? stopRecording : handleStartRecording}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              backgroundColor: recording ? "#f44336" : "#fff",
              border: "1px solid #ccc", display: "grid",
              placeItems: "center", margin: "auto", cursor: "pointer",
              marginBottom: "0px",
            }}
          >
            <i className="fa fa-microphone" style={{ fontSize: recording ? "22px" : "16px", color: recording ? "#fff" : "#333" }} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default MockRecorder;
