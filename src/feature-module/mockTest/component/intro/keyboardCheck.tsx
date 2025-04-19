import React from "react";

const KeyboardCheck: React.FC = () => {
  return (
    <div className="container">
      <div className="mockInfoContent">
        <h4>Keyboard Check</h4>
        <p className="font-weight-bold">
          This is an opportunity to check that you have the correct keyboard.
          <br />
          1. Look at the top row of letters on the keyboard.
          <br />
          2. The letters should appear in this order: Q W E R T Y.
          <br />
          3. If you do not have a Q W E R T Y keyboard, raise your hand to get
          the attention of the Test Administrator.
        </p>
        <img src="assets/img/keyboard.png" className="img-fluid" alt="Keyboard" />
      </div>
    </div>
  );
};

export default KeyboardCheck;
