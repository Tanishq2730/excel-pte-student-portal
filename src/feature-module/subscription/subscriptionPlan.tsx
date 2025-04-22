import React from "react";
import { Link } from "react-router-dom";
import CommonSelect from "../../core/common/commonSelect";
import { membershipplan } from "../../core/common/selectoption/selectoption";
import { all_routes } from "../router/all_routes";
import TooltipOption from "../../core/common/tooltipOption";
import SubscriptionCard from "./subscriptionCard";
import History from "./history";
import Faq from "./faq";

const SubscriptionPlan = () => {
  const routes = all_routes;
  return (
    <div>
      <>
        {/* Page Wrapper */}
        <div className="page-wrappers">
          <div className="container">
            <div className="content my-5">
              <div className="card-body">
                <ul
                  className="nav nav-pills justify-content-center nav-style-2 mb-3"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#home-center"
                      aria-selected="true"
                    >
                      Subscription
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#about-center"
                      aria-selected="false"
                    >
                      Mock Test
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#services-center"
                      aria-selected="false"
                    >
                      Online Classes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#contacts-center"
                      aria-selected="false"
                    >
                      Payment History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      to="#last-center"
                      aria-selected="false"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
                <div className="tab-content mt-5">
                  <div
                    className="tab-pane show active text-muted"
                    id="home-center"
                    role="tabpanel"
                  >
                    <div className="row">
                      <SubscriptionCard />
                    </div>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="about-center"
                    role="tabpanel"
                  >
                    <div className="row">
                      <SubscriptionCard />
                    </div>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="services-center"
                    role="tabpanel"
                  >
                    <div className="row">
                      <SubscriptionCard />
                    </div>
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="contacts-center"
                    role="tabpanel"
                  >
                    <History />
                  </div>
                  <div
                    className="tab-pane text-muted"
                    id="last-center"
                    role="tabpanel"
                  >
                    <Faq />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SubscriptionPlan;
