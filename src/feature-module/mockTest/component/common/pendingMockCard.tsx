import React from "react";
import { all_routes } from "../../../../feature-module/router/all_routes";
import { Link } from "react-router-dom";

interface MockTestCardProps {
  testNumber: number;
  time: string;
  attempted: number;
  onStart: () => void;
}

const PendingMockCard: React.FC<MockTestCardProps> = ({
  testNumber,
  time,
  attempted,
  onStart,
}) => {
  const routes = all_routes;
  return (
    <div className="mock-test-card">
      <div
        className="card p-0 m-0"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
      >
        <div className="card-header border-0 pt-0">
          <div className="card-title">
            <h2 className="mb-0">Full Mock Test {testNumber}</h2>
          </div>
        </div>
        <div className="reaultCardBtn">
          <Link
            to={routes.result}
            className="btn btn-primary rounded-pill w-100 mt-3"
          >
            Continue
          </Link>
          <button
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
            className="btn btn-danger rounded-pill w-10 mx-2 mt-3"
          >
            <i className="ion-trash-b"></i>
          </button>
        </div>
      </div>
      {/* delete model  */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form>
              <div className="modal-body text-center">
                <span className="delete-icon">
                  <i className="ti ti-trash-x" />
                </span>
                <h4>Confirm Deletion</h4>
                <p>
                  You want to delete all the marked items, this cant be undone
                  once you delete.
                </p>
                <div className="d-flex justify-content-center">
                  <Link
                    to="#"
                    className="btn btn-light me-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Yes, Delete
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* delete model end */}
    </div>
  );
};

export default PendingMockCard;
