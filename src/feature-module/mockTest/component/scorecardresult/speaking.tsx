import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Question {
  id: number;
  title: string;
  text: string;
  contentScore: number;
  fluencyScore: number;
  pronunciationScore: number;
  maxScore: number;
  userScore: number;
  recognition: string[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "Blood Pressure",
    text: "The correlation between elevated blood pressure levels and a multitude of health complications is widely acknowledged. However, recent studies have shed light on an equally concerning aspect. Researchers have discovered that these fluctuations in blood pressure can not only be detrimental to overall health but also act as a potential precursor to the development of dementia and vascular disease.",
    contentScore: 76.27,
    fluencyScore: 82.73,
    pronunciationScore: 77.01,
    maxScore: 90,
    userScore: 78.43,
    recognition: [
      "The correlation between elevated blood pressure levels and multitude of health complications is widely acknowledged however recent studies have shared light on the equally concerning aspects the subjects have discovered that these fluctuations in blood pressure cannot only be determined to overall health but also act as a potential precursor to the development of dementia and vascular disease",
    ],
  },
  {
    id: 2,
    title: "Heart Health",
    text: "Cardiovascular health is crucial for longevity. Studies indicate that maintaining a balanced diet and regular exercise can significantly reduce the risks associated with heart disease.",
    contentScore: 80.5,
    fluencyScore: 85.2,
    pronunciationScore: 79.6,
    maxScore: 90,
    userScore: 81.5,
    recognition: [
      "Cardiovascular health is crucial for longevity. Studies indicate that maintaining a balanced diet and regular exercise can significantly reduce the risks associated with heart disease.",
    ],
  },
];

const Speaking: React.FC = () => {
  const [remarks, setRemarks] = useState<{ [key: number]: string }>({});

  const handleRemarkChange = (id: number, value: string) => {
    setRemarks({ ...remarks, [id]: value });
  };

  return (
    <div className="container mt-4">
      {questions.map((question) => (
        <div key={question.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{question.id}. {question.title}</h2>
            <p className="card-text">{question.text}</p>
            <p className="text-muted">Your Answer:</p>
            <div className="bg-light p-2 rounded mb-3">
              <audio controls>
                <source src="#" type="audio/mpeg" />
              </audio>
            </div>
            <div className="row text-center my-4">
              <div className="col"><strong>Content:</strong> {question.contentScore} / {question.maxScore}</div>
              <div className="col"><strong>Fluency:</strong> {question.fluencyScore} / {question.maxScore}</div>
              <div className="col"><strong>Pronunciation:</strong> {question.pronunciationScore} / {question.maxScore}</div>
              <div className="col"><strong>Max Score:</strong> {question.maxScore} / <strong>Your Score:</strong> {question.userScore}</div>
            </div>
            {/* <p className="font-weight-bold mt-2">Max Score: {question.maxScore} | Your Score: {question.userScore}</p> */}
            <div className="d-flex align-items-center mb-2">
              <strong>AI Speech Recognition:</strong>
              <span className="ms-3 text-success"><strong>&#9679; Accurate</strong></span>
              <span className="ms-3 text-warning"><strong>&#9679; Average</strong></span>
              <span className="ms-3 text-danger"><strong>&#9679; Inaccurate</strong></span>
              <span className="ms-3 text-dark"><strong>/ Pause</strong></span>
            </div>
            <div className="alert alert-success mt-2" role="alert">
              {question.recognition}
            </div>
            <div className="card">
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

export default Speaking;