import React, { Dispatch, SetStateAction, useState } from "react";
import RedorderParagraph from "./reorderParagraph";
import ReadingWritingFillintheBlank from "./readingWritingFillintheBlank";
import ReadingFillintheBlank from "./readingFillintheBlank";
import McChooseSingleAnswer from "./mcChooseSingleAnswer";
import MultipleChooseMultipleAnswer from "./multipleChooseMultipleAnswer";

interface ReadingIntroProps {
  queno: number;
  mockquestions: any;
  setSectionPart: Dispatch<SetStateAction<JSX.Element | null>>;
}

const ReadingIntro: React.FC<ReadingIntroProps> = ({
  queno,
  mockquestions,
  setSectionPart,
}) => {
  const [step, setStep] = useState(0);

  // List of components to show one-by-one
  const components = [
    <RedorderParagraph key="reorder" />,
    <ReadingWritingFillintheBlank key="rwfib" />,
    <ReadingFillintheBlank key="rfib" />,
    <McChooseSingleAnswer key="mcq" />,
    <MultipleChooseMultipleAnswer key="mcma" />,
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

export default ReadingIntro;
