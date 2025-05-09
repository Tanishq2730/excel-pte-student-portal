import React, { useEffect, useState } from "react";
import { fetchTimetables } from "../../api/studyToolsAPI";
import { Link } from "react-router-dom";
import { all_routes } from "../../feature-module/router/all_routes";

interface Day {
  day: string;
  task: string;
}

interface Timetable {
  id: number;
  week: string;
  description: string;
  time: string;
  days: Day[];
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimeTable: React.FC = () => {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);
  const routes = all_routes;

  useEffect(() => {
    const loadTimetables = async () => {
      try {
        const res = await fetchTimetables();
        if (res.success) {
          setTimetables(res.data);
        }
      } catch (error) {
        console.error("Error fetching timetables:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTimetables();
  }, []);

  if (loading) return <p className="text-center my-5">Loading...</p>;

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-4">
          <div className="mainHead pb-3 mainHeader">
            <Link to={routes.studyTool}>
              <div className="icon">
                <i className="fa fa-arrow-left"></i>
              </div>
            </Link>
            <h3>Time Table</h3>
          </div>
          {timetables.map((weekItem) => {
            // Group tasks by day
            const dayTasksMap: Record<string, string[]> = {};
            weekItem.days.forEach(({ day, task }) => {
              if (!dayTasksMap[day]) {
                dayTasksMap[day] = [];
              }
              dayTasksMap[day].push(task);
            });

            return (
              <div key={weekItem.id} className="card mb-4">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{weekItem.week}</h5>
                  <span className="badge bg-warning text-dark">Next</span>
                </div>
                <div className="card-body">
                  <p className="text-muted">{weekItem.time}</p>
                  <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle schedule-table">
                      <thead className="table-success">
                        <tr>
                          {weekDays.map((day) => (
                            <th key={day}>{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {weekDays.map((day) => (
                            <td key={day}>
                              {dayTasksMap[day]?.length
                                ? dayTasksMap[day].map((task, i) => (
                                    <div key={i}>{task}</div>
                                  ))
                                : "-"}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
