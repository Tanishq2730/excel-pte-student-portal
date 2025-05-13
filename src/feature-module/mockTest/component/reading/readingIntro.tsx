import React, { Dispatch, SetStateAction, useState, useRef } from "react";
import RedorderParagraph from "./reorderParagraph";
import ReadingWritingFillintheBlank from "./readingWritingFillintheBlank";
import ReadingFillintheBlank from "./readingFillintheBlank";
import McChooseSingleAnswer from "./mcChooseSingleAnswer";
import MultipleChooseMultipleAnswer from "./multipleChooseMultipleAnswer";
import { saveMocktestQuestion,saveFinalMocktest } from "../../../../api/mocktestAPI";
import { useParams } from 'react-router-dom';

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
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const submitCurrentQuestionRef = useRef<(() => void) | null>(null);
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
 console.log("readingQuestions", readingQuestions);
 

  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

    
    
    const commonProps = {
      key: index,
      question,
      setAnswer: setCurrentAnswer,
      registerSubmit: (fn: () => void) => {
        submitCurrentQuestionRef.current = fn;
      },
    };
    
    switch (subtype) {
      case "Re-order Paragraphs":
        return <RedorderParagraph {...commonProps} />;
      case "Reading and Writing Fill in the Blanks":
        return <ReadingWritingFillintheBlank {...commonProps} />;
      case "Reading Fill in the Blanks":
        return <ReadingFillintheBlank {...commonProps} />;
      case "MC, Choose Single Answer":
        return <McChooseSingleAnswer {...commonProps} />;
      case "MC, Choose Multiple Answer":
        return <MultipleChooseMultipleAnswer {...commonProps} />;
      default:
        return <div key={index}>Unsupported reading question type</div>;
    }
  };

 const handleNext = async () => {
  if (step === 0) {
    setStep(1);
    return;
  }

  let answer = null;
  if (submitCurrentQuestionRef.current) {
    answer = submitCurrentQuestionRef.current(); // Now it will return the payload
  }

  const currentQuestion = readingQuestions[step - 1];
  console.log("currentQuestion", currentQuestion);
  console.log("currentAnswer", answer);

  if (answer) {
    try {
      const response = await saveMocktestQuestion(false, answer);
      console.log("Answer saved:", response);
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  }

  if (step < readingQuestions.length) {
    setStep(step + 1);
  } else {
     try {
      const payload = {     
          mocktestId: id,
          sessionid: session_id
        };
      const response = await saveFinalMocktest(payload);
      setSectionPart(<div className="container mt-5"><h4>Reading section completed.</h4></div>);
      console.log("Answer saved:", response);
    } catch (error) {
      console.error("Error saving answer:", error);
    }
    
  }
};


  const handleSkip = () => {
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
