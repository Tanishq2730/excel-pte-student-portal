import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Structure from "../component/intro/structure";
import HeadsetCheck from "../component/intro/headsetCheck";
import MicrophoneCheck from "../component/intro/microphoneCheck";
import KeyboardCheck from "../component/intro/keyboardCheck";
import Introduction from "../component/intro/Introduction";
import SelfIntroduction from "../component/intro/selfIntroduction";
import Session from "../component/intro/session";
import MockAllQuestion from "./mockAllQuestion";

import { validateMocktest, sessionValidate, saveIntroduction } from "../../../api/mocktestAPI";

const generateUniqueId = () => {
  const timestamp = Date.now();
  const random1 = Math.floor(Math.random() * 1000000);
  const random2 = Math.floor(Math.random() * 1000000);
  return `${timestamp}${random1}${random2}`;
};

const MockTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const mocktestType = localStorage.getItem("mocktestType") || "Academic";
  const navigate = useNavigate();
  const [session_id] = useState<string>(generateUniqueId());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [time, setTime] = useState(55);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimesUpModal, setShowTimesUpModal] = useState(false);
  const [showCannotSkipModal, setCannotSkipModal] = useState(false);
  const [validate, setValidate] = useState(false);
  const [isSelfIntroDone, setIsSelfIntroDone] = useState(false);

  useEffect(() => {
    const interval = timerActive && time > 0
      ? setInterval(() => setTime((prev) => prev - 1), 1000)
      : null;

    if (time === 0) {
      setShowTimesUpModal(true);
      setTimerActive(false);
      if (interval) clearInterval(interval);
    }

    localStorage.setItem("introtime", String(time));

    return () => {
      localStorage.setItem("introtime", "0");
      if (interval) clearInterval(interval);
    };
  }, [time, timerActive]);

  useEffect(() => {
    const validateMock = async () => {
      try {
        const payload = { mocktestType: encodeURIComponent(mocktestType) };
        const res = await validateMocktest(id, payload);
        setValidate(!!res.success);
      } catch (err) {
        console.error("Error loading mock test data:", err);
      }
    };
    validateMock();
  }, [id, mocktestType]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const steps = [
    { name: "Session", component: <Session /> },
    { name: "Structure", component: <Structure /> },
    { name: "HeadsetCheck", component: <HeadsetCheck /> },
    { name: "MicrophoneCheck", component: <MicrophoneCheck /> },
    { name: "KeyboardCheck", component: <KeyboardCheck /> },
    { name: "Introduction", component: <Introduction /> },
    {
      name: "SelfIntroduction",
      component: (
        <SelfIntroduction
          id={id}
          session_id={session_id}
          LoadFinal={() => setIsSelfIntroDone(true)}
          setCannotSkipModal={setCannotSkipModal}
        />
      ),
    },
    // {
    //   name: "MockAllQuestion",
    //   component: (
    //     <MockAllQuestion
    //       id={id}
    //       session_id={session_id}
    //       LoadFinal={() => {}}
    //     />
    //   ),
    // },
  ];

 const handleNext = () => {
  const currentStepName = steps[currentStepIndex].name;

  if (currentStepName === "SelfIntroduction") {
    if (!isSelfIntroDone) {
      setCannotSkipModal(true);
      return;
    } else {
      navigate(`/mocktest/exam/${id}/${session_id}`);
      return;
    }
  }

  if (currentStepIndex < steps.length - 1) {
    setCurrentStepIndex((prev) => prev + 1);
  }
};

  return (
    <section className="mocktest-session">
      <div>{steps[currentStepIndex].component}</div>

      {/* {currentStepIndex < steps.length - 1 && ( */}
        <div className="footer-v3">
          <div className="container">
            <div className="row">
              <div className="col text-right">
                <button
                  className="btn btn-primary mockmainbtn"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}

      {showCannotSkipModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h4>Please complete your self-introduction recording before continuing.</h4>
            <button onClick={() => setCannotSkipModal(false)}>OK</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MockTest;
