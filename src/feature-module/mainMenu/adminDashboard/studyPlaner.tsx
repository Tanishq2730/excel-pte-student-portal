import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudyPlaner: React.FC = () => {
  return (
    <div className="studyplantab">
      <div className="card-body p-0">
        <ul
          className="nav nav-tabs bg-success-transparent tab-style-1 d-sm-flex d-block"
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
              <i className="fa fa-microphone"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#accepted"
              to="#accepted"
            >
              <i className="ion-edit"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#declined"
              to="#declined"
            >
              <i className="ion-ios7-bookmarks"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#listening"
              to="#listening"
            >
              <i className="ion-headphone"></i>
            </Link>
          </li>
        </ul>
        <div className="tab-content mb-4">
          <div className="tab-pane active" id="orders" role="tabpanel">
            <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head mb-3">
                  <div className="icon bg-danger-transparent">
                    <i className="fa fa-microphone"></i>
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
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
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
            <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon bg-secondary-transparent">
                  <i className="ion-ios7-bookmarks"></i>
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
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
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
            <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon bg-warning-transparent">
                  <i className="ion-edit"></i>
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
                      className="progress-bar bg-primary rounded"
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
          <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon bg-success-transparent">
                  <i className="ion-headphone"></i>
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
                      className="progress-bar bg-primary rounded"
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

export default StudyPlaner;
