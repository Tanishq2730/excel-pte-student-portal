import React, { useState, useEffect } from "react";
import AccordianQuestion from "./accordianQuestion";
import SelectCard from "./selectCard";
import Quiz from "./quize";
import Score from "./score";
import ReviewCard from "./reviewCard";
import StepProgress from "./stepProgress";
import Lesson from "./Lesson";
import { fetchQuizQuestions } from "../../api/quizAPI";

const GrammerPractice: React.FC = () => {
  const [stage, setStage] = useState<"select" | "quiz" | "score" | "review">("select");
  const [answeredSteps, setAnsweredSteps] = useState<Record<number, { correct: boolean }>>({});
  const [goToStep, setGoToStep] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showLesson, setShowLesson] = useState(false);
const [selectedQuiz, setSelectedQuiz] = useState<{ id: number } | null>(null);

 const handleStartQuiz = async (quiz: { id: number }) => {
  setShowLesson(false);

  try {
    setSelectedQuiz(quiz);
    const res = await fetchQuizQuestions(quiz.id);
    if (res?.success) {
      
console.log(res.data);

      const formattedQuestions = res.data.map((q:any) => ({
        id: q.id,
        quizId: q.quiz_id,
        question: q.question_name,
        options: [q.option_1, q.option_2, q.option_3, q.option_4],
        correctAnswer: q.correct_option,
        description: q.description || '', // fallback if empty
      }));
      setQuestions(formattedQuestions || []);
      setStage("quiz");
    } else {
      console.error("Failed to fetch questions");
    }
  } catch (err) {
    console.error("API Error:", err);
  }
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
                    {stage === "score" && selectedQuiz && (
                      <Score onRestart={handleRestart} onReview={handleReview} quizId={selectedQuiz.id} />
                    )}
                    {stage === "review" && selectedQuiz && <ReviewCard quizId={selectedQuiz.id} />}
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
