import React from "react";

interface StepProgressProps {
  totalSteps: number;
  currentStep: number;
  answeredSteps: Record<number, { correct: boolean }>;
  onStepClick: (step: number) => void;
  onRestart: () => void;
}

const StepProgress: React.FC<StepProgressProps> = ({
  totalSteps,
  currentStep,
  answeredSteps,
  onStepClick,
  onRestart,
}) => {
  return (
    <div className="card p-3 w-100 mb-0 mt-3">
      <div className="d-flex align-items-center flex-wrap gap-2">
        {[...Array(totalSteps)].map((_, i) => {
          const step = i + 1;
          const answered = answeredSteps[step];
          const isActive = currentStep === step;
          const borderColor = answered
            ? answered.correct
              ? "border-success"
              : "border-danger"
            : "border-secondary";
          return (
            <div
              key={i}
              className={`d-flex justify-content-center align-items-center rounded-circle border ${borderColor} ${
                isActive ? "bg-info text-white" : "bg-light text-dark"
              }`}
              style={{
                width: "50px",
                height: "50px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => onStepClick(step)}
            >
              {step}
            </div>
          );
        })}
      </div>
      <div>
        <button className="btn btn-primary mt-3" onClick={onRestart}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default StepProgress;
