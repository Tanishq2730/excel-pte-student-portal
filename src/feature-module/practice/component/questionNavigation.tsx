import React, { useState } from "react";

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
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleToggleChange = () => {
    setIsAnswerVisible(!isAnswerVisible);
    onAnswerClick(); // still trigger the answer action
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="btnBottom">
          {onSubmit && (
            <button className="btn btn-info" onClick={onSubmit}>
              Submit
            </button>
          )}
          <button className="btn btn-info mx-3" onClick={onRestart}>
            Re-Start
          </button>

          {/* Using your provided switch here */}
          <div className="form-check form-switch d-inline-block">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked={isAnswerVisible}
              onChange={handleToggleChange}
            />
            <label
              className="form-check-label ms-2"
              htmlFor="flexSwitchCheckChecked"
            >
              {isAnswerVisible ? "Hide Answer" : "Show Answer"}
            </label>
          </div>

        </div>
      </div>
      <div className="col-md-6">
        <div className="btnBottom text-end d-flex justify-content-end">
          <button className="btn btn-info" onClick={onPrevious}>
            Previous
          </button>
          <div className="mx-3">
            <select
              className="form-select bg-info text-white"
              aria-label="Default select example"
            >
              <option>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <button className="btn btn-info" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
