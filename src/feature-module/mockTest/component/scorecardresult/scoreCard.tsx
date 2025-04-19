import React from "react";
import { all_routes } from "../../../../feature-module/router/all_routes";

const ScoreCard: React.FC = () => {
  const routes = all_routes;
  const communicativeSkills = [
    { label: "Listening", score: 62, color: "#4FB5AC" },
    { label: "Reading", score: 75, color: "#F06F6F" },
    { label: "Speaking", score: 62, color: "#66B3FF" },
    { label: "Writing", score: 54, color: "#F28AA5" },
  ];
  const targetScore = 63;

  return (
    <div
      className="container mt-4 rounded card bg-white p-0"
      style={{ maxWidth: "700px" }}
    >
      <div className="d-flex justify-content-start align-items-center border-bottom p-3">
        <div className="logo-half">
          <img src="assets/img/halflogo.png" alt="Logo" />
        </div>
        <div>
          <h4 className="mb-0">EXCEL PTE | Score Report</h4>
          <small className="text-muted">
            Mock Name: Full Mock Test 40 | Mock Test Date: Mar 12, 2025
          </small>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-9">
            <div className="d-flex align-items-center my-4">
              <div className="me-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "60px", height: "60px" }}
                />
              </div>
              <div>
                <h5 className="mb-0">Maruf Ahmed</h5>
                <small className="text-muted">marufahmed.30000@gmail.com</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <div className="overallcard">
                <h5 className="mb-0">Overall Score</h5>
                <h2 className="mb-0">63</h2>
              </div>
            </div>
          </div>
        </div>

        <h6 className="border-bottom pb-2">Communicative Skills</h6>
        <div className="mt-4">
          <div className="row justify-content-center">
            {communicativeSkills.map((skill, index) => (
              <div className="col-6 col-md-3 mb-4" key={index}>
                <div
                  className="circle-score d-flex justify-content-center align-items-center mx-auto"
                  style={{ borderColor: skill.color }}
                >
                  <span className="score-text">{skill.score}</span>
                </div>
                <div className="mt-2 fw-medium text-center">{skill.label}</div>
              </div>
            ))}
          </div>
          <div className="text-end text-muted">63 Overall</div>
        </div>

        <h6 className="border-bottom pb-2">Skills Breakdown</h6>
        <div className="bar mt-3">
          {communicativeSkills.map((skill, index) => (
            <div className="row align-items-center mb-3" key={index}>
              <div className="col-3 col-md-2 fw-medium">{skill.label}</div>
              <div className="col-1 text-end">{skill.score}</div>
              <div className="col position-relative">
                <div className="progress bg-light">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${skill.score}%`,
                      backgroundColor: skill.color,
                    }}
                  />
                </div>
                <div
                  className="target-line"
                  style={{ left: `${targetScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
