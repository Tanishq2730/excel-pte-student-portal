import React, { useState } from "react";
import MockParaReorder from "../MockParaReorder";

const RedorderParagraph: React.FC<{ question: any }> = ({ question }) => {

    const [showAnswer, setShowAnswer] = useState(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [resetParaReorder, setResetParaReorder] = useState(false);

  return (
    <div className="container mt-3">
      <p>
        There are some words missing in the following text. Please select the
        correct word in the drop-down box.
      </p>
      <div className="card p-3">
        <MockParaReorder
          questionData={question}
          onAnswerChange={setAnswers}
          resetTrigger={resetParaReorder}
        />
      </div>
    </div>
  );
};

export default RedorderParagraph;   
