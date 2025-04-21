import React from "react";

interface QuestionData {
  difficulties: string;
  new_question?: boolean;
  weekly?: boolean;
  attemptedCount: number;
  bookmarked: boolean;
}

interface QuestionNavigationProps {
  questionData: QuestionData | null;
  onAnswerClick: () => void;
  onRestart: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questionData,
  onAnswerClick,
  onRestart,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="btnBottom">
          <button className="btn btn-outline-secondary">Submit</button>
          <button className="btn btn-outline-secondary mx-3" onClick={onAnswerClick}>
            Answer
          </button>
          <button className="btn btn-outline-secondary" onClick={onRestart}>
            Re-Start
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <div className="btnBottom text-end">
          <button className="btn btn-outline-secondary mx-3" onClick={onPrevious}>
            Previous
          </button>
          <button className="btn btn-outline-secondary" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
