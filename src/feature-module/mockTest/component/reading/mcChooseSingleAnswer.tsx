import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from 'react-router-dom';
interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
}

const McChooseSingleAnswer: React.FC<getProps> = ({ question, setAnswer, registerSubmit }) => {
  //console.log("question", question);
  const [checkedOptions, setCheckedOptions] = useState<string | null>(null);
  const timeStartRef = useRef(Date.now());
  const { id,session_id } = useParams<{ id: string,session_id:any }>(); 
 
  const options = [
    { id: "A", text: question?.option_one },
    { id: "B", text: question?.option_two },
    { id: "C", text: question?.option_three },
    { id: "D", text: question?.option_four },
    { id: "E", text: question?.option_five },
  ].filter((option) => option.text?.trim() !== "");

  const handleChange = (optionId: string) => {
    setCheckedOptions(optionId);
  };

 const handleSubmit = () => {
    if (!checkedOptions) {
      return false;
    }

    const correctAnswer = question?.answer_american || "";
    const correctAnswers = correctAnswer.split(",");
    const isCorrect = correctAnswers.includes(checkedOptions);
    const score = isCorrect ? 1 : 0;
    const totalscore = correctAnswers.length;

    const score_data = {
      user_answer: checkedOptions,
      correct_answer: correctAnswers,
      score,
    };

    const timeSpent = Math.floor((Date.now() - timeStartRef.current) / 1000);

    const payload = {
      questionId: question.id,
      mocktest_id: id,
      sessionId: session_id,
      totalscore,
      lateSpeak: 1,
      score,
      score_data: JSON.stringify(score_data),
      answer: checkedOptions,
    };

    // Instead of calling setAnswer directly, we'll return the answer as an object
    return payload;
  };

    useEffect(() => {
      setCheckedOptions(null); // Reset selection on question change
    }, [question]);
    useEffect(() => {
      registerSubmit(handleSubmit); // Register new submit function on change
    }, [question, checkedOptions]);
  

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
                    <div
                      className={`d-flex align-items-center border rounded p-3 h-100 ${checkedOptions === option.id
                          ? "border-primary"
                          : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="mcq-option"
                        className="form-check-input m-auto me-3"
                        id={`option-${option.id}`}
                        checked={
                          checkedOptions === option.id
                        }
                        onChange={() =>
                          handleChange(option.id)
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

export default McChooseSingleAnswer;
