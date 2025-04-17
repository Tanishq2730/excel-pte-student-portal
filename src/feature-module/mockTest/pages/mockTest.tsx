import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Structure from "../component/intro/structure";
import HeadsetCheck from "../component/intro/headsetCheck";
import MicrophoneCheck from "../component/intro/microphoneCheck";
import KeyboardCheck from "../component/intro/keyboardCheck";
import Introduction from "../component/intro/Introduction";
import SelfIntroduction from "../component/intro/selfIntroduction";

// Define the generateUniqueId function before using it
const generateUniqueId = (): string => {
  const timestamp = new Date().getTime();
  const random1 = Math.floor(Math.random() * 1000000);
  const random2 = Math.floor(Math.random() * 1000000);
  return `${timestamp}${random1}${random2}`;
};

const MockTest: React.FC = () => {
  const [apiRequestMade, setApiRequestMade] = useState(false); // New state variable
  const { id } = useParams();
  const navigate = useNavigate();

  const [session_id] = useState(generateUniqueId());

  const [partname, setPartName] = useState<string | null>(null);
  const [SectionPart, setSectionPart] = useState<React.ReactNode | null>(null);

  const [time, setTime] = useState(55);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimesUpModal, setShowTimesUpModal] = useState(false);
  const [showCannotSkipModal, setCannotSkipModal] = useState(false);

  useEffect(() => {
    let interval: number | null = null;  // Initialize with null

    if (timerActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0 && interval !== null) {  // Ensure interval is assigned
      setShowTimesUpModal(true); // Close the modal if needed
      clearInterval(interval);
      setTimerActive(false);
    }

    localStorage.setItem("introtime", time.toString());

    return () => {
      localStorage.setItem("introtime", "0");
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [time, timerActive]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const logout = () => {
    window.location.href = "https://excelpte.com/admin/logout";
  };

  const LoadStructure = () => {
    setSectionPart(<Structure />);
    setPartName("Structure");
  };

  const LoadHeadsetCheck = () => {
    setSectionPart(<HeadsetCheck />);
    setPartName("HeadsetCheck");
  };

  const LoadMicrophoneCheck = () => {
    setSectionPart(<MicrophoneCheck />);
    setPartName("MicrophoneCheck");
  };

  const LoadKeyboardCheck = () => {
    setSectionPart(<KeyboardCheck />);
    setPartName("KeyboardCheck");
  };

  const LoadIntroduction = () => {
    setSectionPart(<Introduction />);
    setPartName("Introduction");
  };

  const LoadSelfIntroduction = () => {
    setTimerActive(true);
    setSectionPart(
        <SelfIntroduction id={id} session_id={session_id} LoadFinal={LoadFinal} />
      );
      
    setPartName("SelfIntroduction");
  };

  const LoadTiming = () => {
    let mtt = localStorage.getItem("introtime");
    if (mtt && parseInt(mtt) > 25) {
      setCannotSkipModal(true);
    } else {
      setCannotSkipModal(false);
      setTimerActive(false);
      navigate(`/mocktest/exam/${id}/${session_id}`);
    }
  };

  const LoadFinal = () => {
    setCannotSkipModal(false);
    setShowTimesUpModal(false);
    LoadTiming();
  };

  const [mockName, setMockName] = useState<string>("");
  useEffect(() => {
    const allMockTests = JSON.parse(localStorage.getItem("allMockTests") || "[]");
    if (allMockTests) {
      const mockTest = allMockTests.find((v: { id: string }) => v.id === id);
      if (mockTest) {
        setMockName(mockTest.mock_name);
      }
    }
  }, [id]);

  return (
    <section className="mocktest-session">
      {/* <nav className="question-nav">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="mock-title st-text-st">
                Excel PTE Mock Test {mockName && (
                  <>
                    - <span>{mockName}</span>
                  </>
                )}
              </h1>
            </div>
            {partname === "SelfIntroduction" && (
              <div className="col" id="timercont">
                <div className="informa">
                  <div className="inner">
                    <div className="timer-container">
                      <span>
                        <i className="fa fa-clock-o"></i>
                      </span>
                      <span>{formatTime(time)}</span>
                      <span> / </span>
                      <span> 00:55 </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav> */}

      {SectionPart !== null ? <div>{SectionPart}</div> : ""}
      {partname && partname !== "SelfIntroduction" ? (
        <div className="footer-v3">
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col text-right">
                {partname === "Session" && (
                  <button className="btn-theme-v3" onClick={LoadStructure}>
                    Next
                  </button>
                )}
                {partname === "Structure" && (
                  <button className="btn-theme-v3" onClick={LoadHeadsetCheck}>
                    Next
                  </button>
                )}
                {partname === "HeadsetCheck" && (
                  <button className="btn-theme-v3" onClick={LoadMicrophoneCheck}>
                    Next
                  </button>
                )}
                {partname === "MicrophoneCheck" && (
                  <button className="btn-theme-v3" onClick={LoadKeyboardCheck}>
                    Next
                  </button>
                )}
                {partname === "KeyboardCheck" && (
                  <button className="btn-theme-v3" onClick={LoadIntroduction}>
                    Next
                  </button>
                )}
                {partname === "Introduction" && (
                  <button className="btn-theme-v3" onClick={LoadSelfIntroduction}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <TimesUpModal
        show={showTimesUpModal}
        onHide={() => setShowTimesUpModal(false)}
        onButtonClick={LoadFinal}
      />

      <CannotSkip
        show={showCannotSkipModal}
        onHide={() => setCannotSkipModal(false)}
      /> */}
    </section>
  );
};

export default MockTest;
