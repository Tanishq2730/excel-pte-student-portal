import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import StudyPlaner from "../mainMenu/adminDashboard/studyPlaner";
import RTLMarquee from "../../core/common/RLTMarquee";

const StudyPlan: React.FC = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container my-2">
          <div className="studyPlan">
            <div className="row">
              <div className="col-md-6">
                <div className="card p-2">
                  <Calendar
                    className="datepickers mb-2"
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    inline
                    style={{ width: "100% !important" }}
                  />
                  <div className="attemptedicon">
                    <div className="innerattempt">
                      Attempted{" "}
                      <p
                        className="bg-success"
                        style={{
                          width: "1em",
                          height: "1em",
                          marginLeft: "10px",
                          borderRadius: "100px",
                        }}
                      ></p>
                    </div>
                    <div className="innerattempt">
                      Not Attempted{" "}
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="card p-3">
                  <StudyPlaner />
                  <RTLMarquee text="On weekends kindly attempt Full Mock Tests." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
