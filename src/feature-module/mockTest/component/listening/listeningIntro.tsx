import React, { Dispatch, SetStateAction, useState } from "react";
import SummarizeSpokenText from "./summarizeSpokenText";
import FillIntheBlank from "./fillIntheBlank";
import MultipleChooseSingleAnswer from "./multipleChooseSingleAnswer";
import MultipleChooseMultipleAnswer from "./multipleChooseMultipleAnswer";
import HighlightIncorrectWord from "./highlightIncorrectWord";
import WriteFromDictation from "./writeFromDictation";
import SelectMissingWord from "./selectMissingWord";

interface ListeningIntroProps {
  queno: number;
  mockquestions: any;
  setSectionPart: Dispatch<SetStateAction<JSX.Element | null>>;
}

const ListeningIntro: React.FC<ListeningIntroProps> = ({
  queno,
  mockquestions,
  setSectionPart,
}) => {
  const [step, setStep] = useState(0);

  const components = [
    <SummarizeSpokenText key="spt" />,
    <FillIntheBlank key="fb" />,
    <MultipleChooseSingleAnswer key="mcs" />,
    <MultipleChooseMultipleAnswer key="mcm" />,
    <HighlightIncorrectWord key="hiw" />,
    <WriteFromDictation key="wd" />,
    <SelectMissingWord key="smw" />,
  ];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, components.length));
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <>
      {step === 0 ? (
        <div className="container mt-5">
          <p className="font-weight-bold">
            You are about to begin part 2 of the exam: Listening
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
