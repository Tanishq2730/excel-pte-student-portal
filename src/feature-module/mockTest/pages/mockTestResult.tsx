import React, { useState, useEffect } from "react";
import MockTestResultCard from "../component/common/mockTestResultCard";
import { fetchMocktestResults } from "../../../api/mocktestAPI";

interface MockTestData {
  id: number;
  sessionId: string;
  start: string;
  end: string | null;
  status: string;
  introduction: string;
  mocktest: {
    id: number;
    name: string;
    mocktestType: string;
    typeId: number;
  };
}

const MockTestResult: React.FC = () => {
  const [mockTests, setMockTests] = useState<MockTestData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchMocktestResults();
        if (res.success) {
          setMockTests(res.data);
        }
      } catch (err) {
        console.error("Error loading mock test data:", err);
      }
    };
    getData();
  
  }, []);
  console.log(mockTests);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container my-4">
          <div className="mainHead pb-3">
            <h3>Mocktest Results</h3>
          </div>
          <div className="row">
            {mockTests.map((test) => (
              <div key={test.id} className="col-md-3 mb-3">
                <MockTestResultCard
                  id={test.id}
                  mocktest={test.mocktest.name}
                  mockType={test.mocktest.mocktestType}
                  sessionId={test.sessionId}
                  startTime={test.start}
                  endTime={test.end}
                  status={test.status}
                  introductionAudio={test.introduction}
                  onStart={() => alert(`Reviewing session ${test.sessionId}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestResult;
