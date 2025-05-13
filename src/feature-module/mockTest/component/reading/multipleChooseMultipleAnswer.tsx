import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from 'react-router-dom';
interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
}

const MultipleChooseMultipleAnswer: React.FC<getProps> = ({ question, setAnswer, registerSubmit }) => {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const { id,session_id } = useParams<{ id: string,session_id:any }>(); 

  const options = [
    { id: "A", text: question?.option_one },
    { id: "B", text: question?.option_two },
    { id: "C", text: question?.option_three },
    { id: "D", text: question?.option_four },
    { id: "E", text: question?.option_five },
  ].filter((option) => option.text?.trim() !== "");

  const handleCheckboxChange = (optionId: string) => {
    setCheckedOptions((prevChecked) => {
      if (prevChecked.includes(optionId)) {
        return prevChecked.filter((id) => id !== optionId); // uncheck
      } else {
        return [...prevChecked, optionId]; // check
      }
    });
  };

   useEffect(() => {
    setCheckedOptions([]); // Reset selection on question change
  }, [question]);

  useEffect(() => {
    registerSubmit(handleSubmit); // Register new submit function on change
  }, [question, checkedOptions]);
  
  const handleSubmit = () => {
    console.log(question, "question");
      if (!checkedOptions) {
        return false;
      }
  
      const correctAnswer = question?.answer_american || "";
      const correctAnswers = correctAnswer.split(",").map((a: string) => a.trim());
      let user_answer = checkedOptions.join(",").trim();

      const isCorrect =
        checkedOptions.length === correctAnswers.length &&
        checkedOptions.every((ans) => correctAnswers.includes(ans));

      const score = isCorrect ? 1 : 0;
      const totalscore = correctAnswers.length;
  
      const score_data = {
        user_answer: checkedOptions,
        correct_answer: correctAnswers,
        score,
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
  
      // Instead of calling setAnswer directly, we'll return the answer as an object
      return payload;
    };
  
 


  return (
    <div className="container mt-3">
      <p>
        In the text below some words are missing. Drag words from the box below
        to the appropriate place in the text.
      </p>
      <div className="row">        
        <div className="col-md-12">
          <div className="card p-3">
            <div className="card-header">
              <div className="card-title">
                <div
                  dangerouslySetInnerHTML={{
                    __html: question.question,
                  }}
                />
              </div>
            </div>
            <div className="card-body">
              <div className="col-12 col-md-12">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="col-12 col-md-12"
                  >
                    <div className="d-flex align-items-start border rounded p-3 h-100">
                      <input
                        type="checkbox"
                        className="form-check-input m-auto me-3"
                        id={`option-${option.id}`}
                        checked={checkedOptions.includes(
                          option.id
                        )}
                        onChange={() =>
                          handleCheckboxChange(option.id)
                        }
                      />
                      <label
                        htmlFor={`option-${option.id}`}
                        className="d-flex align-items-center w-100"
                      >
                        <div
                          className="me-3 d-flex justify-content-center align-items-center bg-primary text-white fw-bold rounded"
                          style={{
                            width: "30px",
                            height: "30px",
                            minWidth: "30px",
                          }}
                        >
                          {option.id}
                        </div>
                        <span>{option.text}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChooseMultipleAnswer;
