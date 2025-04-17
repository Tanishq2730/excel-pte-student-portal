import React from "react";

const HeadsetCheck: React.FC = () => {
  return (
    <div className="container">
      <div className="mockInfoContent">
        <h4>Headset Check</h4>
        <p>
          This is an opportunity to check that your headset is working
          correctly.
          <br />
          1. Put your headset on and adjust it so that it fits comfortably over
          your ears.
          <br />
          2. When you are ready, click on the ► button. You will hear a short
          recording.
          <br />
          3. If you do not hear anything in your headphones while the status
          reads "Playing", please contact the system administrator.
          <br />
        </p>
        <audio controls style={{ height: "40px", width: "300px" }}>
          <source src="/assets/testaudio.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default HeadsetCheck;
