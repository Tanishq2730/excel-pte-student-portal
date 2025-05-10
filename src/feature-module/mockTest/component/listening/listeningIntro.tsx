import React, { Dispatch, SetStateAction, useState } from "react";
import SummarizeSpokenText from "./summarizeSpokenText";
import FillIntheBlank from "./fillIntheBlank";
import MultipleChooseSingleAnswer from "./multipleChooseSingleAnswer";
import MultipleChooseMultipleAnswer from "./multipleChooseMultipleAnswer";
import HighlightIncorrectWord from "./highlightIncorrectWord";
import WriteFromDictation from "./writeFromDictation";
import SelectMissingWord from "./selectMissingWord";
import HighlightCorrectSummary from "./highlightCorrectSummary";

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
  const listeningQuestions = mockquestions?.listening || [];
console.log("Listening Questions: ", listeningQuestions);

  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

    switch (subtype) {
      case "Highlight Correct Summary":
        return (
          <HighlightCorrectSummary
            key={index}
            question={question}
            queno={queno}
          />
        );
      case "Summarize Spoken Text":
        return (
          <SummarizeSpokenText
            key={index}
            question={question}
            queno={queno}
          />
        );
      case "Fill in the Blanks":
        return (
          <FillIntheBlank
            key={index}
            question={question}
            queno={queno}
          />
        );
      case "MC, Select Single Answer":
        return (
          <MultipleChooseSingleAnswer
            key={index}
            question={question}
            queno={queno}
          />
        );
      case "MC, Select Multiple Answer":
        return (
          <MultipleChooseMultipleAnswer
            key={index}
            question={question}
            queno={queno}
          />
        );
      case "Highlight Incorrect Words":
        return (
          <HighlightIncorrectWord
            key={index}
            question={question}
            queno={queno}
          />
        );
      case "Write from Dictation":
        return (
          <WriteFromDictation
            key={index}
            question={question}
            queno={queno}
          />
        );
      case "Select Missing Word":
        return (
          <SelectMissingWord
            key={index}
            question={question}
            queno={queno}
          />
        );
      default:
        return <div key={index}>Unsupported listening question type</div>;
    }
  };

  const handleNext = () => {
    if (step < listeningQuestions.length) {
      setStep(step + 1);
    } else {
      setSectionPart(
        <div className="container mt-5">
          <h4>Listening section completed.</h4>
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
            You are about to begin part 3 of the exam: <strong>Listening</strong>
          </p>
          <p className="font-weight-bold">Time allowed: 29–30 minutes</p>
        </div>
      ) : (
        getComponent(listeningQuestions[step - 1], step - 1)
      )}

      <div className="footer-v3 mt-4">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={step > listeningQuestions.length}
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

export default ListeningIntro;
