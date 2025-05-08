import React, { useState } from "react";
import SummarizeSpokenText from "./summarizeSpokenText";
import FillIntheBlank from "./fillIntheBlank";
import MultipleChooseSingleAnswer from "./multipleChooseSingleAnswer";
import MultipleChooseMultipleAnswer from "./multipleChooseMultipleAnswer";
import HighlightIncorrectWord from "./highlightIncorrectWord";
import WriteFromDictation from "./writeFromDictation";
import SelectMissingWord from "./selectMissingWord";

const ListeningIntro: React.FC = () => {
  const [step, setStep] = useState(0);

  // List of components to show one-by-one
  const components = [
    <SummarizeSpokenText key="spt" />,
    <FillIntheBlank key="fb" />,
    <MultipleChooseSingleAnswer key="mcs" />,
    <MultipleChooseMultipleAnswer key="mcs" />,
    <HighlightIncorrectWord key="mcs" />,
    <WriteFromDictation key="wd" />,
    <SelectMissingWord key="wd" />,
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

export default ListeningIntro;
