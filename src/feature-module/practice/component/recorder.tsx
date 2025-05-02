import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

type RecorderProps = {
  onRecordingComplete: (audioBlob: Blob, audioUrl: string) => void;
  onStopRecording: () => void;
  resetRecording: boolean;  // Add this prop
};

const Recorder: React.FC<RecorderProps> = ({ onRecordingComplete, onStopRecording, resetRecording }) => {

  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const waveSurferRef = useRef<any>(null);
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (audioUrl && waveformContainerRef.current) {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }

      waveSurferRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: '#ccc',
        progressColor: '#007bff',
        cursorColor: '#007bff',
        responsive: true,
        height: 100,
        backend: 'MediaElement', // important for blob URLs
      });

      waveSurferRef.current.load(audioUrl);
    }
  }, [audioUrl]);

  useEffect(() => {
    if (resetRecording) {
      resetRecordingHandler();
    }
  }, [resetRecording]);

  const resetRecordingHandler = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
    }
    resetTranscript();
    setAudioUrl('');
    setRecording(false);  // Stop recording if in progress
  };

  const startRecording = async () => {
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
        setAudioUrl(url);
        onRecordingComplete(audioBlob, url);
        onStopRecording();
      };

      recorder.start();
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

      setMediaRecorder(recorder);
      setRecording(true);
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
    }
  };

  const playAudio = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
    }
  };

  return (
    <div className="recorder-section startspeak" style={{ maxWidth: "100%", margin: "auto" }}>
      <div className="body" style={{ textAlign: "center" }}>
        {!recording ? (
          <div className="micCard">
            <div className="text" style={{ marginBottom: "10px" }}>
              {recording ? "Recording... Click to Stop" : "Click to Start Recording"}
            </div>
            <div
              className={`mic-button ${recording ? "bg-theme" : ""}`}
              onClick={startRecording}
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                backgroundColor: recording ? "#f44336" : "#fff",
                border: "1px solid #ccc", display: "grid",
                placeItems: "center", margin: "auto", cursor: "pointer",
                marginBottom: "0px",
              }}
            >
              <i className="fa fa-microphone" style={{ fontSize: "16px", color: recording ? "#fff" : "#333" }} />
            </div>
          </div>
        ) : (
          <div className="micCard">
            <div className="text" style={{ marginBottom: "10px" }}>
              {recording ? "Recording... Click to Stop" : "Click to Start Recording"}
            </div>
            <div
              className={`mic-button ${recording ? "bg-theme" : ""}`}
              onClick={stopRecording}
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                backgroundColor: recording ? "#f44336" : "#fff",
                border: "1px solid #ccc", display: "grid",
                placeItems: "center", margin: "auto", cursor: "pointer",
                marginBottom: "0px",
              }}
            >
              <i className="fa fa-microphone" style={{ fontSize: "16px", color: recording ? "#fff" : "#333" }} />
            </div>
          </div>
        )}
        {audioUrl && (
          <div>
            <div ref={waveformContainerRef} className="mb-6"></div>
            <div className="flex gap-4">
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

