import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveQuizQuestions } from '../../api/quizAPI';
interface Question {
  id: number;
  quizId: number;
  question: string;
  options: string[];
  correctAnswer: string;
  description: string;
}

interface QuizProps {
  questions: Question[];
  onComplete: () => void;
  onStepChange: (index: number, correct: boolean) => void;
  onRestart: () => void;
  goToStep: number | null;
  setGoToStep: (index: number | null) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onStepChange, onRestart, goToStep, setGoToStep }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(30);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let interval: number;
    if (timer > 0 && !isAnswered) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isAnswered]);

  useEffect(() => {
    if (goToStep !== null) {
      setCurrentQuestionIndex(goToStep - 1);
      setSelectedOption('');
      setIsAnswered(false);
      setTimer(30);
      setGoToStep(null);
    }
  }, [goToStep]);

  const handleOptionClick = async (option: string) => {
    // if (!isAnswered) {
    //   setSelectedOption(option);
    //   setIsAnswered(true);
    //   onStepChange(currentQuestionIndex + 1, option === currentQuestion.correctAnswer);
    // }
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);

      const isCorrect = option === currentQuestion.correctAnswer;
        onStepChange(currentQuestionIndex + 1, isCorrect);
        const quizId = currentQuestion.quizId;
        const QuestionId = currentQuestion.id;
        const payload = {selected_option:option}
      // Call your API here
      try {
        const response =  await saveQuizQuestions(quizId,QuestionId,payload);
        console.log(response);
        
      } catch (error) {
        console.error('Error saving answer:', error);
      }
    }
  };

  const handleNext = () => {
    setSelectedOption('');
    setIsAnswered(false);
    setTimer(30);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };
console.log(currentQuestion);

  return (
    <div className="containers">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Question {currentQuestionIndex + 1}</h5>
        <div className="timer">Time: {timer} sec</div>
      </div>
      <p className="mt-3 text-start">{currentQuestion.question}</p>
      <div className="list-group">
        {currentQuestion?.options?.map((option, index) => {
          let className = 'list-group-item text-start';
          if (isAnswered) {
            if (option === currentQuestion.correctAnswer) {
              className += ' bg-success text-white';
            } else if (option === selectedOption) {
              className += ' bg-danger text-white';
            }
          }
          return (
            <label key={index} className={className} style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="quiz-option"
                value={option}
                onChange={() => handleOptionClick(option)}
                checked={selectedOption === option}
                disabled={isAnswered}
                className="me-2"
              />
              {option}
            </label>
          );
        })}
      </div>

      {isAnswered && (
        <>
          <div className="card mt-3">
            <div className="card-body">
              <p>{currentQuestion.description}</p>
            </div>
          </div>

          <button className="btn btn-primary mt-2" onClick={handleNext}>
            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;