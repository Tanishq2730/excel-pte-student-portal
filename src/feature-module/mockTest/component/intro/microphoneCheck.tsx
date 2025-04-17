import React from "react";

const MicrophoneCheck: React.FC = () => {
  return (
    <div className="container mt-25px">
      <h4>Microphone Check</h4>
      <p className="font-weight-bold">
        This is an opportunity to check that your microphone is working correctly.
        <br />
        1. Make sure your headset is on and the microphone is positioned near your mouth.
        <br />
        2. Click "Record" and say: "Testing, testing, one, two, three".
        <br />
        3. Click "Stop" when done, then click "Playback" to listen.
        <br />
        4. If you can’t hear your voice clearly, contact the administrator.
      </p>

      <div className="descimgage2">
        <p className="text-start">Current status:</p>
        <p className="text-start">Idle</p>

        <input
          type="range"
          min="0"
          max="100"
          value={0}
          readOnly
          className="progress-v3"
          style={{
            background:
              "linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) 0%, #ccc 0%, #ccc 100%)",
          }}
        />

        <br />

        {/* Placeholder for audio element */}
        <audio
          controls
          style={{ height: "40px", width: "300px" }}
          src=""
        >
          Your browser does not support the audio element.
        </audio>

        <br />

        <button
          className="btn btn-theme"
          style={{
            backgroundColor: "#183052",
            color: "#fff",
            border: "none",
            margin: "0 2px",
          }}
        >
          Record
        </button>

        <button
          className="btn btn-theme"
          style={{
            backgroundColor: "#183052",
            color: "#fff",
            border: "none",
            margin: "0 2px",
          }}
        >
          Playback
        </button>

        <button
          className="btn btn-theme"
          style={{
            backgroundColor: "#183052",
            color: "#fff",
            border: "none",
            margin: "0 2px",
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default MicrophoneCheck;
