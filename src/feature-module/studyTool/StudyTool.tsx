import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { all_routes } from "../../feature-module/router/all_routes";
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
  link: string;
};



const StudyTool: React.FC = () => {
  const routes = all_routes;
  const cardData: CardItem[] = [
    { icon: faVideo, title: "Class Recording", link: routes.classRecording },
    { icon: faFileAlt, title: "Template", link: routes.template },
    { icon: faFolder, title: "Prediction File", link: routes.predictionFile },
    { icon: faLink, title: "Class link", link: routes.classLink },
    { icon: faCalendarAlt, title: "Timetable", link: routes.timeTable },
  ];
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
                  <Link to={item.link}>
                    <div className="card px-4 py-5 text-center mb-0">
                      <div className="text-info mb-3 icon">
                        <FontAwesomeIcon icon={item.icon} size="2x" />
                      </div>
                      <h3 className="fw-semibold">{item.title}</h3>
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
