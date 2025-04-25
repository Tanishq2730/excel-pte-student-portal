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
  onSubmit?: () => void; // Optional
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questionData,
  onAnswerClick,
  onRestart,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="btnBottom">
          {onSubmit && (
            <button className="btn btn-info" onClick={onSubmit}>
              Submit
            </button>
          )}
          <button className="btn btn-info mx-3" onClick={onAnswerClick}>
            Answer
          </button>
          <button className="btn btn-info" onClick={onRestart}>
            Re-Start
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <div className="btnBottom text-end">
          <button className="btn btn-info mx-3" onClick={onPrevious}>
            Previous
          </button>
          <button className="btn btn-info" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
