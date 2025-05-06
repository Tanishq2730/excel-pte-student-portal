import React, { useState } from "react";
import MockTestCard from "../component/common/mockTestCard";
import { Link } from "react-router-dom";

const SectionalMocktest: React.FC = () => {
  const mockTests = [
    { testNumber: 40, time: "2 hours", attempted: 70 },
    { testNumber: 41, time: "1.5 hours", attempted: 85 },
    { testNumber: 42, time: "2.5 hours", attempted: 60 },
    { testNumber: 43, time: "1 hour", attempted: 90 },
  ];
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container my-4">
        <div className="mainHead pb-3">
            <h3>Sectional Mocktest</h3>
          </div>
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
                  Speaking
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
                  Writing
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
                  Reading
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
                <div className="row">
                  {mockTests.map((test, index) => (
                    <div className="col-md-3">
                      <MockTestCard
                        key={index}
                        testNumber={test.testNumber}
                        time={test.time}
                        attempted={test.attempted}
                        onStart={() =>
                          alert(`Starting Test ${test.testNumber}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane text-muted"
                id="about-center"
                role="tabpanel"
              >
                <div className="row">
                  {mockTests.map((test, index) => (
                    <div className="col-md-3">
                      <MockTestCard
                        key={index}
                        testNumber={test.testNumber}
                        time={test.time}
                        attempted={test.attempted}
                        onStart={() =>
                          alert(`Starting Test ${test.testNumber}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane text-muted"
                id="services-center"
                role="tabpanel"
              >
                <div className="row">
                  {mockTests.map((test, index) => (
                    <div className="col-md-3">
                      <MockTestCard
                        key={index}
                        testNumber={test.testNumber}
                        time={test.time}
                        attempted={test.attempted}
                        onStart={() =>
                          alert(`Starting Test ${test.testNumber}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane text-muted"
                id="contacts-center"
                role="tabpanel"
              >
                <div className="row">
                  {mockTests.map((test, index) => (
                    <div className="col-md-3">
                      <MockTestCard
                        key={index}
                        testNumber={test.testNumber}
                        time={test.time}
                        attempted={test.attempted}
                        onStart={() =>
                          alert(`Starting Test ${test.testNumber}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionalMocktest;
