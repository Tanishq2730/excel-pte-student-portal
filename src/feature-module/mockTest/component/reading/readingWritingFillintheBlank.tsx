import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";

const ReadingWritingFillintheBlank: React.FC<{ question: any }> = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);
const [userAnswers, setUserAnswers] = useState<string[]>([]);


  const handleDropdownChange = (index: number, value: string) => {
    const updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  };

  const renderQuestionWithDropdowns = (): { __html: string } | undefined => {
      if (!question?.question) return undefined;
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(question.question, "text/html");
      const selects = Array.from(doc.querySelectorAll("select"));
  
      selects.forEach((select, index) => {
        const options = Array.from(select.querySelectorAll("option")).map(
          (opt) => opt.textContent || ""
        );
        const selectedValue = userAnswers[index] || "";
        const correctAnswer = correctAnswers[index];
  
        // Apply border style ONLY when showAnswer is true and a value is selected
        const borderClass =
          showAnswer && selectedValue
            ? selectedValue === correctAnswer
              ? "border-success text-success"
              : "border-danger text-danger"
            : "";
  
        const dropdown = (
          <select
            value={selectedValue}
            onChange={(e) => handleDropdownChange(index, e.target.value)}
            className={`form-select d-inline w-auto mx-1 align-baseline ${borderClass}`}
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
        );
  
        const wrapper = document.createElement("span");
        wrapper.innerHTML = ReactDOMServer.renderToStaticMarkup(dropdown);
        select.replaceWith(wrapper);
  
        // Only show the correct answer text when Answer button is clicked
        if (showAnswer) {
          const correctSpan = document.createElement("strong");
          correctSpan.textContent = ` ${correctAnswer}`;
          correctSpan.style.backgroundColor = "#d4edda"; // light green
          correctSpan.style.padding = "2px 6px";
          correctSpan.style.borderRadius = "4px";
          correctSpan.style.marginLeft = "4px";
          correctSpan.style.color = "#155724";
  
          wrapper.appendChild(correctSpan);
        }
      });
  
      return { __html: doc.body.innerHTML };
    };
  
    const correctAnswers = question?.answer_american?.split(",") || [];

  return (
    <div className="container mt-3">
      <p>
      There are some words missing in the following text. Please select the correct word in the drop-down box.
      </p>
      <div className="card p-3">
        <div
          className="innercontent"
          dangerouslySetInnerHTML={renderQuestionWithDropdowns()}
        />
      </div>
    </div>
  );
};

export default ReadingWritingFillintheBlank;
