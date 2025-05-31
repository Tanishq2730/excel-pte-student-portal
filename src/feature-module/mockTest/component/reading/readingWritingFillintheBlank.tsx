import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
}

const ReadingWritingFillintheBlank: React.FC<getProps> = ({ question, setAnswer, registerSubmit }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const { id, session_id } = useParams<{ id: string; session_id: any }>();

  const correctAnswers = question?.answer_american?.split(",") || [];

  useEffect(() => {
    setUserAnswers([]); // Reset on question change
  }, [question]);

  useEffect(() => {
    registerSubmit(handleSubmit);
  }, [question, userAnswers]);

  const handleDropdownChange = (index: number, value: string) => {
    const updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  };

  const handleSubmit = () => {
    if (!userAnswers || userAnswers.length === 0) {
      return false;
    }

    let answer = (question?.answer_american || "").trim();
    let user_answer = userAnswers.join(",").trim();

    let answer_arr = answer.split(",");
    let user_answer_arr = user_answer.split(",");

    let totalscore = answer_arr.length;
    let score = 0;

    const resultDetails = [];

    score += answer_arr.reduce((acc: any, correctAns: any, index: any) => {
      const trimmedCorrect = correctAns.trim();
      const userAns = user_answer_arr[index]?.trim() || "";

      const isCorrect = trimmedCorrect === userAns;
      resultDetails.push({
        userAnswer: userAns,
        correctAnswer: trimmedCorrect,
        isCorrect,
      });

      return acc + (isCorrect && 1);
    }, 0);

    const score_data = {
      user_question: question.question,
      user_answer: userAnswers,
      answer: correctAnswers,
    };

    const payload = {
      questionId: question.id,
      mocktest_id: id,
      sessionId: session_id,
      totalscore,
      lateSpeak: 1,
      score,
      score_data: JSON.stringify(score_data),
      answer: user_answer,
    };

    return payload;
  };

  const renderParsedQuestion = () => {
    if (!question?.question) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(question.question, "text/html");
    const elements = Array.from(doc.body.childNodes);

    let dropdownIndex = 0;

    const renderNode = (node: ChildNode, key: number): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if ((node as HTMLElement).tagName === "SELECT") {
        const selectElement = node as HTMLSelectElement;
        const options = Array.from(selectElement.options).map((opt) => opt.textContent || "");

        const selectedValue = userAnswers[dropdownIndex] || "";
        const correctAnswer = correctAnswers[dropdownIndex];

        const isCorrect = selectedValue === correctAnswer;
        const borderClass = showAnswer && selectedValue
          ? isCorrect ? "border-success text-success" : "border-danger text-danger"
          : "";

        const index = dropdownIndex++;

        return (
          <span key={key} className="d-inline-block mx-1">
            <select
              value={selectedValue}
              onChange={(e) => handleDropdownChange(index, e.target.value)}
              className={`form-select d-inline w-auto align-baseline ${borderClass}`}
            >
              <option value="" disabled>
                Select
              </option>
              {options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {showAnswer && (
              <strong style={{
                backgroundColor: "#d4edda",
                padding: "2px 6px",
                borderRadius: "4px",
                marginLeft: "4px",
                color: "#155724"
              }}>
                {correctAnswer}
              </strong>
            )}
          </span>
        );
      }

      const children = Array.from(node.childNodes).map((child, i) => renderNode(child, i));
      return <span key={key}>{children}</span>;
    };

    return <>{elements.map((el, i) => renderNode(el, i))}</>;
  };

  return (
    <div className="container mt-3">
      <p className="mockHead mb-4">
      There are some words missing in the following text. Please select the correct word in the drop-down box.
      </p>
      <div className="card p-3 readingFib">
        <div className="innercontent">{renderParsedQuestion()}</div>
      </div>
    </div>
  );
};

export default ReadingWritingFillintheBlank;
