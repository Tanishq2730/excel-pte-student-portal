import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Structure from "../component/intro/structure";
import HeadsetCheck from "../component/intro/headsetCheck";
import MicrophoneCheck from "../component/intro/microphoneCheck";
import KeyboardCheck from "../component/intro/keyboardCheck";
import Introduction from "../component/intro/Introduction";
import SelfIntroduction from "../component/intro/selfIntroduction";
import Session from "../component/intro/session";

const MockTest: React.FC = () => {
  const { id } = useParams();
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
          session_id="static-session-id"
          LoadFinal={() => {}}
        />
      ),
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <section className="mocktest-session">
      <div>{steps[currentStepIndex].component}</div>

      {currentStepIndex < steps.length - 1 && (
        <div className="footer-v3">
          <div className="container">
            <div className="row">
              <div className="col text-right">
                <button className="btn btn-primary mockmainbtn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MockTest;
