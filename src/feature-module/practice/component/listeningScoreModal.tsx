import React from "react";
import { image_url } from "../../../environment";

interface ListeningScoreModalProps {
  logDetail: any;
}

const ListeningScoreModal: React.FC<ListeningScoreModalProps> = ({
  logDetail,
}) => {
  if (!logDetail) return null;

  const audioUrl = `${image_url}/${logDetail?.answer}`;
  const subtypeName = logDetail?.subtype?.sub_name;

  let scoreLabel = "Choice";
  if (subtypeName === "Summarize Spoken Text") {
    scoreLabel = "Content";
  } else if (
    subtypeName === "MC, Choose Multiple Answers" ||
    subtypeName === "MC, Choose Multiple Answer"
  ) {
    scoreLabel = "Choice";
  } else if (
    subtypeName === "Highlight Incorrect Words" ||
    subtypeName === "Write from Dictation"
  ) {
    scoreLabel = "Words";
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
      {/* Your Answer Section */}
      <div className="youranswer mb-4">
        <div
          className="p-3 rounded shadow-sm border"
          style={{ backgroundColor: "#fafafa" }}
        >
          <h5 className="fw-bold">Your Answer</h5>
          {logDetail.subtype?.sub_name === "Write from Dictation" && (
            <div className="d-flex gap-3 align-items-center mt-3">
              <div className="d-flex align-items-center">
                <span
                className="dot"
                style={{ backgroundColor: "#00d084" }}
              ></span>
              <span className="ms-2">Accurate</span>
            </div>
            <div className="d-flex align-items-center">
              <span
                className="dot"
                style={{ backgroundColor: "#ff4c4c" }}
              ></span>
              <span className="ms-2">Inaccurate</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="dot" style={{ backgroundColor: "#555" }}></span>
              <span className="ms-2">Not Answer</span>
            </div>
          </div>
          )}
        
          <p 
            className="mb-2 mt-4"
            dangerouslySetInnerHTML={{ __html: logDetail.score_data.scored_text }}
          ></p>
        </div>
      </div>

      {/* Score Section */}
      <h5 className="fw-bold">Your Score</h5>
      <div className="row mt-3">
        {scoreData.map((item, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div
              className="p-3 rounded shadow-sm"
              style={{
                backgroundColor: "#fef9f7",
                border: "1px solid #f1e1dc",
              }}
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
      </div>

      {/* Dot Styles */}
      <style>{`
        .dot {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default ListeningScoreModal;
