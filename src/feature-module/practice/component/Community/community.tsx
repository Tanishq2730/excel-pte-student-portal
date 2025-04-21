import React from "react";
import { Link } from "react-router-dom";
import PracticeData from "./practiceData";
import Score from "./score";

// Define props type
interface CommunityProps {
  questionData: any; // or better: questionData: QuestionData | null;
}

// Accept props in the component
const Community: React.FC<CommunityProps> = ({ questionData }) => {
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
              <PracticeData questionData={questionData} />
            </div>
            <div className="tab-pane" id="solid-rounded-tab2">
              <div className="card-body">
                <ul className="nav nav-pills justify-content-start nav-style-3 mb-3" role="tablist">
                  <li className="nav-item">
                    <Link className="nav-link active" data-bs-toggle="tab" to="#home-right">All Score</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-bs-toggle="tab" to="#about-right">79</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-bs-toggle="tab" to="#services-right">50</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-bs-toggle="tab" to="#contacts-right">35</Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane text-muted" id="home-right">
                    <Score />
                  </div>
                  <div className="tab-pane show active text-muted" id="about-right">
                    <Score />
                  </div>
                  <div className="tab-pane text-muted" id="services-right">
                    <Score />
                  </div>
                  <div className="tab-pane text-muted" id="contacts-right">
                    <Score />
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