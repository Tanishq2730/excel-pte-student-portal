import React, { useEffect, useState } from "react";
import { fetchScores } from "../../api/quizAPI";

interface ScoreProps {
  onRestart: () => void;
  onReview: () => void;
  quizId: number;
}

interface ScoreData {
  total_questions: number;
  time_taken: number;
  correct: number;
  incorrect: number;
  percentage_correct: string;
  questions: { id: number; status: string }[];
}

const Score: React.FC<ScoreProps> = ({ onRestart, onReview, quizId }) => {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);

  useEffect(() => {
    const loadData = async (quizId: number) => {
      const res = await fetchScores(quizId);
      if (res?.success) {
        setScoreData(res.data);
      }
    };
    loadData(quizId);
  }, [quizId]);

  if (!scoreData) {
    return <div>Loading score...</div>;
  }

  const percentage = parseFloat(scoreData.percentage_correct);

  return (
    <div
      className="container p-3"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div className="row">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          {/* Score Circle */}
          <div
            className="position-relative d-flex align-items-center justify-content-center"
            style={{ width: 150, height: 150 }}
          >
            <svg width="150" height="150">
              <circle cx="75" cy="75" r="65" stroke="#ddd" strokeWidth="20" fill="none" />
              <circle
                cx="75"
                cy="75"
                r="65"
                stroke="#007bff"
                strokeWidth="20"
                fill="none"
                strokeDasharray="408"
                strokeDashoffset={408 - (408 * percentage) / 100}
                strokeLinecap="round"
                transform="rotate(-90 75 75)"
              />
            </svg>
            <div className="position-absolute text-primary fs-3 fw-bold">
              {scoreData.percentage_correct}%
            </div>
          </div>
          <div className="bg-primary-subtle p-2 mt-3 w-100 text-center rounded">
            Avg time:{" "}
            <strong>
              {scoreData.total_questions > 0
                ? Math.round(scoreData.time_taken / scoreData.total_questions)
                : 0}{" "}
              sec
            </strong>
          </div>
          <div className="bg-primary-subtle p-2 mt-2 w-100 text-center rounded">
            Total questions: <strong>{scoreData.total_questions}</strong>
          </div>
        </div>

        <div className="col-md-8 d-flex flex-column justify-content-center">
          <div
            className="p-4 mb-3"
            style={{ backgroundColor: "#fff3cd", borderRadius: "10px" }}
          >
            <p className="mb-4 fw-semibold text-center">
              Don't get frustrated, keep practicing and you can get 100% too!
            </p>
            <div className="border border-success rounded-pill px-3 py-2 mb-3 d-flex justify-content-between align-items-center">
              <span className="text-success">
                <i className="bi bi-check-circle-fill me-2 text-success"></i>
                Correct
              </span>
              <span className="text-success fw-bold">{scoreData.correct}</span>
            </div>
            <div className="border border-danger rounded-pill px-3 py-2 d-flex justify-content-between align-items-center">
              <span className="text-danger">
                <i className="bi bi-x-circle-fill me-2 text-danger"></i>
                Incorrect
              </span>
              <span className="text-danger fw-bold">{scoreData.incorrect}</span>
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-start">
            <button className="btn btn-primary px-4 text-white" onClick={onReview}>
              Review
            </button>
            <button className="btn btn-danger px-4" onClick={onRestart}>
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
