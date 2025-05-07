import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TimesUpModal from "../modal/timesUp";
import RecordingStoppedModal from "../modal/recordingStopped";
import ConfirmModal from "../modal/confirmModal";
import CannotSkipModal from "../modal/cannotSkipModal";
import FinalSubmit from "../additional/finalSubmit";

interface McChoosMultipleAnswerProps {
  queno: number;
  queno2: number;
  readinglen: number;
  question: any;
  mockquestions: any[];
  loadNext: (
    queno: number,
    mockquestions: any[],
    setSectionPart: React.Dispatch<React.SetStateAction<JSX.Element>>
  ) => void;
  setSectionPart: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

const McChoosMultipleAnswer: React.FC<McChoosMultipleAnswerProps> = ({
  queno,
  queno2,
  readinglen,
  question,
  mockquestions,
  loadNext,
  setSectionPart,
}) => {
  const { id, session_id } = useParams();
  const [showTimesUpModal, setShowTimesUpModal] = useState(false);
  const [showCannotSkipModal, setCannotSkipModal] = useState(false);
  const [showRecordingStoppedModal, setRecordingStoppedModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);

  const [time, setTime] = useState<number>(
    Number(localStorage.getItem("introtime")) || 60
  );
  const [timerActive, setTimerActive] = useState(false);

  const questionRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null); // ✅ Fixed type here

  useEffect(() => {
    if (timerActive && time > 0 && intervalRef.current === null) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("introtime", newTime.toString());
          return newTime;
        });
      }, 1000);
    }

    if (time === 0) {
      setRecordingStoppedModal(true);
      setShowTimesUpModal(true);
      setTimerActive(false);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [time, timerActive]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const logout = () => {
    window.location.href = "https://excelpte.com/admin/logout";
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      logout();
    }
    setTimerActive(true);

    if (questionRef.current) {
      const inputs = questionRef.current.querySelectorAll(
        'input[type="checkbox"]'
      );
      inputs.forEach((input) => ((input as HTMLInputElement).checked = false));
    }
  }, [question]);

  const handleNext = () => {
    setRecordingStoppedModal(false);
    setShowTimesUpModal(false);
    setConfirmModal(true);
  };

  const goNextQuestion = () => {
    setConfirmModal(false);
    loadNext(queno, mockquestions, setSectionPart);
  };

  const handleSave = () => {
    setRecordingStoppedModal(false);
    setShowTimesUpModal(false);
    save_and_exit();
  };

  const save_and_exit = () => {
    setConfirmModal(false);
    setSectionPart(<FinalSubmit />);
  };

  const handleSkip = () => {
    loadNext(queno, mockquestions, setSectionPart);
  };

  return (
    <div className="reading-body">
      <nav className="question-nav">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="mock-title">
                Excel PTE Mock Test -{" "}
                {question && <span>{question.lession}</span>}
              </h1>
            </div>

            <div className="col" id="timercont">
              <div className="informa">
                <div className="inner">
                  <div className="timer-container">
                    <span>
                      <i className="fa fa-clock-o"></i>
                    </span>
                    <span className="speakingTimer">{formatTime(time)}</span>
                  </div>
                  <div className="questioncount">
                    <span>{queno2}</span>
                    <span> of </span>
                    <span>{readinglen}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container pt-24 st-scroll">
        <div className="question-heading">
          Read the text and answer the question by selecting all the correct
          responses. More than one response is correct.
        </div>

        <div className="question_container">
          <div id="questionAlt" ref={questionRef}>
            {question ? (
              <div
                className="mc-choose-multiple-answer"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />
            ) : (
              "Question"
            )}
          </div>
          <div className="choose_container">
            {/* <ChooseBox question={question} /> */}
          </div>
        </div>
      </div>

      <div className="footer-v3">
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="btn-theme-v3 save" onClick={handleSave}>
                Save & Exit
              </button>
            </div>
            <div className="col text-right">
              {localStorage.getItem("email") === "skip" && (
                <button
                  className="btn-theme-v3 bg-warning"
                  onClick={handleSkip}
                >
                  Skip
                </button>
              )}
              <button className="btn-theme-v3" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <TimesUpModal
        show={showTimesUpModal}
        onHide={() => setShowTimesUpModal(false)}
        onButtonClick={goNextQuestion}
      />
      <RecordingStoppedModal
        show={showRecordingStoppedModal}
        onHide={() => setRecordingStoppedModal(false)}
        onButtonClick={handleNext}
      />
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setConfirmModal(false)}
        onButtonClick={goNextQuestion}
      />
      <CannotSkipModal
        show={showCannotSkipModal}
        onHide={() => setCannotSkipModal(false)}
      />
    </div>
  );
};

export default McChoosMultipleAnswer;
