import React, { useState } from "react";
import MockTestResultCard from "../component/common/mockTestResultCard";
import { Link } from "react-router-dom";
import ScoreCard from "../component/scorecardresult/scoreCard";
import Speaking from "../component/scorecardresult/speaking";
import Writing from "../component/scorecardresult/writing";
import Reading from "../component/scorecardresult/reading";
import Listening from "../component/scorecardresult/listening";

const Result: React.FC = () => {
  return (
    <div className="mockInfoContent">
      <div className="container">
        <div className="scoreHeader">
          <div className="s-head">
            <h3>Full Mocktest 40</h3>
          </div>
          <div className="s-date">
            <p>Submitted at: 12-3-2025, 16:21:18</p>
          </div>
        </div>
        <div className="score-card-section mt-4">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Full Mocktest 40 - Answer</div>
            </div>
            <div className="card-body">
              <div className="card-body">
                <ul
                  className="nav nav-pills justify-content-center nav-style-2 mb-3"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#home-center"
                      aria-selected="true"
                    >
                      Score Card
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#about-center"
                      aria-selected="false"
                    >
                      Speaking
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#services-center"
                      aria-selected="false"
                    >
                      Writing
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#contacts-center"
                      aria-selected="false"
                    >
                      Reading
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#last-center"
                      aria-selected="false"
                    >
                      Listening
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane show active text-muted"
                    id="home-center"
                    role="tabpanel"
                  >
                    <ScoreCard/>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="about-center"
                    role="tabpanel"
                  >
                    <Speaking/>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="services-center"
                    role="tabpanel"
                  >
                    <Writing/>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="contacts-center"
                    role="tabpanel"
                  >
                   <Reading/>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="last-center"
                    role="tabpanel"
                  >
                    <Listening/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
