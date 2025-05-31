import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import ReadAloud from "./readAloud";
import RepeatSentence from "./repeatSentence";
import DescribeImage from "./describeImage";
import RetellLecture from "./retellLecture";
import AnswerShortQuestion from "./answerShortQuestion";
import RespondtoSituation from "./respondtoSituation";
import {
  saveMocktestQuestion,
  saveFinalMocktest,
} from "../../../../api/mocktestAPI";
import { useParams } from "react-router-dom";
import MockHeader from "../../../../core/common/mockHeader";
import SuccesfullyCompleted from "../common/successfullyCompleted";

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
  const speakingQuestions = mockquestions?.speaking || [];
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const submitCurrentQuestionRef = useRef<(() => void) | null>(null);
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
  const [isCountdownDone, setCountdownDone] = useState(true);
  console.log(speakingQuestions, "speakingQuestions");

  // Dynamically map subtype names to components
  const getComponent = (question: any, index: number) => {
    const subtype = question?.Subtype?.sub_name;

    const commonProps = {
      key: index,
      questionData: question,
      setAnswer: setCurrentAnswer,
      registerSubmit: (fn: () => void) => {
        submitCurrentQuestionRef.current = fn;
      },
      setCountdownDone,
    };

    switch (subtype) {
      case "Read Aloud":
        return <ReadAloud {...commonProps} />;
      case "Repeat Sentence":
        return <RepeatSentence {...commonProps} />;
      case "Describe Image":
        return <DescribeImage {...commonProps} />;
      case "Re-tell Lecture":
        return <RetellLecture {...commonProps} />;
      case "Answer Short Question":
        return <AnswerShortQuestion {...commonProps} />;
      case "Respond to Situation":
        return <RespondtoSituation {...commonProps} />;
      default:
        return <div key={index}>Unsupported question type</div>;
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

    const currentQuestion = speakingQuestions[step - 1];

    if (answer) {
      try {
        const response = await saveMocktestQuestion(true, answer);
      } catch (error) {
        console.error("Error saving answer:", error);
      }
    }

    if (step < speakingQuestions.length) {
      setStep(step + 1);
    } else {
      try {
        const payload = {
          mocktestId: id,
          sessionid: session_id,
        };
        const response = await saveFinalMocktest(payload);
        setSectionPart(
          <div className="container mt-5">
            <h4>Speaking section completed.</h4>
          </div>
        );
        console.log("Answer saved:", response);
      } catch (error) {
        console.error("Error saving answer:", error);
      }
    }
  };

  const handleSkip = () => {
    if (step < speakingQuestions.length) {
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
      <MockHeader />
      {step === 0 ? (
        <div className="container mt-5">
          <p className="font-weight-bold">
            You are about to begin part 2 of the exam: <strong>Speaking</strong>
          </p>
          <p className="font-weight-bold">Time allowed: 29–30 minutes</p>
        </div>
      ) : (
        getComponent(speakingQuestions[step - 1], step - 1)
      )}

      <div className="footer-v3 mt-4">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={
                  step > speakingQuestions.length ||
                  (step !== 0 && !isCountdownDone)
                }
              >
                {step === 0 ? "Start" : "Save & Exit"}
              </button>
            </div>
            {step > 0 && (
              <div className="col-auto text-end">
                <button
                  className="btn btn-outline-secondary mx-1"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!isCountdownDone}
                >
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

export default SpeakingIntro;
