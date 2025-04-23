import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const questions = [
  {
    question: "The movie was _____ entertaining; I loved it.",
    options: ["extremely", "extreme", "extremity", "more extreme"],
    correctAnswer: "extremely",
    description: "'Extremely' is the correct adverb modifying 'entertaining'."
  },
  {
    question: "She sings _____ than her sister.",
    options: ["good", "better", "best", "well"],
    correctAnswer: "better",
    description: "'Better' is the comparative form of 'well'."
  },
  {
    question: "I will call you when he _____ here.",
    options: ["will come", "comes", "came", "coming"],
    correctAnswer: "comes",
    description: "In time clauses with 'when', use the present simple to refer to the future."
  },
  {
    question: "This is the place _____ we met.",
    options: ["where", "which", "that", "what"],
    correctAnswer: "where",
    description: "'Where' is used to refer to places."
  },
  {
    question: "He is the man _____ car was stolen.",
    options: ["which", "whose", "who", "whom"],
    correctAnswer: "whose",
    description: "'Whose' is the possessive form used for people."
  },
];

const Quiz = () => {
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

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
    }
  };

  const handleNext = () => {
    setSelectedOption('');
    setIsAnswered(false);
    setTimer(30);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Question {currentQuestionIndex + 1}</h5>
        <div className="timer">Time: {timer} sec</div>
      </div>
      <p className="mt-3 text-start">{currentQuestion.question}</p>
      <div className="list-group">
        {currentQuestion.options.map((option, index) => {
          let className = 'list-group-item text-start';
          if (isAnswered) {
            if (option === selectedOption) {
              className +=
                option === currentQuestion.correctAnswer ? ' bg-success text-white' : ' bg-danger text-white';
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
        <div className="card mt-3">
          <div className="card-body">
            <p>{currentQuestion.description}</p>
          </div>
        </div>
      )}

      {isAnswered && currentQuestionIndex < questions.length - 1 && (
        <button className="btn btn-primary mt-3" onClick={handleNext}>
          Next Question
        </button>
      )}

      {isAnswered && currentQuestionIndex === questions.length - 1 && (
        <div className="alert alert-success mt-3">Quiz Complete!</div>
      )}
    </div>
  );
};

export default Quiz;
