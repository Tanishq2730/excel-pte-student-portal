import React, { useState, useEffect } from "react";
import { timeSpent } from "../../api/performanceAPI";

const iconMap: Record<string, string> = {
  Speaking: "ion-mic-c",
  Writing: "ion-compose",
  Listening: "ion-headphone",
  Reading: "ion-ios7-bookmarks",
};

const bgClassMap: Record<string, string> = {
  Speaking: "bg-primary-transparent",
  Writing: "bg-success-transparent",
  Listening: "bg-warning-transparent",
  Reading: "bg-danger-transparent",
};
type TimeSpentResponse = {
  data: {
    type_name: string;
    total_time: string;
    type: { name: string };
  }[];
  totalTime: {
    [key: string]: {
      name: string;
      total_time: string;
    }[];
  };
  success: boolean;
};

const TimeSpent = () => {
  const [sectionTimeSummary, setSectionTimeSummary] = useState<any[]>([]);
  const [taskTimeDetails, setTaskTimeDetails] = useState<Record<string, any[]>>({});

  useEffect(() => {
    getTimeSpent();
  }, []);

  const getTimeSpent = async () => {
    const res = await timeSpent();
     if (res?.success) {
      setSectionTimeSummary(res.data.data || []);
      console.log(res.data);
      setTaskTimeDetails(res.data?.totalTime || {});
    }
  };


  const getTotalTimeBySection = (section: string): string => {
    const entry = sectionTimeSummary.find((item) => item.type_name === section);
    return entry ? `${entry.total_time} Min` : "0 Min";
  };

  return (
    <div className="card p-4">
      <div className="row text-center mb-4">
        {Object.keys(bgClassMap).map((section, i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className={`icon timeicon mb-2 ${bgClassMap[section]}`}>
                  <i className={`${iconMap[section]} fs-1`}></i>
                </div>
                <h5>{section}</h5>
                <p className="text-muted">Time Spent: {getTotalTimeBySection(section)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {Object.entries(taskTimeDetails).map(([section, tasks], index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2 mb-3">{section}</h5>
                <table className="table table-borderless mb-0">
                  <tbody>
                    {tasks.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td className="text-end">{item.total_time} Min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSpent;
