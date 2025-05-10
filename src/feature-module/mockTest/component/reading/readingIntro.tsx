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
  const readingQuestions = mockquestions?.reading || [];

  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

    switch (subtype) {
      case "Re-order Paragraphs":
        return (
          <RedorderParagraph
            key={index}
            question={question}
          />
        );
      case "Reading and Writing Fill in the Blanks":
        return (
          <ReadingWritingFillintheBlank
            key={index}
            question={question}
          />
        );
      case "Reading Fill in the Blanks":
        return (
          <ReadingFillintheBlank
            key={index}
            question={question}
          />
        );
      case "MC, Choose Single Answer":
        return (
          <McChooseSingleAnswer
            key={index}
            question={question}
          />
        );
      case "MC, Choose Multiple Answer":
        return (
          <MultipleChooseMultipleAnswer
            key={index}
            question={question}
          />
        );
      default:
        return <div key={index}>Unsupported reading question type</div>;
    }
  };

  const handleNext = () => {
    if (step < readingQuestions.length) {
      setStep(step + 1);
    } else {
      setSectionPart(
        <div className="container mt-5">
          <h4>Reading section completed.</h4>
        </div>
      );
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <>
      {step === 0 ? (
        <div className="container mt-5">
          <p className="font-weight-bold">
            You are about to begin part 2 of the exam: <strong>Reading</strong>
          </p>
          <p className="font-weight-bold">Time allowed: 29–30 minutes</p>
        </div>
      ) : (
        getComponent(readingQuestions[step - 1], step - 1)
      )}

      <div className="footer-v3 mt-4">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={step > readingQuestions.length}
              >
                {step === 0 ? "Start" : "Save & Next"}
              </button>
            </div>
            {step > 0 && (
              <div className="col-auto text-end">
                <button className="btn btn-outline-secondary mx-1" onClick={handleSkip}>
                  Skip
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadingIntro;
