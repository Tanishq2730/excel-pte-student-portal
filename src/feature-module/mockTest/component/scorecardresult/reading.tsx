import React from "react";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";

interface QuestionDetails {
  question_name: string;
  question: string;
  option_one?: string;
  option_two?: string;
  option_three?: string;
  option_four?: string;
  answer_american?: string;
  paragraphs?: string;
  [key: string]: string | undefined;
}

interface Question {
  id: number;
  mocktest_row?: {
    Question?: QuestionDetails;
  };
  subtype?: {
    sub_name: string;
  };
  text: string;
  score: number;
  total_score: number;
  score_data: string;
  userScore: number;
  maxScore: number;
  userAnswers?: string[];
  answer?: string;
}

interface ReadingProps {
  data: Question[];
}

const Reading: React.FC<ReadingProps> = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center p-5">
        <div className="text-muted">
          <i className="fas fa-book-reader fa-3x mb-3"></i>
          <p className="h5">No reading data available.</p>
        </div>
      </div>
    );
  }

  console.clear();
  console.log(data);
  console.log(JSON.stringify(data, null, 2));

  return (
    <div className="container mt-4">
      {data.map((questionData: Question) => {
        let scores: Record<string, number> = {};

        try {
          const parsedScores = JSON.parse(questionData.score_data || "{}");
          scores = {
            content: parsedScores.content ?? 0,
            form: parsedScores.form ?? 0,
            grammar: parsedScores.grammar ?? parsedScores.grammer ?? 0,
            spelling: parsedScores.spelling ?? 0,
            vocabulary: parsedScores.vocabulary ?? 0,
            wordCount: parsedScores.wordCount ?? 0,
          };
        } catch (e) {
          console.error(
            "Invalid score_data format for question",
            questionData.id,
            e
          );
        }

        const scoresArray = Object.entries(scores)
          .map(([category, score]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            score,
            maxScore: 2,
          }))
          .filter((score) => score.category.toLowerCase() !== "wordcount");

        const totalScore = questionData.score || 0;
        const maxScore = questionData.total_score || 20;
        const scorePercentage = (totalScore / maxScore) * 100;

        const userAnswerArray = questionData.userAnswers || [];
        const correctAnswerArray = questionData.answer
          ? questionData.answer.split(",").map((ans) => ans.trim())
          : [];

        return (
          <div key={questionData.id} className="card mb-4 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5>
                Question {questionData.id}:{" "}
                {questionData.mocktest_row?.Question?.question_name ||
                  "No Question"}
              </h5>
              <span className="badge bg-light text-primary">
                {questionData.subtype?.sub_name || "No Subtype"}
              </span>
            </div>
            <div className="card-body">
              <div className="question mb-4">
                {questionData?.mocktest_row?.Question?.question && (
                  <p className="pt-0">
                    {parse(questionData.mocktest_row.Question.question)}
                  </p>
                )}
              </div>

              {(questionData.subtype?.sub_name ===
                "MC, Select Multiple Answer" ||
                questionData.subtype?.sub_name ===
                  "Reading Fill in the Blanks" ||
                  questionData.subtype?.sub_name ===
                  "MC, Select Single Answer" ||
                questionData.subtype?.sub_name === "Re-order Paragraphs") && (
                <div className="missingword mb-4">
                  
                  <h5>Choice</h5>
                  <div className="choices-container">
                    {[
                      "option_one",
                      "option_two",
                      "option_three",
                      "option_four",
                      "option_five",
                    ].map((optionKey, index) => {
                      const optionValue =
                        questionData?.mocktest_row?.Question?.[optionKey];
                      if (!optionValue) return null;

                      const optionLabel = String.fromCharCode(65 + index); // Converts 0 to 'A', 1 to 'B', etc.
                      const userAnswer =
                        questionData.answer?.trim().toUpperCase() || "";
                      const correctAnswer =
                        questionData.mocktest_row?.Question?.answer_american
                          ?.trim()
                          .toUpperCase() || "";

                      // Check if this option is the one selected by user or the correct one
                      const isUserAnswer = optionLabel === userAnswer;
                      const isCorrectAnswer = optionLabel === correctAnswer;

                      let className = "p-3 rounded ";
                      if (isUserAnswer) {
                        className += "bg-success text-white"; // Correct answer is always green
                      } else if (isCorrectAnswer) {
                        className += "bg-danger text-white"; // User's wrong answer is red
                      } else {
                        className += "bg-light"; // Other options are light
                      }

                      return (
                        <div key={index} className="choice-item mb-2">
                          <p className={className}>
                            <strong className="me-2">{optionLabel}.</strong>
                            {parse(optionValue)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* <div className="mt-3">
                <h6>Score Breakdown:</h6>
                <div className="row">
                  {scoresArray.map((scoreItem, index) => (
                    <div key={index} className="col-md-4 mb-2">
                      <div className="d-flex justify-content-between">
                        <span>{scoreItem.category}:</span>
                        <span>{scoreItem.score}/{scoreItem.maxScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* <div className="alert alert-info mt-3">
                <strong>Total Score:</strong> {totalScore} / {maxScore} ({scorePercentage.toFixed(1)}%)
              </div> */}

              <div className="answer mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Score Info</h5>
                  <span>
                    {totalScore}/{maxScore}
                  </span>
                </div>
                <p className="border p-2 rounded bg-light">
                  {questionData.answer || "No answer provided"}
                </p>
                {/* <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">Your Response</h6>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled">
                          {userAnswerArray.map((answer, idx) => (
                            <li
                              key={idx}
                              className={`mb-2 ${
                                answer === correctAnswerArray[idx]
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {answer || "No answer provided"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">Correct Answers</h6>
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled">
                          {correctAnswerArray.map((answer, idx) => (
                            <li key={idx} className="mb-2 text-success">
                              {answer}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="card mt-3">
                <div className="remark p-3">
                  <h5 className="mb-2">Remark</h5>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reading;
