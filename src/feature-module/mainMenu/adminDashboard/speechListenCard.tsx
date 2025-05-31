import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const SpeechListenCard: React.FC = () => {
  const routes = all_routes;
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.lang = "en-US";
    newRecognition.interimResults = true;
    newRecognition.continuous = true;

    newRecognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      setTranscript(finalTranscript);
    };

    newRecognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
      stopRecording();
    };

    newRecognition.start();
    setRecognition(newRecognition);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleRefresh = () => {
    setTranscript("");
    stopRecording();
  };

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="row">
      <div className="col-xxl-6 col-xl-6 col-md-12 d-flex speechCard">
        <div className="d-block bg-success-transparent ronded p-3 text-center mb-3 class-hover w-100">
          <div
            className="avatar avatar-lg border p-1 border-success rounded-circle mb-2 cursor-pointer"
            title={
              isRecording
                ? "Click to Stop Recording"
                : "Click the Mic Button to Speak"
            }
            onClick={handleMicClick}
            style={{ cursor: "pointer" }}
          >
            <span
              className={`d-inline-flex align-items-center justify-content-center w-100 h-100 ${
                isRecording ? "bg-danger" : "bg-success"
              } rounded-circle`}
            >
              <i className="ion-mic-c"></i>
            </span>
          </div>
          <p className="text-dark mb-2">Speech Test</p>
          {transcript && (
            <p
              className="text-dark mb-2 border p-2 rounded"
              style={{
                minHeight: "50px",
                maxHeight: "100px",
                overflowY: "auto",
              }}
            >
              {transcript}
            </p>
          )}
          <button
            className="btn btn-soft-success rounded-pill mt-2 w-100"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="col-xxl-6 col-xl-6 col-md-12 d-flex listeningCard">
        <div className="d-block bg-secondary-transparent ronded p-3 text-center mb-3 class-hover w-100">
          <div
            className="avatar avatar-lg border p-1 border-secondary rounded-circle mb-2"
            title="Click the Headphone Button to Listen"
          >
            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-secondary rounded-circle">
              <i className="ion-headphone" />
            </span>
          </div>
          <p className="text-dark mb-2">Listening Test</p>
          <button 
            className="btn btn-soft-secondary rounded-pill mt-2 w-100"
            onClick={handleAudioClick}
          >
            {isPlaying ? 'Pause' : 'Click to listen'}
          </button>
          <audio 
            ref={audioRef} 
            style={{ display: 'none' }}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="./assets/img/audio/intro.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      {/* <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
        <Link
          to={routes.classHomeWork}
          className="d-block bg-danger-transparent ronded p-3 w-100 text-center mb-3 class-hover"
        >
          <div
            className="avatar avatar-lg border p-1 border-danger rounded-circle mb-2"
            title="To identify and develop your reading skills we've put together some information."
          >
            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-danger rounded-circle">
              <i className="ion-edit" />
            </span>
          </div>
          <p className="text-dark mb-2">Grammar</p>

          <button className="btn btn-soft-danger rounded-pill mt-2 w-100">
            Click here to Learn
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default SpeechListenCard;
