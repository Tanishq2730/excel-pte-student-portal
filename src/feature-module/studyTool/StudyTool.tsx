import React, { useState } from "react";
import {
  FaVideo,
  FaFileAlt,
  FaQuestionCircle,
  FaFolder,
  FaLink,
  FaCalendarAlt,
} from "react-icons/fa";

type CardItem = {
  icon: JSX.Element;
  title: string;
};

const cardData: CardItem[] = [
  { icon: <FaVideo size={40} />, title: "Class Recording" },
  { icon: <FaFileAlt size={40} />, title: "Template" },
  { icon: <FaQuestionCircle size={40} />, title: "Grammar" },
  { icon: <FaFolder size={40} />, title: "Prediction File" },
  { icon: <FaLink size={40} />, title: "Class link" },
  { icon: <FaCalendarAlt size={40} />, title: "Timetable" },
];

const StudyTool: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="studySection">
          <div className="container">
            <div className="row my-4">
              {cardData.map((item, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                  <div className="card p-4 text-center shadow-sm custom-card h-100">
                    <div className="text-info mb-3 icon">{item.icon}</div>
                    <h6 className="fw-semibold">{item.title}</h6>
                  </div>
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
