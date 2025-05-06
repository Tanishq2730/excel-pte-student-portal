import React from "react";
import { all_routes } from "../../../../feature-module/router/all_routes";
import { Link } from "react-router-dom";

interface MockTestCardProps {
  id: number;
  name: string;
  time: string;
  attempted: number;
  onStart: () => void;
}

const MockTestCard: React.FC<MockTestCardProps> = ({
  id,
  name,
  time,
  attempted,
  onStart,
}) => {
  const routes = all_routes;
  const mockTestLink = routes.mockTest.replace(":id", id.toString()).replace("/:sessionId?", "");

  return (
    <div className="mock-test-card">
      <div className="card p-0 m-0" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
        <div className="card-header border-0 pt-0">
          <div className="card-title">
            <h2 className="mb-0">{name}</h2>
          </div>
        </div>
        <p className="time">Approx Time: {time}</p>
        <p className="attempted">Attempted * {attempted}</p>
        <Link to={mockTestLink} className="btn btn-primary rounded-pill w-100 mt-3">
          Start Test
        </Link>
      </div>
    </div>
  );
};

export default MockTestCard;
