import React, { Dispatch, SetStateAction, useState } from "react";
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

  const writingQuestions = mockquestions?.writing || [];

  // Dynamically map subtype names to components
  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

    switch (subtype) {
      case "Summarize Written Text":
        return <SummarizeWritinText key={index} question={question} />;
      case "Write Email":
        return <WriteEmail key={index} question={question} />;
      case "Write Essay":
        return <WriteEssay key={index} question={question} />;
      default:
        return <div key={index}>Unsupported writing question type</div>;
    }
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, writingQuestions.length));
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <>
      {step === 0 ? (
        <div className="container mt-5">
          <p className="font-weight-bold">
            You are about to begin part 3 of the exam: Writing
          </p>
          <p className="font-weight-bold">Time allowed: 29-30 minutes</p>
        </div>
      ) : (
        getComponent(writingQuestions[step - 1], step - 1)
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WritingIntro;
