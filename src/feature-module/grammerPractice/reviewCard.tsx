import React from "react";

const ReviewCard = () => {
  const answers = [
    {
      question: "Question 1",
      sentence: "The movie was ______ entertaining; I loved it.",
      selected: "extreme",
      correctAnswer: "extremely",
      options: ["extremely", "extreme", "extremity", "more extreme"],
    },
    {
      question: "Question 2",
      sentence: "He is ______ talented at painting.",
      selected: "extremely",
      correctAnswer: "extremely",
      options: ["extremely", "extreme", "extremity", "very extreme"],
    },
  ];

  return (
    <div className="p-3 bg-light rounded">
      {answers.map((ans, i) => {
        return (
          <div key={i} className="mb-4 p-4 bg-white rounded shadow-sm border">
            <h5>{ans.question}</h5>
            <p>
              {ans.sentence.split("______").map((part, index, arr) =>
                index === arr.length - 1 ? (
                  part
                ) : (
                  <span key={index}>
                    {part}
                    <span className="underline mx-1">______</span>
                  </span>
                )
              )}
            </p>
            <div>
              {ans.options.map((option, idx) => {
                const isSelected = option === ans.selected;
                const isCorrect = option === ans.correctAnswer;
                const wrongSelection = isSelected && !isCorrect;

                return (
                  <div key={idx} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      disabled
                      checked={isSelected}
                    />
                    <label
                      className={`form-check-label ${
                        wrongSelection
                          ? "text-danger fw-bold"
                          : isSelected && isCorrect
                          ? "text-success fw-bold"
                          : ""
                      }`}
                    >
                      {option}
                      {wrongSelection && <span className="ms-2">❌</span>}
                      {isSelected && isCorrect && <span className="ms-2">✅</span>}
                    </label>
                  </div>
                );
              })}
            </div>
            {ans.selected !== ans.correctAnswer && (
              <p className="mt-2">
                <strong>Correct answer:</strong>{" "}
                <span className="text-success">{ans.correctAnswer}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCard;
