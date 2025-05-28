import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { StudyPlaner as StudyPlanerAPI } from "../../../api/dashboardAPI";

interface StudyPlanerType {
  attempted: number;
  notAttempted: number;
}

const StudyPlaner: React.FC = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);

  const [planer, setPlaner] = useState<StudyPlanerType>({
    attempted: 0,
    notAttempted: 0,
  });

  useEffect(() => {
    getPlaner();
    
  }, []);

  const getPlaner = async () => {
    if (date) {
      const payload = {date:date,typeId:1}
      const res = await StudyPlanerAPI(date.toISOString(), 1);

      if (res?.success) {
        setPlaner(res.data);
        console.log(res);
      }
    }
  };

  return (
    <div className="studyplantab">
      <Calendar
        className="datepickers mb-1"
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        style={{ width: "100% !important" }}
      />
      <div className="attemptedicon">
        <div className="innerattempt">
          <span style={{ fontSize: "12px" }}>Attempted</span>{" "}
          <p
            className=""
            style={{
              width: "1em",
              height: "1em",
              marginLeft: "10px",
              borderRadius: "100px",
              background: "#00b2a9",
            }}
          ></p>
        </div>
        <div className="innerattempt">
          <span style={{ fontSize: "12px" }}>Not Attempted</span>{" "}
          <p
            className="bg-danger"
            style={{
              width: "1em",
              height: "1em",
              marginLeft: "10px",
              borderRadius: "100px",
            }}
          ></p>
        </div>
      </div>
      <div className="card-body p-0">
        <ul
          className="nav nav-tabs bg-success-transparent tab-style-1 d-sm-flex d-block"
          role="tablist"
          style={{ justifyContent: "center" }}
        >
          <li className="nav-item">
            <Link
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#orders"
              aria-current="page"
              to="#orders"
            >
              <i className="fa fa-microphone"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#accepted"
              to="#accepted"
            >
              <i className="ion-edit"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#declined"
              to="#declined"
            >
              <i className="ion-ios7-bookmarks"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#listening"
              to="#listening"
            >
              <i className="ion-headphone"></i>
            </Link>
          </li>
        </ul>
        <div className="tab-content mb-4">
          <div className="tab-pane active" id="orders" role="tabpanel">
            <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head mb-3">
                  <div className="icon bg-danger-transparent">
                    <i className="fa fa-microphone"></i>
                  </div>
                  <h3>Speaking</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="accepted" role="tabpanel">
            <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon bg-secondary-transparent">
                    <i className="ion-ios7-bookmarks"></i>
                  </div>
                  <h3>Reading</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="declined" role="tabpanel">
            <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon bg-warning-transparent">
                    <i className="ion-edit"></i>
                  </div>
                  <h3>Writing</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="listening" role="tabpanel">
            <div className="card-body  rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon bg-success-transparent">
                    <i className="ion-headphone"></i>
                  </div>
                  <h3>Listening</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-primary rounded"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlaner;
