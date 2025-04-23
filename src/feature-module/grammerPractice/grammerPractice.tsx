import React, { useState, useEffect } from "react";
import AccordianQuestion from "./accordianQuestion";
import SelectCard from "./selectCard";
import Quiz from "./quize";

const GrammerPractice: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-5">
          <div className="grammerSection">
            <div className="row">
              <div className="col-md-4">
                <div className="grammerQuestion">
                  <AccordianQuestion />
                </div>
              </div>
              <div className="col-md-8">
                <SelectCard />
                <div className="card">
                  <Quiz />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammerPractice;
