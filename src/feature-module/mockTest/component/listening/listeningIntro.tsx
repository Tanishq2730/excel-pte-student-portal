import React, { Dispatch, SetStateAction, useState,useRef, useEffect } from "react";
import SummarizeSpokenText from "./summarizeSpokenText";
import FillIntheBlank from "./fillIntheBlank";
import MultipleChooseSingleAnswer from "./multipleChooseSingleAnswer";
import MultipleChooseMultipleAnswer from "./multipleChooseMultipleAnswer";
import HighlightIncorrectWord from "./highlightIncorrectWord";
import WriteFromDictation from "./writeFromDictation";
import SelectMissingWord from "./selectMissingWord";
import HighlightCorrectSummary from "./highlightCorrectSummary";
import { saveMocktestQuestion,saveFinalMocktest } from "../../../../api/mocktestAPI";
import { useParams } from 'react-router-dom';
import MockHeader from "../../../../core/common/mockHeader";
import SuccesfullyCompleted from "../common/successfullyCompleted";

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
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const submitCurrentQuestionRef = useRef<(() => void) | null>(null);
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
 const [isCountdownDone, setCountdownDone] = useState(true);
  console.log("Listening Questions: ", listeningQuestions);


  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

     const commonProps = {
      key: index,
      question:question,
      setAnswer: setCurrentAnswer,
      registerSubmit: (fn: () => void) => {
        submitCurrentQuestionRef.current = fn;
      },
      setCountdownDone,
    };

    switch (subtype) {
      case "Highlight Correct Summary":
        return (
          <HighlightCorrectSummary {...commonProps} />
        );
      case "Summarize Spoken Text":
        return (
          <SummarizeSpokenText {...commonProps} />
        );
      case "Fill in the Blanks":
        return (
          <FillIntheBlank {...commonProps} />
        );
      case "MC, Select Single Answer":
        return (
          <MultipleChooseSingleAnswer {...commonProps} />
        );
      case "MC, Select Multiple Answer":
        return (
          <MultipleChooseMultipleAnswer {...commonProps} />
        );
      case "Highlight Incorrect Words":
        return (
          <HighlightIncorrectWord {...commonProps} />
        );
      case "Write from Dictation":
        return (
          <WriteFromDictation {...commonProps} />
        );
      case "Select Missing Word":
        return (
          <SelectMissingWord {...commonProps} />
        );
      default:
        return <div key={index}>Unsupported listening question type</div>;
    }
  };

   useEffect(() => {
    if (step > 0) {
      setCountdownDone(false); // Reset countdown when a new question starts
    }
  }, [step]);

  const handleNext = async () => {
       if (step === 0) {
         setStep(1);
         return;
       }
     
       let answer = null;
       if (submitCurrentQuestionRef.current) {
          answer = await submitCurrentQuestionRef.current(); // Now it will return the payload
       }
     
       const currentQuestion = listeningQuestions[step - 1];
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
     
       if (step < listeningQuestions.length) {
         setStep(step + 1);
       } else {
          try {
            const payload = {     
               mocktestId: id,
               sessionid: session_id
            };
           const response = await saveFinalMocktest(payload);
           setSectionPart(<div className="container mt-5"><h4>Listening section completed.</h4></div>);
           console.log("Answer saved:", response);
         } catch (error) {
           console.error("Error saving answer:", error);
         } 
       }
     };
     
     
       const handleSkip = () => {
         if (step < listeningQuestions.length) {
           setStep(step + 1);
         } else {
           setSectionPart(
             <div className="container">
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
            You are about to begin part 2 of the exam: <strong>Listening</strong>
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
                disabled={step > listeningQuestions.length || step !== 0 && !isCountdownDone}
              >
                {step === 0 ? "Start" : "Save & Exit" }
              </button>
            </div>
            {step > 0 && (
              <div className="col-auto text-end">
                <button className="btn btn-outline-secondary mx-1" onClick={handleSkip} >
                  Skip
                </button>
                <button className="btn btn-primary" onClick={handleNext} disabled={!isCountdownDone}>
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
