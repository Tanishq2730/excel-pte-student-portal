import React, { useState, useEffect } from "react";

const ClassLink: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-5">
          <div className="classLink">
          <div className="row">
            {/* Left Card */}
            <div className="col-md-4">
            <div className="left-card rounded-4 p-4 text-white flex-grow-1">
              <h5 className="mb-3">Zoom Meeting Invitation</h5>
              <h4 className="fw-bold mb-3">
                EXCEL PTE is inviting you to a scheduled Zoom meeting.
              </h4>
              <h5 className="fw-bold mb-4">
                Topic: EXCEL PTE's Personal Meeting Room
              </h5>
              <p className="mb-3 fs-4">Click to join the meeting:</p>
              <button className="btn btn-dark rounded-pill px-4 py-2 shadow-sm">
                Join Meeting
              </button>
            </div>
            </div>

            {/* Right Card */}
            <div className="col-md-4">
            <div className="right-card bg-white rounded-4 p-4 ">
              <h5 className="fw-bold mb-3">Meeting ID: 366 466 9647</h5>
              <h5 className="fw-bold">Passcode: 436727</h5>
            </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLink;
