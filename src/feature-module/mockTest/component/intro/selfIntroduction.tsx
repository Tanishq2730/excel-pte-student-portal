import React, { useState, useEffect } from "react";
// import "./SelfIntroduction.css";

interface Props {
  id: string | undefined;
  session_id: string;
  LoadFinal: () => void;
}

const SelfIntroduction: React.FC<Props> = ({ id, session_id, LoadFinal }) => {
  const [mtime, setmTime] = useState<number>(55);
  const [time2, setTime2] = useState<number>(25);
  const [recordingStoppedModal, setRecordingStoppedModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (time2 > 0) {
      const interval = setInterval(() => {
        setTime2((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRecordingStoppedModal(true); // ✅ fixed function name
    }
  }, [time2]);

  useEffect(() => {
    let introtime = localStorage.getItem("introtime");
    setmTime(introtime ? parseInt(introtime) : 55);
  }, []);

  const handlenext = () => {
    setRecordingStoppedModal(true);
    LoadFinal();
  };

  const progress = ((25 - time2) / 25) * 100;

  return (
    <div>
      <div className="container">
        <div className="mockInfoContent">
          <h6 className="font-weight-bold">
            Read the prompt below. In 25 seconds, you must reply in your own
            words, as naturally and clearly as possible. You have 30 seconds to
            record your response. Your response will be sent together with your
            score report to the institutions selected by you.
          </h6>
          <br />
          <h5 className="mb-3 font-weight-normal">
            Please introduce yourself. For example, you could talk about one of
            the following.
          </h5>
          <div className="row">
            <div className="col-md-6">
              <h5 className="font-weight-normal">- Your interests</h5>
              <h5 className="font-weight-normal">
                - Your plans for future study
              </h5>
              <h5 className="font-weight-normal">
                - Why you want to study abroad
              </h5>
              <h5 className="font-weight-normal">
                - Why you need to learn English
              </h5>
              <h5 className="font-weight-normal">- Why you chose this test</h5>
              <br />
            </div>

            <div className="col-md-6">
              <div className="record-box">
                <p className="record-title">Recorded Answer</p>
                <p className="record-status">
                  {time2 > 0 ? `Recording in ${time2} Seconds` : "Finished..."}
                </p>

                <div className="progress-wrapper">
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div
                    className="progress-indicator"
                    style={{ left: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {recordingStoppedModal && (
          <div className="modal-backdrop">
            <div className="modal-box">
              <h4>Time is up!</h4>
              <button onClick={() => setRecordingStoppedModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        <div className="footer-v3">
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col text-end">
                <button
                  className="btn btn-primary"
                  onClick={handlenext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfIntroduction;
