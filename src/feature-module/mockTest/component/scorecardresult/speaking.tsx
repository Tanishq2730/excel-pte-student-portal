import React, { useState } from "react";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";

const removeHtmlEntities = (str: string) => {
  if (!str) return "";
  // Only replace HTML entities, keep the tags
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

interface QuestionDetails {
  question_name: string;
  question?: string;
  answer_american: string;
  answer_british?: string;
}

interface MockTestRow {
  Question: QuestionDetails;
}

interface Subtype {
  sub_name: string;
}

interface ScoreData {
  content: number;
  form?: number;
  grammar?: number;
  grammer?: number;
  spelling?: number;
  vocabulary?: number;
  wordCount?: number;
}

interface Question {
  id: number;
  title: string;
  text: string;
  scored_transcript: string;
  contentScore: number;
  fluency: number;
  pronunciation: number;
  maxScore: number;
  userScore: number;
  recognition: string[];
  score_data: any; // Using any temporarily to fix the type issue
  score?: number;
  total_score?: number;
  userAnswers?: string[];
  answer?: string;
  mocktest_row: MockTestRow;
  subtype?: Subtype;
}

interface dataProps {
  data: any;
}

const Speaking: React.FC<dataProps> = ({ data }) => {
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
        console.log("Question Data:", {
          mocktest: questionData.mocktest_row,
          answers: questionData.mocktest_row?.Question,
          transcript: questionData.scored_transcript,
        });

        let scores: Record<string, number> = {};

        try {
          const parsedScores = JSON.parse(
            questionData.score_data || "{}"
          ) as Partial<ScoreData>;
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
          ? questionData.answer.split(",").map((ans: string) => ans.trim())
          : [];

        return (
          <div key={questionData.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5>
                  Question {questionData.id}:{" "}
                  {questionData.mocktest_row.Question.question_name ||
                    "No Question"}
                </h5>
                <span className="badge bg-light text-primary">
                  {questionData.subtype?.sub_name || "No Subtype"}
                </span>
              </div>
              <div className="question mb-4">
                {questionData?.mocktest_row?.Question?.question && (
                  <p className="pt-0">
                    {parse(questionData.mocktest_row.Question.question)}
                  </p>
                )}
              </div>

              <img src={questionData.answer} />

              <h4 className="text-muted mb-3">Your Answer:</h4>
              <div style={{ marginLeft: "1em" }}>
                {questionData.subtype?.sub_name === "Describe Image" ||
                  (questionData.subtype?.sub_name === "Re-tell Lecture" && (
                    <ul className="innerasnwer mb-3">
                      {questionData.mocktest_row.Question.answer_american && (
                        <>
                          <li>
                            {parse(
                              removeHtmlEntities(
                                questionData.mocktest_row.Question
                                  .answer_american
                              )
                            )}
                          </li>
                          {questionData.mocktest_row.Question
                            .answer_british && (
                            <li>
                              {parse(
                                removeHtmlEntities(
                                  questionData.mocktest_row.Question
                                    .answer_british
                                )
                              )}
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  ))}
              </div>
              <div className="bg-light p-2 rounded mb-3">
                <audio controls>
                  <source src="#" type="audio/mpeg" />
                </audio>
              </div>
              <div className="row text-center my-4">
                <div className="col">
                  <strong>Content:</strong>{" "}
                  {questionData.score_data?.content || 0} /{" "}
                  {questionData.total_score}
                </div>
                <div className="col">
                  <strong>Fluency:</strong> {questionData.fluency || 0} /{" "}
                  {questionData.total_score}
                </div>
                <div className="col">
                  <strong>Pronunciation:</strong>{" "}
                  {questionData.pronunciation || 0} / {questionData.total_score}
                </div>
                <div className="col">
                  <strong>Max Score:</strong> {questionData.total_score} /{" "}
                  <strong>Your Score:</strong> {questionData.score}
                </div>
              </div>
              {/* <p className="font-weight-bold mt-2">Max Score: {question.maxScore} | Your Score: {question.userScore}</p> */}

              <div className="d-flex align-items-center mb-2">
                <strong>AI Speech Recognition:</strong>
                <span className="ms-3 text-success">
                  <strong>&#9679; Accurate :30</strong>
                </span>
                <span className="ms-3 text-warning">
                  <strong>&#9679; Average :40</strong>
                </span>
                <span className="ms-3 text-danger">
                  <strong>&#9679; Inaccurate :89</strong>
                </span>
                <span className="ms-3 text-dark">
                  <strong>/ Pause</strong>
                </span>
              </div>
              <div className="alert alert-success mt-2 mb-2">
                <p>{questionData.scored_transcript}</p>
              </div>
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

export default Speaking;
