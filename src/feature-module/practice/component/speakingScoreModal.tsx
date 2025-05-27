import React from "react";
import { image_url } from "../../../environment";

interface SpeakingScoreModalProps {
  logDetail: any;
}

const SpeakingScoreModal: React.FC<SpeakingScoreModalProps> = ({
  logDetail,
}) => {
  // if (!logDetail || !logDetail.data) return null;

  const audioUrl = `${image_url}/${logDetail?.answer}`;
  const parsedScoreData =
    typeof logDetail?.score_data === "string"
      ? JSON.parse(logDetail.score_data)
      : logDetail?.score_data || {};

  if (!logDetail) return null;
  const scoreData = [
    {
      label: "Content",
      score: parsedScoreData.content || 0,
      desc: "Poor",
      barColor: "#e82646",
    },
    {
      label: "Pronunciation",
      score: parsedScoreData.pronunciation || 0,
      desc: "Many consonants and vowels are mispronounced & omitted. Stress is placed in a non–English manner.",
      barColor: "#6FCCD8",
    },
    {
      label: "Fluency",
      score: parsedScoreData.fluency || 0,
      desc: "Your speech is slow and laboured with little grouping, multiple hesitations, pauses, false starts.",
      barColor: "#EAB300",
    },
    {
      label: "Your Score",
      score: logDetail.score || 0,
      desc: "",
      barColor: "#1b507a",
    },
  ];
  console.log(parsedScoreData);


  return (
    <div className="container py-4" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Audio Player */}
      <div className="mb-3">
        <h6 className="fw-bold">Your Recorded Audio</h6>
        <div
          className="rounded-pill d-flex align-items-center p-0"
          style={{ width: "60%" }}
        >
          <audio controls src={audioUrl} className="w-100 mt-2" />
        </div>
      </div>

      {/* Transcript */}
      <div className="p-3 rounded mb-3" style={{ backgroundColor: "#eef6f9" }}>
        {parsedScoreData.transcript}
      </div>
      <div className="mt-2 mb-3">
        <button className="btn btn-outline-danger">
          <span className="">Bad words :30</span>
        </button>
        <button className="btn btn-outline-warning mx-3">
          <span className=""> AVG Words :40</span>
        </button>
        <button className="btn btn-outline-success">
          <span className="">Good Words :60</span>
        </button>
      </div>
      {/* Scored Transcript */}
      <div className="p-3 rounded mb-4" style={{ backgroundColor: "#f1f9fb" }}>
        <strong>AI Speech Recognition:</strong>
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{
            __html: parsedScoreData.scored_transcript || "",
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
                border: "0px solid #f1e1dc",
              }}
            >
              <div className="d-flex justify-content-between fw-semibold">
                <span>{item.label}</span>
                <span>
                  {item.score.toFixed(2)} / {logDetail.total_score}
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
                    width: `${(item.score / 90) * 100}%`,
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
    </div>
  );
};

export default SpeakingScoreModal;
