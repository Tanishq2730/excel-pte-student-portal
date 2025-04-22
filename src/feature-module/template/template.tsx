import React from "react";
import { Link } from "react-router-dom";
import SpeakingCard from "./component/speakingCard";
import WritingCard from "./component/writingCard";
import ReadingCard from "./component/readingCard";
import ListeningCard from "./component/listeningCard";

const Template: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-4">
          <div className="card-body">
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mb-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="#solid-rounded-tab1"
                  data-bs-toggle="tab"
                >
                  Speaking
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#solid-rounded-tab2"
                  data-bs-toggle="tab"
                >
                  Writing
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#solid-rounded-tab3"
                  data-bs-toggle="tab"
                >
                  Reading
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#solid-rounded-tab4"
                  data-bs-toggle="tab"
                >
                  Listening
                </Link>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane show active" id="solid-rounded-tab1">
                <SpeakingCard/>
              </div>
              <div className="tab-pane" id="solid-rounded-tab2">
                <WritingCard/>
              </div>
              <div className="tab-pane" id="solid-rounded-tab3">
                <ReadingCard/>
              </div>
              <div className="tab-pane" id="solid-rounded-tab4">
                <ListeningCard/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
