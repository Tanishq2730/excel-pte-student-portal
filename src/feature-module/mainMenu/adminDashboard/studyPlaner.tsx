import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { StudyPlaner as StudyPlanerAPI } from "../../../api/dashboardAPI";

interface StudyPlanerType {
  attempted: number;
  notAttempted: number;
}
interface StudyPlanItem {
  id: number;
  typeId: number;
  sub_type_id: number;
  date: string;
  question_numbers: number;
  Type: {
    id: number;
    name: string;
  };
  Subtype: {
    id: number;
    sub_name: string;
  };
}

type StudyPlanerData = StudyPlanItem[];

const StudyPlaner: React.FC = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [studyPlanData, setStudyPlanData] = useState<StudyPlanerData>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number>(1);
  const [planer, setPlaner] = useState<StudyPlanerType>({
    attempted: 0,
    notAttempted: 0,
  });

  useEffect(() => {
    if (date) getPlaner();
  }, [date, selectedTypeId]);

  const getPlaner = async () => {
    try {
      const formattedDate = date
        ? `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
        : "";
      const res = await StudyPlanerAPI(formattedDate, selectedTypeId);
      if (res?.success && Array.isArray(res.data)) {
        setStudyPlanData(res.data);
      }
    } catch (err) {
      console.error("Error fetching study plan data:", err);
    }
  };

  const renderBars = (typeId: number) => {
    const items = studyPlanData.filter((item) => item.typeId === typeId);

    return items.map((item, idx) => (
      <div className="bar" key={idx}>
        <div className="bardetail">
          <h5>{item.Subtype.sub_name}</h5>
          <span>0/{item.question_numbers}</span>
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
    ));
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
          {[1, 2, 3, 4].map((id, i) => (
            <li className="nav-item" key={id}>
              <button
                className={`nav-link ${selectedTypeId === id ? "active" : ""}`}
                onClick={() => setSelectedTypeId(id)}
              >
                {id === 1 && <i className="fa fa-microphone" />}
                {id === 2 && <i className="ion-edit" />}
                {id === 3 && <i className="ion-ios7-bookmarks" />}
                {id === 4 && <i className="ion-headphone" />}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content mb-4">
          <div className="tab-pane active" id="orders" role="tabpanel">
            <div className="card-body rounded-3">
              <div className="studycontent">
                <div className="head mb-3">
                  <div className="icon bg-danger-transparent">
                    <i className="fa fa-microphone"></i>
                  </div>
                  <h3>Speaking</h3>
                </div>
                {renderBars(1)}
              </div>
            </div>
          </div>
          <div className="tab-pane" id="accepted" role="tabpanel">
            <div className="card-body rounded-3">
              <div className="studycontent">
                <div className="head mb-3">
                  <div className="icon bg-danger-transparent">
                    <i className="fa fa-microphone"></i>
                  </div>
                  <h3>Writing</h3>
                </div>
                {renderBars(2)}
              </div>
            </div>
          </div>
          <div className="tab-pane" id="declined" role="tabpanel">
            <div className="card-body rounded-3">
              <div className="studycontent">
                <div className="head mb-3">
                  <div className="icon bg-danger-transparent">
                    <i className="fa fa-microphone"></i>
                  </div>
                  <h3>Reading</h3>
                </div>
                {renderBars(3)}
              </div>
            </div>
          </div>
          <div className="tab-pane" id="listening" role="tabpanel">
            <div className="card-body rounded-3">
              <div className="studycontent">
                <div className="head mb-3">
                  <div className="icon bg-danger-transparent">
                    <i className="fa fa-microphone"></i>
                  </div>
                  <h3>Listening</h3>
                </div>
                {renderBars(4)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlaner;
