import React from "react";
import { image_url } from "../../../environment";

interface ScoreData {
  content?: number;
  form?: number;
  grammer?: number;
  vocabulary?: number;
  highlightedText?: string;
}

interface WritingScoreModalProps {
  logDetail: any;
}

const WritingScoreModal: React.FC<WritingScoreModalProps> = ({ logDetail }) => {
  if (!logDetail) return null;
  console.log(logDetail, "tansihqqq");
  
  let parsedScoreData: ScoreData = {};
  
  try {
    if (typeof logDetail?.score_data === "string") {
      parsedScoreData = JSON.parse(logDetail.score_data);
    } else if (typeof logDetail?.score_data === "object" && logDetail?.score_data !== null) {
      parsedScoreData = logDetail.score_data;
    }
  } catch (error) {
    console.error("Error parsing score data:", error);
    parsedScoreData = {};
  }

  const audioUrl = `${image_url}/${logDetail?.answer}`;

  const scoreData = [
    {
      label: "Content",
      score: parsedScoreData.content || 0,
      totalscore: 2,
      desc: "Good Summary!",
      barColor: "#f08080",
    },
    {
      label: "Form",
      score: parsedScoreData.form || 0,
      totalscore: 1,
      desc: "Excellent!!",
      barColor: "#aee1f9",
    },
    {
      label: "Grammar",
      score: parsedScoreData.grammer || 0,
      totalscore: 2,
      desc: "Has correct grammatical structure",
      barColor: "#fdd76e",
    },
    {
      label: "Vocabulary",
      score: parsedScoreData.vocabulary || 0,
      totalscore: 2,
      desc: "Has appropriate choice of words",
      barColor: "#fdd76e",
    },
    {
      label: "Your Score",
      score: logDetail.score || 0,
      totalscore: 7,
      desc: "",
      barColor: "#b0e0e6",
    },
  ];

  return (
    <div className="container py-4" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Word Buttons */}
      

      {/* AI Speech Recognition */}
      <div className="p-3 rounded mb-4" style={{ backgroundColor: "#f1f9fb" }}>
        <strong>AI Speech Recognition:</strong>
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{
            __html: parsedScoreData.highlightedText || "",
          }}
        />
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
                height: "100%",
              }}
            >
              <div className="d-flex justify-content-between fw-semibold mb-1">
                <span>{item.label}</span>
                <span>
                  {item.score} / {item.totalscore}
                </span>
              </div>
              <div
                className="w-100"
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "8px",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(
                      (item.score / item.totalscore) * 100,
                      100
                    )}%`,
                    backgroundColor: item.barColor,
                    height: "100%",
                    borderRadius: "4px",
                    transition: "width 0.5s ease",
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
    </div>
  );
};

export default WritingScoreModal;
