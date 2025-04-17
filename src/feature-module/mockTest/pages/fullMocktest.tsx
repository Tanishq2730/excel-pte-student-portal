import React, { useState } from "react";
import MockTestCard from "../component/common/mockTestCard";

const FullMocktest: React.FC = () => {
  const mockTests = [
    { testNumber: 40, time: "2 hours", attempted: 70 },
    { testNumber: 41, time: "1.5 hours", attempted: 85 },
    { testNumber: 42, time: "2.5 hours", attempted: 60 },
    { testNumber: 43, time: "1 hour", attempted: 90 },
  ];
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-4">
          <div className="row">
            {mockTests.map((test, index) => (
              <div className="col-md-3">
                <MockTestCard
                  key={index}
                  testNumber={test.testNumber}
                  time={test.time}
                  attempted={test.attempted}
                  onStart={() => alert(`Starting Test ${test.testNumber}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMocktest;
