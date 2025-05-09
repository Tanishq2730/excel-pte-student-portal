import React, { Dispatch, SetStateAction, useState } from "react";
import RedorderParagraph from "../reading/reorderParagraph";
import ReadingWritingFillintheBlank from "../reading/readingWritingFillintheBlank";
import ReadingFillintheBlank from "../reading/readingFillintheBlank";
import McChooseSingleAnswer from "../reading/mcChooseSingleAnswer";
import MultipleChooseMultipleAnswer from "../reading/multipleChooseMultipleAnswer";
import SummarizeWritinText from "./summarizeWrittenText";
import WriteEmail from "./writeEmail";
import WriteEssay from "./writeEssay";

interface WritingIntroProps {
  queno: number;
  mockquestions: any;
  setSectionPart: Dispatch<SetStateAction<JSX.Element | null>>;
}

const WritingIntro: React.FC<WritingIntroProps> = ({
  queno,
  mockquestions,
  setSectionPart,
}) => {
  const [step, setStep] = useState(0);

  const components = [
    <SummarizeWritinText key="swt" />,
    <WriteEmail key="we" />,
    <WriteEssay key="we2" />,
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
            You are about to begin part 2 of the exam: Writing
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

export default WritingIntro;
