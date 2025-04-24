import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Progress from "./progress";
import TimeSpent from "./timeSpent";
import MockTestProgress from "./mockTestProgress";
import StudyPlanProgress from "./studyPlanProgress";

const Performance: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-5">
          <div className="card-body">
            <ul
              className="nav nav-pills justify-content-start nav-style-2 mb-3"
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
                  Progress Graph
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
                  Time Spent
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
                  Mock Test
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
                  Study Plan Progress
                </Link>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane show active text-muted"
                id="home-center"
                role="tabpanel"
              >
                <Progress />
              </div>
              <div
                className="tab-pane text-muted"
                id="about-center"
                role="tabpanel"
              >
                <TimeSpent />
              </div>
              <div
                className="tab-pane text-muted"
                id="services-center"
                role="tabpanel"
              >
                <MockTestProgress title="Mock Test Progress" />
              </div>
              <div
                className="tab-pane text-muted"
                id="contacts-center"
                role="tabpanel"
              >
               <StudyPlanProgress/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
