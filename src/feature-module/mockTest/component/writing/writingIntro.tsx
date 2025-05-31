import React, { Dispatch, SetStateAction, useState, useRef } from "react";
import SummarizeWritinText from "./summarizeWrittenText";
import WriteEmail from "./writeEmail";
import WriteEssay from "./writeEssay";
import { saveMocktestQuestion,saveFinalMocktest } from "../../../../api/mocktestAPI";
import { useParams } from 'react-router-dom';
import MockHeader from "../../../../core/common/mockHeader";
import SuccesfullyCompleted from "../common/successfullyCompleted";

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
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const submitCurrentQuestionRef = useRef<(() => void) | null>(null);
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
console.log(writingQuestions,'writingQuestions');

  // Dynamically map subtype names to components
  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

    const commonProps = {
      key: index,
      questionData:question,
      setAnswer: setCurrentAnswer,
      registerSubmit: (fn: () => void) => {
        submitCurrentQuestionRef.current = fn;
      },
    };

    switch (subtype) {
      case "Summarize Written Text":
        return <SummarizeWritinText {...commonProps} />;
      case "Write Email":
        return <WriteEmail {...commonProps} />;
      case "Write Essay":
        return <WriteEssay {...commonProps} />;
      default:
        return <div key={index}>Unsupported writing question type</div>;
    }
  };

 const handleNext = async () => {
   if (step === 0) {
     setStep(1);
     return;
   }
 
   let answer = null;
   if (submitCurrentQuestionRef.current) {
      answer = await submitCurrentQuestionRef.current(); // Now it will return the payload
   }
 
   const currentQuestion = writingQuestions[step - 1];
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
 
   if (step < writingQuestions.length) {
     setStep(step + 1);
   } else {
      try {
       const payload = {     
           mocktestId: id,
           sessionid: session_id
         };
       const response = await saveFinalMocktest(payload);
       setSectionPart(<div className="container mt-5"><h4>Writing section completed.</h4></div>);
       console.log("Answer saved:", response);
     } catch (error) {
       console.error("Error saving answer:", error);
     }
     
   }
 };
 
 
   const handleSkip = () => {
     if (step < writingQuestions.length) {
       setStep(step + 1);
     } else {
       setSectionPart(
         <div className="container ">
           <SuccesfullyCompleted/>
         </div>
       );
     }
   };

   return (
    <>
    <MockHeader/>
      {step === 0 ? (
        <div className="container mt-5">
          <p className="font-weight-bold">
            You are about to begin part 2 of the exam: <strong>Reading</strong>
          </p>
          <p className="font-weight-bold">Time allowed: 29–30 minutes</p>
        </div>
      ) : (
        getComponent(writingQuestions[step - 1], step - 1)
      )}

      <div className="footer-v3 mt-4">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={step > writingQuestions.length}
              >
                {step === 0 ? "Start" : "Save & Exit"}
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

export default WritingIntro;
