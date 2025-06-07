import React, { useEffect } from "react";
import { image_url } from "../../../environment";

interface ReadingScoreModalProps {
  logDetail: any;
}

const ReadingScoreModal: React.FC<ReadingScoreModalProps> = ({ logDetail }) => {
  if (!logDetail) return null;

  const audioUrl = `${image_url}/${logDetail?.answer}`;

  // Determine label based on subtype name
  let scoreLabel = "Choice"; // Default
  const subtypeName = logDetail?.subtype?.sub_name;
  console.log(logDetail, "hellobudy");

  if (subtypeName === "Reading and Writing Fill in the Blanks") {
    scoreLabel = "R & W Fill Blanks";
  } else if (subtypeName === "MC, Choose Multiple Answers") {
    scoreLabel = "Choice";
  } else if (subtypeName === "MC, Choose Multiple Answer") {
    scoreLabel = "Choice";
  } else if (subtypeName === "Re-order Paragraphs") {
    scoreLabel = "Pair";
  } else if (subtypeName === "Reading Fill in the Blanks") {
    scoreLabel = "Reading Fill Blanks";
  }

  const scoreData = [
    {
      label: scoreLabel,
      score: logDetail.score || 0,
      totalscore: logDetail.total_score || 0,
      desc: "",
      barColor: "#f08080",
    },
    {
      label: "Your Score",
      score: logDetail.score || 0,
      desc: "",
      totalscore: logDetail.total_score || 0,
      barColor: "#b0e0e6",
    },
  ];

  return (
    <div className="container py-4" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Score Section */}
      <h5 className="fw-bold">Your Score</h5>
      <div className="row mt-3">
        {scoreData.map((item, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div
              className="p-3 rounded shadow-sm"
              style={{ backgroundColor: "#fef9f7" }}
            >
              <div className="d-flex justify-content-between fw-semibold">
                <span>{item.label}</span>
                <span>
                  {item.score} / {item.totalscore}
                </span>
              </div>
              <div
                className="mt-2 mb-1"
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "8px",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    width: `${(item.score / item.totalscore) * 100}%`,
                    backgroundColor: item.barColor,
                    height: "100%",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
              {item.desc && (
                <small className="text-muted d-block mt-1">{item.desc}</small>
              )}
            </div>
          </div>
        ))}

        {/* {scoreData.map((item, idx) => ( */}
        {logDetail?.subtype?.sub_name ===
          "Reading and Writing Fill in the Blanks" ||
          logDetail?.subtype?.sub_name === "Reading Fill in the Blanks" ||
          (logDetail?.subtype?.sub_name === "Reading and Writing Fill in the Blanks" && (
            <div className="cardDetail">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title text-center">
                        Correct answer
                      </div>
                    </div>
                    <div className="card-body" style={{ paddingLeft: "10em" }}>
                      <ul>
                        {logDetail?.score_data?.correct_answer
                          ?.split(",")
                          .map((word: string, index: number) => (
                            <li key={index}>{word.trim()}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title text-center">
                        User's Response
                      </div>
                    </div>
                    <div className="card-body" style={{ paddingLeft: "10em" }}>
                      <ul style={{ color: "green" }}>
                        {(() => {
                          const userAnswer = logDetail?.score_data?.user_answer;
                          let items: string[] = [];

                          if (Array.isArray(userAnswer)) {
                            items = userAnswer;
                          } else if (typeof userAnswer === "string") {
                            items = userAnswer
                              .split(",")
                              .map((item) => item.trim());
                          } else if (userAnswer) {
                            items = [userAnswer.toString()];
                          }

                          return items.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ));
                        })()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* ))} */}

        {logDetail?.subtype?.sub_name === "MC, Select Multiple Answer" ||
          (logDetail?.subtype?.sub_name === "MC, Select Single Answer" && (
            <div className="cardDetail">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title text-center">
                        Correct answer
                      </div>
                    </div>
                    <div className="card-body" style={{ paddingLeft: "10em" }}>
                      <div className="multiple">
                        {Array.isArray(
                          logDetail?.score_data?.correct_answer
                        ) ? (
                          logDetail.score_data.correct_answer.map(
                            (answer: string, index: number) => (
                              <span key={index}>{answer}</span>
                            )
                          )
                        ) : (
                          <span>{logDetail?.score_data?.correct_answer}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title text-center">
                        User's Response
                      </div>
                    </div>
                    <div className="card-body" style={{ paddingLeft: "10em" }}>
                      <div className="multiples">
                        {(() => {
                          const userAnswer = logDetail?.score_data?.user_answer;
                          let items: string[] = [];

                          if (Array.isArray(userAnswer)) {
                            items = userAnswer;
                          } else if (typeof userAnswer === "string") {
                            items = userAnswer
                              .split(",")
                              .map((item) => item.trim());
                          } else if (userAnswer) {
                            items = [userAnswer.toString()];
                          }

                          return items.map((answer: string, index: number) => (
                            <span key={index}>{answer}</span>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {logDetail?.subtype?.sub_name === "Re-order Paragraphs" && (
          <div className="cardDetail">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title text-center">Correct answer</div>
                  </div>
                  <div className="card-body" style={{ paddingLeft: "10em" }}>
                    <ul style={{ color: "green" }}>
                      {Array.isArray(logDetail?.score_data?.answer)
                        ? logDetail.score_data.answer.map(
                            (item: string, index: number) => (
                              <li key={index}>{item}</li>
                            )
                          )
                        : logDetail?.score_data?.answer
                            ?.toString()
                            ?.split(",")
                            .map((item: string, index: number) => (
                              <li key={index}>{item.trim()}</li>
                            ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title text-center">
                      User's Response
                    </div>
                  </div>
                  <div className="card-body" style={{ paddingLeft: "10em" }}>
                    <ul style={{ color: "green" }}>
                      {(() => {
                        const userAnswer = logDetail?.score_data?.user_answer;
                        let items: string[] = [];

                        if (Array.isArray(userAnswer)) {
                          items = userAnswer;
                        } else if (typeof userAnswer === "string") {
                          items = userAnswer
                            .split(",")
                            .map((item) => item.trim());
                        } else if (userAnswer) {
                          items = [userAnswer.toString()];
                        }

                        return items.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ));
                      })()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingScoreModal;
