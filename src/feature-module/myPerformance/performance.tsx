import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Progress from "./progress";
import TimeSpent from "./timeSpent";

const Performance: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-5">
          <div className="card-body">
            <ul
              className="nav nav-pills justify-content-start nav-style-2 mb-3"
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
                  Progress Graph
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
                  Time Spent 
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
                  Mock Test
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
                  Study Plan Progress
                </Link>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane show active text-muted"
                id="home-center"
                role="tabpanel"
              >
                <Progress/>
              </div>
              <div
                className="tab-pane text-muted"
                id="about-center"
                role="tabpanel"
              >
                <TimeSpent/>
              </div>
              <div
                className="tab-pane text-muted"
                id="services-center"
                role="tabpanel"
              >
                Unbelievable healthy snack success stories. 12 facts about safe
                food handling tips that will impress your friends. Restaurant
                weeks by the numbers. Will mexican food ever rule the world? The
                10 best thai restaurant youtube videos. How restaurant weeks can
                make you sick. The complete beginner&apos;s guide to cooking
                healthy food. Unbelievable food stamp success stories. How whole
                foods markets are making the world a better place. 16 things
                that won&apos;t happen in dish reviews.
              </div>
              <div
                className="tab-pane text-muted"
                id="contacts-center"
                role="tabpanel"
              >
                Why delicious magazines are killing you. Why our world would end
                if restaurants disappeared. Why restaurants are on crack about
                restaurants. How restaurants are making the world a better
                place. 8 great articles about minute meals. Why our world would
                end if healthy snacks disappeared. Why the world would end
                without mexican food. The evolution of chef uniforms. How not
                knowing food processors makes you a rookie. Why whole foods
                markets beat peanut butter on pancakes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
