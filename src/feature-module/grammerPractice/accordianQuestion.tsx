import React from "react";

interface Props {
  onStartQuiz: () => void;
}

const AccordianQuestion: React.FC<Props> = ({ onStartQuiz }) => {
  return (
    <div className="card-body">
      <div
        className="accordion accordion-solid-primary accordions-items-seperate"
        id="accordioninfoborderExample"
      >
        {/* Adjective */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingborderinfoOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#infoBorderOne"
              aria-expanded="true"
              aria-controls="infoBorderOne"
              onClick={onStartQuiz}
            >
              <div className="acBtn">
                <div>Adjective</div>
                <div className="d-flex">
                  <button className="btn btn-primary py-1 mx-2">Lesson</button>
                  
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
              <div className="practiceCard" onClick={onStartQuiz}>
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
              <div className="practiceCard" onClick={onStartQuiz}>
                <p className="mb-0">Practice 2</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adverbs & Degree */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingborderinfoTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#infoBorderTwo"
              aria-expanded="false"
              aria-controls="infoBorderTwo"
              onClick={onStartQuiz}
            >
              <div className="acBtn">
                <div>Adverbs & Degree</div>
                <div className="d-flex">
                  <button className="btn btn-primary py-1 mx-2">Lesson</button>
                  
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
              <div className="practiceCard" onClick={onStartQuiz}>
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
              <div className="practiceCard" onClick={onStartQuiz}>
                <p className="mb-0">Practice 2</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adverbs & Manner */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingborderinfoThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#infoBorderThree"
              aria-expanded="false"
              aria-controls="infoBorderThree"
              onClick={onStartQuiz}
            >
              <div className="acBtn">
                <div>Adverbs & Manner</div>
                <div className="d-flex">
                  <button className="btn btn-primary py-1 mx-2">Lesson</button>
                  
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
              <div className="practiceCard" onClick={onStartQuiz}>
                <p className="mb-0">Practice 1</p>
                <div className="count">
                  <p>10/10</p>
                </div>
              </div>
              <div className="practiceCard" onClick={onStartQuiz}>
                <p className="mb-0">Practice 2</p>
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
