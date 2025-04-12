import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudyPlan: React.FC = () => {
  return (
    <div className="studyplantab">
      <div className="card-body p-0">
        <ul
          className="nav nav-tabs tab-style-1 d-sm-flex d-block"
          role="tablist"
          style={{justifyContent:'center'}}
        >
          <li className="nav-item">
            <Link
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#orders"
              aria-current="page"
              to="#orders"
            >
              Speaking
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#accepted"
              to="#accepted"
            >
              Writing
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#declined"
              to="#declined"
            >
              Reading
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#listening"
              to="#listening"
            >
              Listening
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="orders" role="tabpanel">
            <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c one"></i>
                  </div>
                  <h3>Speaking</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="accepted" role="tabpanel">
            <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c two"></i>
                  </div>
                  <h3>Reading</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="declined" role="tabpanel">
            <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c three"></i>
                  </div>
                  <h3>Writing</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="listening" role="tabpanel">
          <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c four"></i>
                  </div>
                  <h3>Listening</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
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

export default StudyPlan;
