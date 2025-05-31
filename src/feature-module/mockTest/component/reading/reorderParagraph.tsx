import React, { useState, useEffect } from "react";
import MockParaReorder from "../MockParaReorder";
import { useParams } from "react-router-dom";

interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => any) => void;
}

const RedorderParagraph: React.FC<getProps> = ({
  question,
  setAnswer,
  registerSubmit,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resetParaReorder, setResetParaReorder] = useState(false);
  const { id, session_id } = useParams<{ id: string; session_id: any }>();

  const correctAnswers = question?.answer_american?.split(",") || [];

  useEffect(() => {
    registerSubmit(handleSubmit);
  }, [answers, question]);

  const handleSubmit = () => {
    if (!answers || answers.length === 0) return false;

    const answerArray = [...answers];
    const userAnswerStr = answerArray.join(",");
    const correctAnswerStr = correctAnswers.join(",");

    let score = 0;
    const totalscore = correctAnswers.length - 1;
    const user_answer_arr = userAnswerStr.trim().split(",");

    let matchingPairs = 0;

    for (let i = 0; i < totalscore; i++) {
      if (correctAnswers[i] && correctAnswers[i + 1]) {
        const pair1 = `${correctAnswers[i]},${correctAnswers[i + 1]}`;
        for (let j = 0; j < user_answer_arr.length - 1; j++) {
          const ypair = `${user_answer_arr[j]},${user_answer_arr[j + 1]}`;
          if (pair1 === ypair) {
            matchingPairs++;
          }
        }
      }
    }

    score = matchingPairs;

    const score_data = {
      user_question: question?.question || "",
      user_answer: userAnswerStr,
      answer: correctAnswers,
    };

    const payload = {
      questionId: question?.id,
      mocktest_id: id,
      sessionId: session_id,
      totalscore: totalscore,
      lateSpeak: 1,
      timeSpent: 0, // Replace with actual if tracked
      score,
      score_data: JSON.stringify(score_data),
      answer: userAnswerStr,
    };

    // Pass back the answer if needed
    setAnswer(payload);
    return payload;
  };

  return (
    <div className="container mt-3">
      <p className="mockHead">
        The text boxes in the left panel have been placed in a random order.
        Restore the original order by dragging the text boxes from the left
        panel to the right panel.
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
