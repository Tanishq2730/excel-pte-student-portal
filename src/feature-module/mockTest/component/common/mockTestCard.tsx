import React from "react";
import { all_routes } from "../../../../feature-module/router/all_routes";
import { Link } from "react-router-dom";

interface MockTestCardProps {
  testNumber: number;
  time: string;
  attempted: number;
  onStart: () => void;
}

const MockTestCard: React.FC<MockTestCardProps> = ({
  testNumber,
  time,
  attempted,
  onStart,
}) => {
    const routes = all_routes;
  return (
    <div className="mock-test-card">
      <div className="card p-0 m-0" style={{background:'transparent',border:'none',boxShadow:'none'}}>
        <div className="card-header border-0 pt-0">
          <div className="card-title">
            <h2 className="mb-0">Full Mock Test {testNumber}</h2>
          </div>
        </div>
        <p className="time">Approx Time: {time}</p>
        <p className="attempted">Attempted * {attempted}</p>
        <Link to={routes.mockTest} className="start-btn">
          Start Test <span className="arrow">➤</span>
        </Link>
      </div>
    </div>
  );
};

export default MockTestCard;
