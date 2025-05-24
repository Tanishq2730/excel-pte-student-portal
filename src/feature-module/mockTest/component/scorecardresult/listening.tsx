import parse, { DOMNode, Element } from "html-react-parser";
import React, { useState } from "react";

interface dataProps {
  data: any;
}

const Listening: React.FC<dataProps> = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center p-5">
        <div className="text-muted">
          <i className="fas fa-file-alt fa-3x mb-3"></i>
          <p className="h5">No writing data available.</p>
        </div>
      </div>
    );
  }
  console.clear();
  console.log(data);
  console.log(JSON.stringify(data, null, 2));

  return (
    <div className="container mt-4">
      {data.map((questionData: any, index: number) => {
        let scores: Record<string, number> = {};

        try {
          scores = JSON.parse(questionData.score_data || "{}");
        } catch (e) {
          console.error("Invalid score_data format", e);
        }

        // Ensure scores object has all required properties
        scores = {
          content: scores.content ?? 0,
          form: scores.form ?? 0,
          grammar: scores.grammar ?? scores.grammer ?? 0,
          spelling: scores.spelling ?? 0,
          vocabulary: scores.vocabulary ?? 0,
          wordCount: scores.wordCount ?? 0,
        };

        // Convert scores object to array format for rendering
        const scoresArray = Object.entries(scores)
          .map(([category, score]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            score: score,
            maxScore: 2, // Default max score, adjust if needed
          }))
          .filter((score) => score.category !== "WordCount"); // Exclude wordCount from display

        const totalScore = questionData.score || 0;
        const maxScore = questionData.total_score || 20; // Default max score
        const scorePercentage = (totalScore / maxScore) * 100;

        console.log(scoresArray);
        // Handle title which might be an object
        const titleText =
          typeof questionData.title === "object"
            ? questionData.title.name || "Question" // assuming the object has a name property
            : questionData.title || "Question";

        // Handle type which might be an object
        const typeText =
          typeof questionData.type === "object"
            ? questionData.type.name || "Listening"
            : questionData.type || "Listening";

        return (
          <div key={index} className="card mb-4 shadow-sm p-3">
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
              {questionData.subtype.sub_name === "Fill in the Blanks" &&
                questionData.mocktest_row?.Question?.speak_audio_file && (
                  <audio controls className="w-100 mb-3">
                    <source
                      src={
                        questionData.mocktest_row?.Question?.speak_audio_file
                      }
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              <div className="question mb-4">
                {questionData?.mocktest_row?.Question?.question && (
                  <p className="pt-0">
                    {parse(questionData.mocktest_row?.Question?.question || "")}
                  </p>
                )}
              </div>

              {questionData.subtype.sub_name ===
                "Highlight Correct Summary" && (
                <div className="highlighted-word">
                  <h5>Choice</h5>
                  <div className="d-flex gap-2 flex-wrap">
                    {[
                      "option_one",
                      "option_two",
                      "option_three",
                      "option_four",
                    ].map((optionKey, index) => {
                      const optionValue =
                        questionData?.mocktest_row?.Question?.[optionKey];
                      const optionLabel = String.fromCharCode(65 + index); // Converts 0,1,2,3 to A,B,C,D
                      const answer = questionData.answer?.toUpperCase() || "";
                      const isCorrectAnswer = answer === optionLabel;
                      console.log(
                        "Option Label:",
                        optionLabel,
                        "Answer:",
                        answer,
                        "Is Match:",
                        isCorrectAnswer
                      );
                      return optionValue ? (
                        <div key={index}>
                          <p
                            className={`p-2 mb-1 ${
                              isCorrectAnswer
                                ? "bg-danger text-white rounded"
                                : ""
                            }`}
                          >
                            <span>{optionLabel}.</span> {optionValue}
                          </p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              {questionData.subtype.sub_name === "Select Missing Word" && (
                <div className="missingword mb-4">
                  <h5>Choice</h5>
                  <div className="d-flex gap-2 flex-wrap">
                    {[
                      "option_one",
                      "option_two",
                      "option_three",
                      "option_four",
                    ].map((optionKey, index) => {
                      const optionValue =
                        questionData?.mocktest_row?.Question?.[optionKey];
                      const optionLabel = String.fromCharCode(65 + index);
                      const userAnswer =
                        questionData.answer?.toUpperCase() || "";
                      const correctAnswer =
                        questionData.mocktest_row?.Question?.answer_american?.toUpperCase() ||
                        "";
                      const isUserAnswer = userAnswer === optionLabel;
                      const isCorrectAnswer = correctAnswer === optionLabel;

                      return optionValue ? (
                        <div key={index}>
                          <p
                            className={`p-2 mb-1 ${
                              isCorrectAnswer
                                ? "bg-success text-white rounded"
                                : ""
                            } ${
                              isUserAnswer && !isCorrectAnswer
                                ? "bg-danger text-white rounded"
                                : ""
                            }`}
                          >
                            <span>{optionLabel}.</span> {optionValue}
                          </p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {(questionData.subtype.sub_name === "Highlight Correct Summary" ||
                questionData.subtype.sub_name === "Select Missing Word") &&
                scoresArray.length > 0 && (
                  <div className="card p-3">
                    <div className="scoreInfo">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Score Information</h4>
                        <span>
                          {questionData.total_score}/{questionData.total_score}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Answer</h5>
                        <p
                          className="pt-1"
                          style={{ textTransform: "capitalize" }}
                        >
                          {questionData.mocktest_row?.Question?.answer_american}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Your Answer</h5>
                        <p className="pt-1">{questionData.answer}</p>
                      </div>
                    </div>
                  </div>
                )}

              {questionData.subtype.sub_name === "Summarize Spoken Text" &&
                scoresArray.length > 0 && (
                  <table className="table table-bordered mt-3">
                    <tbody>
                      {scoresArray.map((score, idx) => (
                        <tr key={idx}>
                          <td>{score.category}:</td>
                          <td>
                            {score.score} / {score.maxScore}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              {questionData.subtype.sub_name === "Summarize Spoken Text" &&
                scoresArray.length > 0 && (
                  <div className="alert alert-secondary">
                    <strong>Max Score:</strong> {maxScore} &nbsp;{" "}
                    <strong>Your Score:</strong> {totalScore}
                  </div>
                )}
              {questionData.subtype.sub_name === "Fill in the Blanks" &&
                scoresArray.length > 0 && (
                  <div className="card p-3">
                    <div className="scoreInfo">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Score Information</h4>
                        <span>
                          {questionData.total_score}/{questionData.total_score}
                        </span>
                      </div>
                      <h5 className="mb-0">Your Answer</h5>
                      <p className="pt-1">
                        {questionData.mocktest_row?.Question?.answer_american}
                      </p>
                    </div>
                  </div>
                )}

              {questionData.summary && (
                <p className="mt-3">
                  {(typeof questionData.summary === "string"
                    ? questionData.summary
                    : String(questionData.summary)
                  )
                    .split(" ")
                    .map((word: string, wordIndex: number) => (
                      <span
                        key={wordIndex}
                        className={
                          word ===
                          (typeof questionData.highlightedWord === "string"
                            ? questionData.highlightedWord
                            : "")
                            ? "text-danger fw-bold"
                            : ""
                        }
                      >
                        {word} &nbsp;
                      </span>
                    ))}
                </p>
              )}

              <div className="card">
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

export default Listening;
