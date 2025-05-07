import React, { useState } from "react";
import AccordianQuestion from "./accordianQuestion";
import SelectCard from "./selectCard";
import Quiz from "./quize";
import Score from "./score";
import ReviewCard from "./reviewCard";
import StepProgress from "./stepProgress";
import Lesson from "./Lesson";

const questions = [
  {
    question: "The movie was _____ entertaining; I loved it.",
    options: ["extremely", "extreme", "extremity", "more extreme"],
    correctAnswer: "extremely",
    description: "'Extremely' is the correct adverb modifying 'entertaining'.",
  },
  {
    question: "She sings _____ than her sister.",
    options: ["good", "better", "best", "well"],
    correctAnswer: "better",
    description: "'Better' is the comparative form of 'well'.",
  },
  {
    question: "I will call you when he _____ here.",
    options: ["will come", "comes", "came", "coming"],
    correctAnswer: "comes",
    description:
      "In time clauses with 'when', use the present simple to refer to the future.",
  },
  {
    question: "This is the place _____ we met.",
    options: ["where", "which", "that", "what"],
    correctAnswer: "where",
    description: "'Where' is used to refer to places.",
  },
  {
    question: "He is the man _____ car was stolen.",
    options: ["which", "whose", "who", "whom"],
    correctAnswer: "whose",
    description: "'Whose' is the possessive form used for people.",
  },
];

const GrammerPractice: React.FC = () => {
  const [stage, setStage] = useState<"select" | "quiz" | "score" | "review">("select");
  const [answeredSteps, setAnsweredSteps] = useState<Record<number, { correct: boolean }>>({});
  const [goToStep, setGoToStep] = useState<number | null>(null);
  const [showLesson, setShowLesson] = useState(false);

  const handleStartQuiz = () => {
    setShowLesson(false);
    setStage("quiz");
  };

  const handleQuizComplete = () => {
    setStage("score");
  };

  const handleRestart = () => {
    setStage("quiz");
    setAnsweredSteps({});
    setGoToStep(null);
  };

  const handleReview = () => {
    setStage("review");
  };

  const handleStepClick = (step: number) => {
    setGoToStep(step);
  };

  const handleStepChange = (step: number, correct: boolean) => {
    setAnsweredSteps((prev) => ({ ...prev, [step]: { correct } }));
  };

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-5">
          <div className="heading">
            <h2 className="mb-3">PTE Grammar Practice</h2>
          </div>
          <div className="grammerSection">
            <div className="row">
              <div className="col-md-4">
                <div className="grammerQuestion">
                  <AccordianQuestion
                    onStartQuiz={handleStartQuiz}
                    onShowLesson={() => setShowLesson(true)}
                  />
                </div>
              </div>
              <div className="col-md-8">
                {showLesson ? (
                  <Lesson />
                ) : (
                  <>
                    {stage === "select" && <SelectCard />}
                    {stage === "quiz" && (
                      <div className="card mb-0 p-3">
                        <Quiz
                          questions={questions}
                          onComplete={handleQuizComplete}
                          onStepChange={handleStepChange}
                          onRestart={handleRestart}
                          goToStep={goToStep}
                          setGoToStep={setGoToStep}
                        />
                        <StepProgress
                          totalSteps={questions.length}
                          currentStep={
                            goToStep || Object.keys(answeredSteps).length + 1
                          }
                          answeredSteps={answeredSteps}
                          onStepClick={handleStepClick}
                          onRestart={handleRestart}
                        />
                      </div>
                    )}
                    {stage === "score" && (
                      <Score onRestart={handleRestart} onReview={handleReview} />
                    )}
                    {stage === "review" && <ReviewCard />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammerPractice;
