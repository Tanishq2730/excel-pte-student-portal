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
          <button className="btn btn-group py-1" style={{background:'#ffbb8a47',color:'#000'}}>
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

          <button className="btn btn-group py-1" style={{background:'#6bff9133',color:'#000'}}>
            Attempted {questionData.attemptedCount}
          </button>

          <button className="btn btn-group py-1" style={{background:'ff838333',color:"#000"}}>
            {questionData.bookmarked ? (
              <i className="fe fe-bookmark"></i>
            ) : (
              <i className="fa fa-bookmark"></i>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default CardButton;
