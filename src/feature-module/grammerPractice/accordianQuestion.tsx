import React, { useState, useEffect } from "react";

const AccordianQuestion: React.FC = () => {
  return (
    <div className="card-body">
      <div
        className="accordion accordion-border-secondary accordions-items-seperate"
        id="accordioninfoborderExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingborderinfoOne">
            <button
              className="accordion-button "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#infoBorderOne"
              aria-expanded="true"
              aria-controls="infoBorderOne"
            >
              <div className="acBtn">
                <div>Adjective</div>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="infoBorderOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingborderinfoOne"
            data-bs-parent="#accordioninfoborderExample"
          >
            <div className="accordion-body">
              <div className="practiceCard">
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
              <div className="practiceCard">
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingborderinfoTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#infoBorderTwo"
              aria-expanded="false"
              aria-controls="infoBorderTwo"
            >
              <div className="acBtn">
                <div>Adverbs & Degree</div>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="infoBorderTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingborderinfoTwo"
            data-bs-parent="#accordioninfoborderExample"
          >
            <div className="accordion-body">
              <div className="practiceCard">
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
              <div className="practiceCard">
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingborderinfoThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#infoBorderThree"
              aria-expanded="false"
              aria-controls="infoBorderThree"
            >
              <div className="acBtn">
                <div>Adverbs & Manner</div>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="infoBorderThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingborderinfoThree"
            data-bs-parent="#accordioninfoborderExample"
          >
            <div className="accordion-body">
              <div className="practiceCard">
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
              <div className="practiceCard">
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianQuestion;
