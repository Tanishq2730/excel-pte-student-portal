import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PracticeCard from "./practiceData";
import PracticeData from "./practiceData";
import Score from "./score";

const Community: React.FC = () => {
  return (
    <div className="community-section">
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mb-3">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="#solid-rounded-tab1"
                data-bs-toggle="tab"
              >
                My Practice
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="#solid-rounded-tab2"
                data-bs-toggle="tab"
              >
                Community Score
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane show active" id="solid-rounded-tab1">
              <PracticeData/>
            </div>
            <div className="tab-pane" id="solid-rounded-tab2">
              <Score/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
