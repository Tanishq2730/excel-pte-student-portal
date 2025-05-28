import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const RecentMocktestScore: React.FC = () => {
  return (
    <div className="card flex-fill">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-title">Recent Mock Score</h4>
        <h5 className="text-danger">Total Score: 63</h5>
      </div>
      <div className="card-body p-3">
        <div className="d-flex align-items-center rounded border p-2 mb-3">
          <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
            <i className="fa fa-microphone text-danger"></i>
          </span>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <p className="mb-1">Speaking</p>
              <span>23/90</span>
            </div>
            <div className="progress progress-xs  flex-grow-1 mb-1">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-primary rounded"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center rounded border p-2 mb-3">
          <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
            <i className="ion-edit text-primary"></i>
          </span>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <p className="mb-1">Writng</p>
              <span>45/90</span>
            </div>
            <div className="progress progress-xs  flex-grow-1 mb-1">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-warning rounded"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center rounded border p-2 mb-3">
          <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
            <i className="ion-ios7-bookmarks text-green"></i>
          </span>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <p className="mb-1">Reading</p>
              <span>74/90</span>
            </div>
            <div className="progress progress-xs  flex-grow-1 mb-1">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success rounded"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center rounded border p-2 mb-0">
          <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
            <i className="ion-headphone text-warning"></i>
          </span>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <p className="mb-1">Listening</p>
              <span>68/90</span>
            </div>
            <div className="progress progress-xs  flex-grow-1 mb-1">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-info rounded"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentMocktestScore;
