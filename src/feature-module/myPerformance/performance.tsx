import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Progress from "./progress";
import TimeSpent from "./timeSpent";
// import MockTestProgress from "./mockTestProgress";
// import StudyPlanProgress from "./studyPlanProgress";
import { progressBar } from "../../api/performanceAPI";

const Performance: React.FC = () => {

   const [progressBars, setProgressBar] = useState<any>(null);
  
    useEffect(() => {
      const getData = async () => {
        const res = await progressBar();
        console.log(res);
        if (res?.success) {
          setProgressBar(res.data);
        }
      };
      getData();
    }, []);



  return (
    <div className="page-wrapper">
      <div className="content">
        
        <div className="container my-5">
        <div className="mainHead pb-3">
            <h3>My Performance</h3>
          </div>
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
              
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane show active text-muted"
                id="home-center"
                role="tabpanel"
              >
                {progressBars && <Progress progressBars={progressBars} />}
              </div>
              <div
                className="tab-pane text-muted"
                id="about-center"
                role="tabpanel"
              >
                <TimeSpent />
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
