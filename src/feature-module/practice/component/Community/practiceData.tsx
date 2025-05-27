import React, { useState, useEffect } from "react";
import {
  fetchPracticeLogs,
  fetchPracticeLog,
} from "../../../../api/practiceAPI";
import moment from "moment";
import SpeakingScoreModal from "../speakingScoreModal";
import WritingScoreModal from "../writingScoreModal";
import ReadingScoreModal from "../readingScoreModal";
import ListeningScoreModal from "../listeningScoreModal";

// Define prop types
interface PracticeDataProps {
  questionData: any;
}

interface PracticeLog {
  id: number;
  score: number;
  createdAt: string;
  late_speak: boolean;
  total_score: number;
  user: {
    name: string;
    profile_image: string | null;
  };
}

const PracticeData: React.FC<PracticeDataProps> = ({ questionData }) => {
  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>([]);
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [selectedLogDetails, setSelectedLogDetails] = useState<any>(null);

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

  const handleScoreClick = async (id: number) => {
    setSelectedLogId(id);
    try {
      const res = await fetchPracticeLog(id);
      if (res.success) {
        const parsedScoreData = JSON.parse(res.data.score_data || "{}");
        setSelectedLogDetails({ ...res.data, score_data: parsedScoreData });
      }
    } catch (err) {
      console.error("Error fetching log detail:", err);
      setSelectedLogDetails(null);
    }
  };

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
              <div
                className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-3"
                style={{ width: "60px", height: "60px" }}
              >
                <i className="ion-person text-white fs-3"></i>
              </div>
              <div>
                <div className="fw-bold">{log.user.name}</div>
                <div style={{ fontSize: "0.9rem" }}>
                  {moment(log.createdAt).format("DD/MM/YYYY")}
                </div>
              </div>
            </div>

            <div className=" align-items-start" style={{ width: "45%" }}>
              <button
                className="popbtn border rounded-pill px-2 py-1 me-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLg"
                onClick={() => handleScoreClick(log.id)}
                style={{
                  backgroundColor: "#f0f0f0",
                  borderColor: "#00c6b5",
                  color: "black",
                  fontSize: "0.9rem",
                }}
              >
                My Score{" "}
                <strong>
                  {log.score} / {log.total_score}
                </strong>
              </button>
              <div className="text-danger" style={{ fontSize: "0.9rem" }}>
                {log.late_speak == false
                  && "You have started speaking after 3 seconds and your response is not scored."}
              </div>
            </div>

            <div>
              <button
                className="btn btn-secondary btn-sm ms-3 rounded-circle"
                data-bs-toggle="modal"
                data-bs-target="#standard-modal"
              >
                <i className="ion-forward"></i>
              </button>
              <button className="btn btn-danger btn-sm ms-3 rounded-circle">
                <i className="fa fa-trash"></i>
              </button>
            </div>
            <div
              className="modal fade"
              id="exampleModalLg"
              tabIndex={-1}
              aria-labelledby="exampleModalLgLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <h4
                      className="modal-title text-white"
                      id="exampleModalLgLabel"
                    >
                      AI Score (Partial credit to : Speaking & Reading)
                    </h4>
                    <button
                      type="button"
                      className="btn-close scorebtnClose"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {questionData?.Type?.name === "Speaking" && (
                      <SpeakingScoreModal logDetail={selectedLogDetails} />
                    )}
                    {questionData?.Type?.name === "Writing" && (
                      <WritingScoreModal logDetail={selectedLogDetails} />
                    )}
                    {questionData?.Type?.name === "Reading" && (
                      <ReadingScoreModal logDetail={selectedLogDetails} />
                    )}
                    {questionData?.Type?.name === "Listning" && (
                      <ListeningScoreModal logDetail={selectedLogDetails} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              id="standard-modal"
              className="modal fade"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="standard-modalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body p-3">
                    <h5>
                      Answer Link Created Send the following link to your
                      friends to share your answer!
                    </h5>
                    <hr />
                    <span>RA#338 APEUni RA EN V2e AI Score 37/90</span>
                    <hr />
                    <p>
                      https://www.apeuni.com/practice/answer_item?model=read_alouds&answer_id=3194598191
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-cancel"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default PracticeData;
