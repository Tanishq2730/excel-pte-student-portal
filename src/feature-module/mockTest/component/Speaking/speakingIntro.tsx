import React, { Dispatch, SetStateAction, useState } from "react";
import ReadAloud from "./readAloud";
import RepeatSentence from "./repeatSentence";
import DescribeImage from "./describeImage";
import RetellLecture from "./retellLecture";

interface SpeakingIntroProps {
  queno: number;
  mockquestions: any;
  setSectionPart: Dispatch<SetStateAction<JSX.Element | null>>;
}

const SpeakingIntro: React.FC<SpeakingIntroProps> = ({
  queno,
  mockquestions,
  setSectionPart,
}) => {
  const [step, setStep] = useState(0);

  // Dynamically map subtype names to components
  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

    switch (subtype) {
      case "Read Aloud":
        return <ReadAloud key={index} question={question} />;
      case "Repeat Sentence":
        return <RepeatSentence key={index} question={question} />;
      case "Describe Image":
        return <DescribeImage key={index} question={question} />;
      case "Retell Lecture":
        return <RetellLecture />;
      default:
        return <div key={index}>Unsupported question type</div>;
    }
  };

  const speakingQuestions = mockquestions?.speaking || [];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, speakingQuestions.length));
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <>
      {step === 0 ? (
        <div className="container mt-5">
          <p className="font-weight-bold">
            You are about to begin part 2 of the exam: Speaking
          </p>
          <p className="font-weight-bold">Time allowed: 29-30 minutes</p>
        </div>
      ) : (
        getComponent(speakingQuestions[step - 1], step - 1)
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

export default SpeakingIntro;
