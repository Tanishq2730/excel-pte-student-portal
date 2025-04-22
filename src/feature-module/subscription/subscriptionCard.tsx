import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const SubscriptionCard = () => {
  const routes = all_routes;
  return (
    <div>
      <>
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="border-bottom mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  {/* <span className="badge bg-info mb-3">Enterprise Pack</span> */}
                  <span className="badge badge-soft-warning mb-3">
                    Recommended
                  </span>
                </div>
                <h3 className="mb-3">3 Day Free Trial</h3>
              </div>
              <div>
                <div className="bg-light-300 p-3 rounded-1 text-center mb-3">
                  <h2>
                    INR 149
                    <span className="text-gray-7 fs-14 fw-normal"> /month</span>
                  </h2>
                </div>
                <ul className="list-unstyled gap-3">
                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <span className="flex-shrink-0 text-success me-2">
                        <i className="ti ti-circle-check-filled fs-15 align-middle" />
                      </span>
                      <div className="flex-grow-1">
                        Unlimited AI Scoring Practice
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <span className="flex-shrink-0 text-success me-2">
                        <i className="ti ti-circle-check-filled fs-15 align-middle" />
                      </span>
                      <div className="flex-grow-1">
                        Unlimited Scored Mock Tests
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex align-items-center">
                      <span className="flex-shrink-0 text-success me-2">
                        <i className="ti ti-circle-check-filled fs-15 align-middle" />
                      </span>
                      <div className="flex-grow-1">
                        Detailed Score Report Analysis
                      </div>
                    </div>
                  </li>
                </ul>
                <Link to="#" className="btn btn-primary w-100">
                  Start Your Free Trail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SubscriptionCard;
