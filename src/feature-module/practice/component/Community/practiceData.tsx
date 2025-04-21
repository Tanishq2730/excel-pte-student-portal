import React, { useState, useEffect } from "react";
import { fetchPracticeLogs } from "../../../../api/practiceAPI";
import moment from "moment";

// Define prop types
interface PracticeDataProps {
  questionData: any;
}

interface PracticeLog {
  id: number;
  score: number;
  createdAt: string;
  late_speak: boolean;
  user: {
    name: string;
    profile_image: string | null;
  };
}

const PracticeData: React.FC<PracticeDataProps> = ({ questionData }) => {
  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchPracticeLogs(questionData.id);
        if (res.success) {
          setPracticeLogs(res.data);
        } else {
          setPracticeLogs([]);
        }
      } catch (err) {
        console.error("Error fetching practice logs:", err);
        setPracticeLogs([]);
      }
    };

    if (questionData?.id) {
      getData();
    }
  }, [questionData]);

  return (
    <>
      {practiceLogs.length === 0 ? (
        <p className="text-center text-muted">No practice logs found.</p>
      ) : (
        practiceLogs.map((log, index) => (
          <div
            key={index}
            className="maincard d-flex align-items-center justify-content-between border rounded-pill px-3 py-3 my-3"
            style={{ borderColor: "#00c6b5", maxWidth: "100%", margin: "auto" }}
          >
            <div className="d-flex align-items-center">
              <img
                src={
                  log.user.profile_image
                    ? log.user.profile_image
                    : "assets/img/logo-black.png"
                }
                alt="Profile"
                className="rounded-circle me-2"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />
              <div>
                <div className="fw-bold">{log.user.name}</div>
                <div style={{ fontSize: "0.9rem" }}>
                  {moment(log.createdAt).format("DD/MM/YYYY")}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <button
                className="popbtn border rounded-pill px-2 py-1 me-3"
                style={{
                  backgroundColor: "#f0f0f0",
                  borderColor: "#00c6b5",
                  color: "black",
                  fontSize: "0.9rem",
                }}
              >
                My Score <strong>{log.score.toFixed(2)} / 100</strong>
              </button>
              <div className="text-danger" style={{ fontSize: "0.9rem" }}>
                {log.late_speak
                  ? "Good job! Keep practicing."
                  : "You have started speaking after 3 seconds and your response is not scored."}
              </div>
            </div>

            <button className="btn btn-danger btn-sm ms-3 rounded-circle">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default PracticeData;
