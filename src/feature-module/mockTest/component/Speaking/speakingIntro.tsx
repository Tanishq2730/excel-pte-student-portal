import React, { useState } from "react";
import SummarizeWritinText from "../writing/summarizeWrittenText";
import ReadAloud from "./readAloud";
import RepeatSentence from "./repeatSentence";
import DescribeImage from "./describeImage";

const SpeakingIntro: React.FC = () => {
  const [step, setStep] = useState(0);

  // List of components to show one-by-one
  const components = [
    <ReadAloud key="swt" />,
    <RepeatSentence key="rs" />,
    <DescribeImage key="rs" />,
  ];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, components.length));
  };

  const handleSkip = () => {
    handleNext(); // Just move to next, same as Next
  };

  return (
    <>
      {step === 0 ? (
        <div className="container mt-5">
          <p className="font-weight-bold">
            You are about to begin part 2 of the exam: Reading
          </p>
          <p className="font-weight-bold">Time allowed: 29-30 minutes</p>
        </div>
      ) : (
        components[step - 1]
      )}

      <div className="footer-v3">
        <div className="container">
          <div className="row">
            <div className="col text-left">
              <button className="btn btn-primary" onClick={handleNext}>
                Save & Next
              </button>
            </div>
            <div className="col text-end">
              <button className="btn btn-primary mx-1" onClick={handleSkip}>
                Skip
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeakingIntro;
