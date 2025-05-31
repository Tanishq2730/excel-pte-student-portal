import React from "react";

const Introduction: React.FC = () => {
  return (
    <div className="container mt-25px">
      <div className="mockInfoContent">
        <h4>Test Introduction</h4>
        <p className="font-weight-bold">
          This test will measure the English Reading, Writing, Listening and
          Speaking skills that you need in an academic setting.
          <br />
          - The test is divided into 3 parts. Each part may contain a number of
          sections. The sections are individually timed. The timer will be shown
          in the top right corner of your screen. The number of items in the
          section will also be displayed.
          <br />
          <img src="../../../assets/img/timer.png" className="img-fluid my-3" alt="Time" />
          <br />
          - At the beginning of each part you will receive instructions. These
          will provide details on what to expect in that part of the test.
          <br />
          - By clicking on the Next button at the bottom of each screen you
          confirm your answer and move to the next question. If you click on
          Next you will not be able to return to the previous question. You will
          not be able to revisit any questions at the end of the test.
          <br />
          {/* - You will be offered a break of up to 10 minutes after Part 2. The break
        is optional. */}
          - This test makes use of different varieties of English, for example,
          British, American, Australian. You can answer in the standard English
          variety of your choice.
          <br />
        </p>
      </div>
    </div>
  );
};

export default Introduction;
