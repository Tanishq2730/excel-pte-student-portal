import React, { useState, useEffect, useCallback,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";
import { fetchQuestionData } from "../../../api/practiceAPI";
import { QuestionData } from "../../../core/data/interface";
import { all_routes } from "../../router/all_routes";
import CardButton from "../component/cardButton";
import QuestionNavigation from "../component/questionNavigation";

const RepeatSentence = () => {

  const { subtype_id, question_id } = useParams<{ subtype_id: string; question_id?: string }>();
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [resetRecording, setResetRecording] = useState<boolean>(false); // Add reset state
  const [showAnswer, setShowAnswer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);


  useEffect(() => {
    const getData = async () => {
      try {
        const subtypeIdNum = Number(subtype_id);
        const questionIdNum = question_id ? Number(question_id) : 0;

        const res = await fetchQuestionData(subtypeIdNum, questionIdNum);

        if (!res.success || !res.data) {
          // Redirect back if no data found
          navigate(all_routes.adminDashboard); // Goes back to the previous page
          return;
        }

        setQuestionData(res.data);
      } catch (err) {
        console.error("Error fetching question data:", err);
        navigate(-1); // Redirect on fetch error as well
      }
    };

    if (subtype_id) {
      getData();
    }
  }, [subtype_id, question_id, navigate]);
  
    useEffect(() => {
      if (questionData?.Subtype?.preparation_time) {
        const preparationTimeInSeconds = parseInt(questionData.Subtype.preparation_time, 10); 
        setCountdown(preparationTimeInSeconds);
        setTimerActive(true);
      }
    }, [questionData]);
  
    const startRecordingCallback = useCallback(() => {
      if (questionData && questionData.Subtype.preparation_time === "0") {
        document.getElementById("startRecordingButton")?.click();
      }
    }, [questionData]);
  
    useEffect(() => {
      let intervalId: number;
    
      if (timerActive && countdown > 0) {
        intervalId = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else if (timerActive && countdown <= 0) {
        setTimerActive(false);
        startRecordingCallback(); // Start recording after countdown ends
      }
    
      return () => clearInterval(intervalId);
    }, [countdown, timerActive, startRecordingCallback]);

    const handleRestart = () => {
      // Reset countdown to the initial preparation time
      const preparationTimeInSeconds = parseInt(questionData?.Subtype.preparation_time || "0", 10);
      setCountdown(preparationTimeInSeconds);
      setTimerActive(true); // Restart the countdown
  
      setShowAnswer(false); // Optionally reset the answer view
  
      // Trigger reset for recording
      setResetRecording(true); // Set reset state to true
      setTimeout(() => setResetRecording(false), 100); // Reset state after a short delay
    };

  const formatTimePrepare = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
 

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
      setPlaybackRate(newSpeed);
    }
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleNext = () => {
    if (questionData?.nextQuestionId) {      
      navigate(`/repeat-sentence/${subtype_id}/${questionData?.nextQuestionId}`);
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(`/repeat-sentence/${subtype_id}/${questionData?.previousQuestionId}`);
    }
  };

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container">
          <div className="practiceLayout">
            <p className="my-3">
              Look at the text below. In 40 seconds, you must read this text
              aloud as naturally and clearly as possible. You have 40 seconds to
              read aloud. Speak within 3 seconds otherwise the microphone will
              close and you will lose the marks.
            </p>
            <div className="card">
              <div className="card-header">
                <div className="card-title text-white">{questionData?.question_name}</div>
              </div>
              <div className="card-body">
                <div className="time">
                    <div className="headBtn">
                      <CardButton questionData={questionData} />
                    </div>
                  <div className="innercontent">
                    <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2">
                      <button
                        className="btn btn-outline-secondary rounded-circle me-3"
                        onClick={togglePlay}
                      >
                        <i
                          className={`bi ${
                            isPlaying ? "fa fa-pause" : "fa fa-play"
                          }`}
                        ></i>
                      </button>

                      <input
                        type="range"
                        className="form-range me-2 flex-grow-1"
                        value={currentTime}
                        max={duration}
                        onChange={handleProgressChange}
                      />
                      <span className="me-3 text-muted">
                        {formatTime(currentTime)}/{formatTime(duration)}
                      </span>

                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="form-range me-2"
                        style={{ width: "80px" }}
                      />
                      <select
                        value={playbackRate}
                        onChange={handleSpeedChange}
                        className="form-select w-auto"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={1}>1.0</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>

                      <audio
                        ref={audioRef}
                        src="/your-audio.mp3"
                        preload="metadata"
                      />
                    </div>
                  </div>
                  <div className="micSection">
                    <RecorderComponent resetRecording={resetRecording} startRecording={startRecordingCallback} />
                  </div>
                  {showAnswer && (
                    <div
                      className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                      style={{ background: "#ffe4e4" }}
                    >
                      <div
                        className="audio-inner p-4 rounded-3"
                        style={{ background: "#ffe4e4" }}
                      >
                        <h3 className="fw-semibold mb-2">Audio Answer:</h3>
                        <hr />
                        <div className="rounded-pill">
                          <audio controls className="w-100">
                            <source
                              src="your-audio-file.mp3"
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bottomBtn mt-3">
                  <QuestionNavigation
                      questionData={questionData}
                      onAnswerClick={handleAnswerClick}
                      onRestart={handleRestart}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="community">
          <Community questionData={questionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatSentence;
