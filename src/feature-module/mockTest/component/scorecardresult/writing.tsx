import React from "react";

interface dataProps {
  data: any;
}

const Writing: React.FC<dataProps> = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-muted">No writing data available.</p>;
  }

  return (
    <div className="container mt-4">
      {data.map((writingData: any, index: number) => {
        let scores: Record<string, number> = {};

        try {
          scores = JSON.parse(writingData.score_data);
        } catch (e) {
          console.error("Invalid score_data format", e);
        }
        scores = {
          content: scores.content ?? 0,
          form: scores.form ?? 0,
          grammar: scores.grammar ?? scores.grammer ?? 0,
          spelling: scores.spelling ?? 0,
          vocabulary: scores.vocabulary ?? 0,
          wordCount: scores.wordCount ?? 0,
        };

        return (

          <div key={writingData.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title">
                  {writingData.id}.{" "}
                  {writingData.mocktest_row?.Question?.question_name || "No Question"}
                </h2>
                <button className="btn btn-outline-primary">
                  {writingData.subtype?.sub_name || "No Subtype"}
                </button>
              </div>

              <p className="card-text mt-3" style={{ whiteSpace: "pre-line" }}>
                <strong>Your Answer:</strong> {writingData.answer}
              </p>

              <div className="row text-center my-4">
                <div className="col">
                  <strong>Content:</strong> {scores.content} / 2
                </div>
                <div className="col">
                  <strong>Form:</strong> {scores.form} / 2
                </div>
                <div className="col">
                  <strong>Grammar:</strong> {scores.grammar} / 2
                </div>
                <div className="col">
                  <strong>Spelling:</strong> {scores.spelling} / 2
                </div>
                <div className="col">
                  <strong>Vocabulary:</strong> {scores.vocabulary} / 2
                </div>
                <div className="col">
                  <strong>Word Count:</strong> {scores.wordCount}
                </div>
                <div className="col">
                  <strong>Max Score:</strong> {writingData.total_score} &nbsp;
                  <strong>Your Score:</strong> {writingData.score}
                </div>
              </div>

              <div className="card">
                <div className="remark p-3">
                  <h5 className="mb-2">Remark</h5>
                  <p>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum
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

export default Writing;
