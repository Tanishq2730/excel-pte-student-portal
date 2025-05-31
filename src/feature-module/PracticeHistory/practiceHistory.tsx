import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

type PracticeItem = {
  title: string;
  count: number;
};

type PracticeDateGroup = {
  date: string;
  items: PracticeItem[];
};

const practiceData: PracticeDateGroup[] = [
  {
    date: "2025-03-13",
    items: [
      { title: "Re-order paragraphs", count: 10 },
      { title: "Write from dictation", count: 5 },
      { title: "Reading and writing–Fill in the blanks", count: 16 },
      { title: "Write Essay", count: 4 },
    ],
  },
  {
    date: "2025-03-12",
    items: [{ title: "Write Essay", count: 2 }],
  },
  {
    date: "2025-03-10",
    items: [{ title: "Write Essay", count: 7 }],
  },
];

const PracticeHistory: React.FC = () => {
  // Calculate stats
  const totalPracticed = practiceData
    .map((group) => group.items.reduce((sum, item) => sum + item.count, 0))
    .reduce((a, b) => a + b, 0);

  const days = practiceData.length;
  const today = 0; // You can replace this with actual today's count if available

  return (
    <div className="page-wrapper">
      <div className="container my-4">
        {/* Practice Stats Card */}
        <div className="card p-3 mb-4" style={{ backgroundColor: "#F2F5FF" }}>
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="fw-bold">Practice History</h5>
            <div
              style={{
                backgroundColor: "#f3f3f3",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="bi bi-graph-up-arrow text-danger fs-5"></i>
            </div>
          </div>

          <div className="d-flex justify-content-between text-center mt-3">
            <div className="flex-fill text-start mx-2">
              <h4 className="fw-bold">{today}</h4>
              <p className="mb-1">Today</p>
              <ProgressBar
                now={today}
                max={50}
                variant="success"
                style={{ height: "6px", backgroundColor: "#e4e4c4", borderRadius: "10px" }}
              />
            </div>
            <div className="flex-fill  text-start mx-2">
              <h4 className="fw-bold">{totalPracticed}</h4>
              <p className="mb-1">Total</p>
              <ProgressBar
                now={totalPracticed}
                max={500}
                variant="success"
                style={{ height: "6px", backgroundColor: "#e4e4c4", borderRadius: "10px" }}
              />
            </div>
            <div className="flex-fill text-start mx-2">
              <h4 className="fw-bold">{days}</h4>
              <p className="mb-1">Days</p>
              <ProgressBar
                now={days}
                max={30}
                variant="success"
                style={{ height: "6px", backgroundColor: "#e4e4c4", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>

        {/* Daily Practice List */}
        {practiceData.map((group, index) => {
          const total = group.items.reduce((sum, item) => sum + item.count, 0);

          return (
            <Card className="mb-4 shadow-sm" key={index}>
              <div className="d-flex justify-content-between align-items-center bg-light px-3 py-2 border-bottom">
                <strong>{group.date}</strong>
                <span className="text-muted fw-semibold">
                  Total Practiced: {total} Qs
                </span>
              </div>

              <ul className="list-group list-group-flush">
                {group.items.map((item, idx) => (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={idx}
                  >
                    <span>{item.title}</span>
                    <span className="text-muted">
                      Practiced: {item.count} Qs
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeHistory;
