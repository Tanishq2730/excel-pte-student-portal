import React, { useState } from "react";

const Session: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<"British" | "American">("British");

  return (
    <div className="container">
      <p></p>
      <h4>
        <strong>Non-Disclosure Agreement Reminder</strong>
      </h4>

      <p>
        This is a reminder of the non-disclosure agreement that you accepted
        when you scheduled this test and when you signed in today.
      </p>

      <p>
        •&nbsp;&nbsp;This test is confidential and you must not disclose it to
        any third party.
      </p>

      <p>
        •&nbsp;&nbsp;You are not allowed to disclose, publish, reproduce, or
        transmit this test, in whole or in part, verbal or written, electronic
        or mechanical. For any purpose, without prior written permission of
        ExcelPTE.
      </p>

      <p style={{ color: "#ff0027" }}>
        <b>
          Disclaimer: We have enabled the option of "skip button" for our
          testing purposes and "skip timer" button to skip the practice time
          mainly in the speaking section so that students can ATTEMPT the
          question directly by clicking on the "skip timer" button and can save
          their time. However, these two options are not available in the real
          PTE ACADEMIC TEST.
        </b>
      </p>

      <div className="languageCard">
        <div className="container">
          <div className="icon">
            <i className="fa fa-globe"></i>
          </div>
          <p className="title">
            Please Select The Language Style For The Writing Score Check
          </p>
          <div className="options">
            <label className={`option ${selectedLanguage === "British" ? "active" : ""}`}>
            <input
              type="radio"
              name="language"
              value="British"
              checked={selectedLanguage === "British"}
              onChange={() => {
                setSelectedLanguage("British");
                localStorage.setItem("languageStyle", "British");
              }}
            />
              British (UK)
            </label>
            <label className={`option ${selectedLanguage === "American" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="language"
                  value="American"
                  checked={selectedLanguage === "American"}
                  onChange={() => {
                    setSelectedLanguage("American");
                    localStorage.setItem("languageStyle", "American");
                  }}
                />
              American (US)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
