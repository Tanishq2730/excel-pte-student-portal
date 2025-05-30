import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const StudyTools: React.FC = () => {
  const routes = all_routes;

  return (
    <div className="mocktestProgress">
      <div className="card-body p-3 studyStyle">
        <div className="row">
          <div className="col-md-6">
            <Link
              to={routes.template}
              className="studycard d-block bg-success-transparent ronded p-2 text-center mb-3 class-hover"
            >
              <div className="avatar avatar-lg border p-1 border-success rounded-circle mb-2">
                <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-success rounded-circle">
                  <i className="ti ti-calendar" />
                </span>
              </div>
              <p className="text-dark">Template</p>
            </Link>
          </div>
          <div className="col-md-6">
            <Link
              to={routes.classLink}
              className="studycard d-block bg-secondary-transparent ronded p-2 text-center mb-3 class-hover"
            >
              <div className="avatar avatar-lg border p-1 border-secondary rounded-circle mb-2">
                <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-secondary rounded-circle">
                  <i className="ti ti-license" />
                </span>
              </div>
              <p className="text-dark">Class Link</p>
            </Link>
          </div>
          <div className="col-md-6">
            <Link
              to={routes.predictionFile}
              className="studycard d-block bg-primary-transparent ronded p-2 text-center mb-3 class-hover"
            >
              <div className="avatar avatar-lg border p-1 border-primary rounded-circle mb-2">
                <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-primary rounded-circle">
                  <i className="ti ti-hexagonal-prism" />
                </span>
              </div>
              <p className="text-dark">Prediction File</p>
            </Link>
          </div>
          {/* <div className="col-md-4">
                        <Link
                          to={routes.classHomeWork}
                          className="d-block bg-danger-transparent ronded p-2 text-center mb-0 class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-danger rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-danger rounded-circle">
                              <i className="ti ti-report-money" />
                            </span>
                          </div>
                          <p className="text-dark">Gram</p>
                        </Link>
                      </div> */}
          <div className="col-md-6">
            <Link
              to={routes.practiceHistory}
              className="studycard d-block bg-warning-transparent ronded p-2 text-center class-hover"
            >
              <div className="avatar avatar-lg border p-1 border-warning rounded-circle mb-2">
                <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-warning rounded-circle">
                  <i className="ti ti-calendar-share" />
                </span>
              </div>
              <p className="text-dark">Practice History</p>
            </Link>
          </div>
          {/* <div className="col-md-4">
                        <Link
                          to={routes.timeTable}
                          className="d-block bg-skyblue-transparent ronded p-2 text-center mb-0 class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-skyblue rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-pending rounded-circle">
                              <i className="ti ti-file-pencil" />
                            </span>
                          </div>
                          <p className="text-dark">TT</p>
                        </Link>
                      </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudyTools;
