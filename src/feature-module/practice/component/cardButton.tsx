import React, { useState } from "react";

interface QuestionData {
  difficulties: string;
  new_question?: boolean;
  weekly?: boolean;
  attemptedCount: number;
  bookmarked: boolean;
}

interface CardButtonProps {
  questionData: QuestionData | null;
}

const CardButton: React.FC<CardButtonProps> = ({ questionData }) => {
  const [isBookmarked, setIsBookmarked] = useState(
    questionData?.bookmarked ?? false
  );

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="cardBtns">
      {questionData && (
        <>
          <button
            className="btn btn-group py-1"
            style={{ background: "#ffbb8a47", color: "#000" }}
          >
            {questionData.difficulties.charAt(0).toUpperCase() +
              questionData.difficulties.slice(1)}
          </button>

          {questionData.new_question && (
            <button
              className="btn btn-group py-1"
              style={{ background: "#ff838333", color: "#000" }}
            >
              New
            </button>
          )}

          {questionData.weekly && (
            <button
              className="btn btn-group py-1"
              style={{ background: "#8ad9ff4d", color: "#000" }}
            >
              Prediction
            </button>
          )}

          <button
            className="btn btn-group py-1"
            style={{ background: "#6bff9133", color: "#000" }}
          >
            Attempted {questionData.attemptedCount}
          </button>

          <button
            className="btn btn-group py-1"
            style={{ background: "#ff838333", color: "#000" }}
            onClick={toggleBookmark}
          >
            {isBookmarked ? (
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 18V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H12C12.55 0 13.021 0.196 13.413 0.588C13.805 0.98 14.0007 1.45067 14 2V18L7 15L0 18Z"
                  fill="black"
                />
              </svg>
            ) : (
              // filled
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 18V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H12C12.55 0 13.021 0.196 13.413 0.588C13.805 0.98 14.0007 1.45067 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
                  fill="black"
                />
              </svg>
              // outlined
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default CardButton;
