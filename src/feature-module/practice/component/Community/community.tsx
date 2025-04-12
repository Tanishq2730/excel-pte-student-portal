import React from "react";
import { Link } from "react-router-dom";
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
              <PracticeData />
            </div>
            <div className="tab-pane" id="solid-rounded-tab2">
              <div className="card-body">
                <ul
                  className="nav nav-pills justify-content-start nav-style-3 mb-3"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#home-right"
                      aria-selected="true"
                    >
                      All Score
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#about-right"
                      aria-selected="true"
                    >
                      79
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#services-right"
                      aria-selected="true"
                    >
                      50
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#contacts-right"
                      aria-selected="true"
                    >
                      35
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane text-muted"
                    id="home-right"
                    role="tabpanel"
                  >
                    <Score/>
                  </div>
                  <div
                    className="tab-pane show active text-muted"
                    id="about-right"
                    role="tabpanel"
                  >
                    <Score/>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="services-right"
                    role="tabpanel"
                  >
                    <Score/>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="contacts-right"
                    role="tabpanel"
                  >
                    <Score/> 
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

export default Community;
