import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Question {
  id: number;
  title: string;
  text: string;
  blanks: { placeholder: string; correctAnswer: string }[];
  userAnswers: string[];
  maxScore: number;
  userScore: number;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Stress Relief",
    text: "Want to find your way to stress relief? This recipe is for you: combine a passion for baking with the mindful practice of meditation. Studies show that baking can be a powerful tool for ",
    blanks: [
      { placeholder: "____", correctAnswer: "improving" },
      { placeholder: "____", correctAnswer: "moment" },
      { placeholder: "____", correctAnswer: "enhances" },
      { placeholder: "____", correctAnswer: "release" },
      { placeholder: "____", correctAnswer: "reduce" },
    ],
    userAnswers: ["improving", "duration", "enhances", "release", "reduce"],
    maxScore: 5,
    userScore: 4,
  },
  {
    id: 2,
    title: "Healthy Habits",
    text: "Maintaining good health requires dedication. Experts recommend ",
    blanks: [
      { placeholder: "____", correctAnswer: "exercising" },
      { placeholder: "____", correctAnswer: "hydration" },
    ],
    userAnswers: ["exercising", "nutrition"],
    maxScore: 2,
    userScore: 1,
  },
];

const Reading: React.FC = () => {
  const [remarks, setRemarks] = useState<{ [key: number]: string }>({});

  const handleRemarkChange = (id: number, value: string) => {
    setRemarks({ ...remarks, [id]: value });
  };

  return (
    <div className="container mt-4">
      {questions.map((question) => (
        <div key={question.id} className="card mb-4 shadow-sm p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              {question.id}. {question.title}
            </h5>
            <small className="text-muted">
              (Reading and Writing – Fill in the blanks)
            </small>
          </div>
          <div className="card-body">
            <p className="card-text d-inline">{question.text}</p>
            {question.blanks.map((blank, index) => (
              <span key={index} className="mx-2">
                <select
                  className={`form-select d-inline w-auto ${
                    question.userAnswers[index] === blank.correctAnswer
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  <option>{question.userAnswers[index]}</option>
                </select>
                <small className="text-primary">
                  {" "}
                  (Answer: {blank.correctAnswer})
                </small>
              </span>
            ))}
            <div className="alert alert-secondary mt-3">
              <strong>Score Info:</strong> {question.userScore} /{" "}
              {question.maxScore}
            </div>
            <div className="answer">
              <h5>Your Answer</h5>
              <p>improving,duration,enhances,release,reduce</p>
            </div>
            <div className="card mt-3">
              <div className="remark p-3">
                <h5 className="mb-2">Remark</h5>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reading;
