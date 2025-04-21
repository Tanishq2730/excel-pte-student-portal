import React from "react";

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
  return (
    <div className="cardBtns">
      {questionData && (
        <>
          <button className="btn btn-outline-secondary py-1 rounded-pill">
            {questionData.difficulties.charAt(0).toUpperCase() +
              questionData.difficulties.slice(1)}
          </button>

          {questionData.new_question && (
            <button className="btn btn-outline-danger py-1 rounded-pill">
              New
            </button>
          )}

          {questionData.weekly && (
            <button className="btn btn-outline-info py-1 rounded-pill">
              Prediction
            </button>
          )}

          <button className="btn btn-outline-success py-1 rounded-pill">
            Attempted {questionData.attemptedCount}
          </button>

          <button className="btn btn-outline-light py-1 rounded-pill">
            {questionData.bookmarked ? (
              <i className="fa fa-bookmark"></i>
            ) : (
              <i className="fa fa-bookmark-o"></i>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default CardButton;
