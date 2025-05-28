import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";

const ActivityHistory: React.FC = () => {
  return (
    <div className="card flex-fill">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-titile">Activity History</h4>
      </div>
      <div
        className="card-body py-1 "
        style={{ height: "21.4em", overflowY: "scroll" }}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item py-3 px-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center overflow-hidden mb-3">
                <Link to="#" className="avatar avatar-xl flex-shrink-0 me-2">
                  <ImageWithBasePath
                    src="assets/img/home-work/home-work-01.jpg"
                    alt="img"
                  />
                </Link>
                <div className="overflow-hidden">
                  <p className="d-flex align-items-center text-info mb-1">
                    Mock Test
                  </p>
                  <h6 className="text-truncate mb-1">
                    {/* <Link to={routes.classHomeWork}> */}
                    Speaking Mock Test 40. #812
                    {/* </Link> */}
                  </h6>
                  <div className="d-flex align-items-center flex-wrap">
                    <p>16 Jun 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item py-3 px-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center overflow-hidden mb-3">
                <Link to="#" className="avatar avatar-xl flex-shrink-0 me-2">
                  <ImageWithBasePath
                    src="assets/img/home-work/home-work-01.jpg"
                    alt="img"
                  />
                </Link>
                <div className="overflow-hidden">
                  <p className="d-flex align-items-center text-info mb-1">
                    Mock Test
                  </p>
                  <h6 className="text-truncate mb-1">
                    {/* <Link to={routes.classHomeWork}> */}
                    Speaking Mock Test 40. #812
                    {/* </Link> */}
                  </h6>
                  <div className="d-flex align-items-center flex-wrap">
                    <p>16 Jun 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item py-3 px-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center overflow-hidden mb-3">
                <Link to="#" className="avatar avatar-xl flex-shrink-0 me-2">
                  <ImageWithBasePath
                    src="assets/img/home-work/home-work-01.jpg"
                    alt="img"
                  />
                </Link>
                <div className="overflow-hidden">
                  <p className="d-flex align-items-center text-info mb-1">
                    Mock Test
                  </p>
                  <h6 className="text-truncate mb-1">
                    {/* <Link to={routes.classHomeWork}> */}
                    Speaking Mock Test 40. #812
                    {/* </Link> */}
                  </h6>
                  <div className="d-flex align-items-center flex-wrap">
                    <p>16 Jun 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityHistory;
