import React from "react";

const schedule = [
  {
    week: "Week 1",
    days: [
      ["Read Aloud", "Describe Image", "Repeat sentence"],
      ["Write from dictation", "Listening FIB", "Listening HIW"],
      ["Reading FIB", "R/W FIB", "Grammar"],
      ["Reorders"],
      ["Summarize Spoken Test"]
    ]
  },
  {
    week: "Week 2",
    days: [
      ["Listening MCQ, SA, HCS, SMW"],
      ["Write from dictation", "Listening FIB", "Listening HIW"],
      ["Reading FIB", "R/W FIB", "Grammar"],
      ["Reorders"],
      ["Summarize Written Text", "Write Essay"]
    ]
  },
  {
    week: "Week 3",
    days: [
      ["Read Aloud", "Repeat Sentence", "Describe Image, retells"],
      ["Reading FIB", "R/W FIB", "Grammar"],
      ["Write from dictation", "Listening FIB", "Listening HIW"],
      ["Reorders"],
      ["Summarise spoken Text", "Spelling Test"]
    ]
  },
  {
    week: "Week 4",
    days: [
      ["Reading FIB", "R/W FIB", "Grammar"],
      ["Read Aloud, Retell, ASQ", "Repeat Sentence", "Describe Image"],
      ["Write from dictation", "Listening FIB", "Listening HIW"],
      ["Reorders", "Reading FIB"],
      ["Summarise spoken Tex", "Spelling Test"]
    ]
  }
];

const TimeTable: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-4">
          {schedule.map((weekItem, weekIdx) => (
            <div key={weekIdx} className="card mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{weekItem.week}</h5>
                <span className="badge bg-warning text-dark">Next</span>
              </div>
              <div className="card-body">
                <p className="text-muted">09:00 pm to 10:30 pm Sydney time</p>
                <div className="table-responsive">
                  <table className="table table-bordered text-center align-middle schedule-table">
                    <thead className="table-success">
                      <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {weekItem.days.map((dayTasks, dayIdx) => (
                          <td key={dayIdx}>
                            {dayTasks.map((task, taskIdx) => (
                              <div key={taskIdx}>{task}</div>
                            ))}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
