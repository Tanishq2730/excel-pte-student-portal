import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faFileAlt,
  faQuestionCircle,
  faFolder,
  faLink,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type CardItem = {
  icon: any;
  title: string;
};

const cardData: CardItem[] = [
  { icon: faVideo, title: "Class Recording" },
  { icon: faFileAlt, title: "Template" },
  { icon: faQuestionCircle, title: "Grammar" },
  { icon: faFolder, title: "Prediction File" },
  { icon: faLink, title: "Class link" },
  { icon: faCalendarAlt, title: "Timetable" },
];

const StudyTool: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="studySection">
          <div className="container">
            <div className="row my-4">
              {cardData.map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 my-3"
                  key={index}
                >
                  <Link to="#">
                    <div className="card px-4 py-5 text-center mb-0">
                      <div className="text-info mb-3 icon">
                        <FontAwesomeIcon icon={item.icon} size="2x" />
                      </div>
                      <h6 className="fw-semibold">{item.title}</h6>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTool;
