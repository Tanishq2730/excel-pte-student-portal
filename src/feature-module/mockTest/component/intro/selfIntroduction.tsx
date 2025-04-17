import React, { useState, useEffect } from "react";

interface Props {
  id: string | undefined;
  session_id: string;
  LoadFinal: () => void;
}

const SelfIntroduction: React.FC<Props> = ({ id, session_id, LoadFinal }) => {
  const [mtime, setmTime] = useState<number>(55);
  const [time2, setTime2] = useState<number>(25); // Countdown timer
  const [recordingtime2, setRecordingtime2] = useState<number>(0);
  const [recordingslide, setRecordingslide] = useState<number>(0);
  const [Background, setBackground] = useState<string>(
    "linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) 0%, #ccc 0%, #ccc 100%)"
  );
  const [showRecordingStoppedModal, setRecordingStoppedModal] = useState<boolean>(false);

  useEffect(() => {
    // Instead of setInterval, we can use a simple countdown approach
    if (time2 > 0) {
      const timeout = setTimeout(() => {
        setTime2(time2 - 1); // Decrease time by 1 second
      }, 1000);

      return () => clearTimeout(timeout); // Clear the timeout when time2 changes or component unmounts
    } else {
      setRecordingtime2(25); // Once the timer reaches 0, recording is considered finished
    }
  }, [time2]); // Re-run this effect whenever time2 changes

  useEffect(() => {
    // Retrieve intro time from localStorage when the component mounts
    let introtime = localStorage.getItem("introtime");
    setmTime(introtime ? parseInt(introtime) : 55);
  }, [mtime]);

  const handlenext = () => {
    setRecordingStoppedModal(true); // Show modal when ready
    LoadFinal(); // Proceed to final stage
  };

  return (
    <div>
      <div className="container mt-25px">
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
            <h5 className="font-weight-normal">- Your plans for future study</h5>
            <h5 className="font-weight-normal">- Why you want to study abroad</h5>
            <h5 className="font-weight-normal">- Why you need to learn English</h5>
            <h5 className="font-weight-normal">- Why you chose this test</h5>
            <br />
          </div>
          <div className="col-md-6">
            <div id="coun" className="descimgage2">
              <p className="text-center"> Recorded Answer </p>
              <p className="text-start">
                {mtime && time2 > 0 && <span>Recording in {time2} Seconds</span>}
                {mtime && time2 === 0 && recordingtime2 !== 25 && (
                  <span>Recording....</span>
                )}
                {mtime && recordingtime2 === 25 && <span>Finished...</span>}
              </p>
              <input
                type="range"
                min="0"
                value={recordingslide}
                readOnly={true}
                max="100"
                className="progress-v3"
                style={{
                  background: Background,
                  textAlign: "center",
                  color: "#000",
                  transform: "rotate(0deg)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-v3">
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col text-right">
              <button className="btn-theme-v3" onClick={handlenext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfIntroduction;
