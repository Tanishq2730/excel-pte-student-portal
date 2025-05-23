import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// Add styles at the top of the file
const progressBarStyles = `
  progress {
    -webkit-appearance: none;
    appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: #e3f2fd;
    border-radius: 4px;
  }

  progress::-webkit-progress-value {
    background-color: #2196f3;
    border-radius: 4px;
  }

  progress::-moz-progress-bar {
    background-color: #2196f3;
    border-radius: 4px;
  }
`;

type RecorderProps = {
  onRecordingComplete: (audioBlob: Blob, audioUrl: string) => void;
  onStopRecording: () => void;
  resetRecording: boolean;
};

const Recorder: React.FC<RecorderProps> = ({ onRecordingComplete, onStopRecording, resetRecording }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const progressRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  const waveSurferRef = useRef<any>(null);
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);

  const { transcript, resetTranscript } = useSpeechRecognition();

  // Load waveform when audioUrl changes
  useEffect(() => {
    if (audioUrl && waveformContainerRef.current) {
      waveSurferRef.current?.destroy();
      waveSurferRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: '#ccc',
        progressColor: '#007bff',
        cursorColor: '#007bff',
        responsive: true,
        height: 100,
        backend: 'MediaElement',
      });
      waveSurferRef.current.load(audioUrl);
    }
  }, [audioUrl]);

  // Handle external reset trigger
  useEffect(() => {
    if (resetRecording) {
      resetRecordingHandler();
    }
  }, [resetRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      waveSurferRef.current?.destroy();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      const chunks: Blob[] = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob, url);
        onStopRecording();
      };

      recorder.start();
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      setMediaRecorder(recorder);
      setRecording(true);

      // Initialize and start the progress bar interval
      progressRef.current = 0;
      setProgress(0);
      timerRef.current = window.setInterval(() => {
        progressRef.current = Math.min(progressRef.current + 1, 100);
        setProgress(progressRef.current);
      }, 1000);

    } catch (err) {
      console.error('Microphone access error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      SpeechRecognition.stopListening();
      onStopRecording();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetRecordingHandler = () => {
    waveSurferRef.current?.destroy();
    waveSurferRef.current = null;
    resetTranscript();
    setAudioUrl('');
    setRecording(false);
    setProgress(0);
    progressRef.current = 0;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const playAudio = () => {
    waveSurferRef.current?.playPause();
  };

  return (
    <div className="recorder-section startspeak" style={{ maxWidth: "100%", margin: "auto" }}>
      <div className="body" style={{ textAlign: "center" }}>

        <div className="micCard">
          {/* Progress bar only when recording */}
          {recording && (
            <>
              <style>{progressBarStyles}</style>
              <progress
                value={progress}
                max={100}
                style={{
                  width: '100%',
                  margin: '10px auto',
                  display: 'block',
                  height: '8px',
                  borderRadius: '4px'
                }}
              />
            </>
          )}

          {/* Recording status text */}
          <div className="text" style={{ marginBottom: "10px" }}>
            {recording ? "Recording... Click to Stop" : "Click to Start Recording"}
          </div>

          {/* Mic button toggles start/stop */}
          <div
            className={`mic-button ${recording ? "bg-theme" : ""}`}
            onClick={recording ? stopRecording : startRecording}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: recording ? "#f44336" : "#fff",
              border: "1px solid #ccc",
              display: "grid",
              placeItems: "center",
              margin: "auto",
              cursor: "pointer",
            }}
          >
            <i
              className="fa fa-microphone"
              style={{ fontSize: recording ? "22px" : "16px", color: recording ? "#fff" : "#333" }}
            />
          </div>
        </div>

        {audioUrl && (
          <div style={{ marginTop: '20px' }}>
            <div ref={waveformContainerRef} className="mb-6"></div>
            <div className="flex gap-4 justify-center">
              <button onClick={playAudio} className="btn btn-soft-secondary rounded">Play / Pause</button>
              <a href={audioUrl} download="recording.webm" className="btn btn-soft-secondary rounded mx-2">Download</a>
              <button onClick={resetRecordingHandler} className="btn btn-soft-secondary rounded">Record Again</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Recorder;
