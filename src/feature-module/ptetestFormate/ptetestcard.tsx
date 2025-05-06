import React, { useState, useContext } from "react";
import Ptetestone from "./ptetestone";
import Ptetesttwo from "./ptetesttwo";
import Ptetestthree from "./ptetestthree";

// Define type for the openSections state
type SectionState = {
  pteOne: number[];
  pteTwo: number[];
  pteThree: number[];
};

const Ptetestcard: React.FC = () => {
  const [openSections, setOpenSections] = useState<SectionState>({
    pteOne: [],
    pteTwo: [],
    pteThree: [],
  });

  const [isActive, setIsActive] = useState<string[]>([]);

  const handleToggle = (skill: string): void => {
    if (isActive.includes(skill)) {
      // Remove skill if already active
      setIsActive(isActive.filter((s) => s !== skill));
      setOpenSections({ pteOne: [], pteTwo: [], pteThree: [] });
    } else {
      setIsActive([skill]);

      switch (skill) {
        case "Listening":
          setOpenSections({
            pteOne: [2, 4, 5],
            pteTwo: [],
            pteThree: [1, 2, 3, 4, 5, 6, 7, 8],
          });
          break;
        case "Reading":
          setOpenSections({
            pteOne: [1, 6],
            pteTwo: [1, 2, 3, 4, 5],
            pteThree: [4, 7],
          });
          break;
        case "Writing":
          setOpenSections({
            pteOne: [6, 7],
            pteTwo: [1],
            pteThree: [1, 3, 8],
          });
          break;
        case "Speaking":
          setOpenSections({
            pteOne: [1, 2, 3, 4, 5],
            pteTwo: [],
            pteThree: [],
          });
          break;
        case "Grammar":
          setOpenSections({
            pteOne: [6, 7],
            pteTwo: [],
            pteThree: [1],
          });
          break;
        case "Oral Fluency":
          setOpenSections({
            pteOne: [1, 2, 3, 4],
            pteTwo: [],
            pteThree: [],
          });
          break;
        case "Pronunciation":
          setOpenSections({
            pteOne: [1, 2, 3, 4],
            pteTwo: [],
            pteThree: [],
          });
          break;
        case "Spelling":
          setOpenSections({
            pteOne: [7],
            pteTwo: [],
            pteThree: [1],
          });
          break;
        case "Vocabulary":
          setOpenSections({
            pteOne: [5, 6, 7],
            pteTwo: [],
            pteThree: [1],
          });
          break;
        case "Written Discourse":
          setOpenSections({
            pteOne: [7],
            pteTwo: [],
            pteThree: [],
          });
          break;
        default:
          setOpenSections({ pteOne: [], pteTwo: [], pteThree: [] });
      }
    }
  };

  const handleSkillSelect = (skills: string[]): void => {
    setIsActive(skills);
    console.log(skills);
  };

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-5">
        <div className="mainHead pb-3">
            <h3>PTE Test Formate</h3>
          </div>
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <Ptetestone
                    isOpen={openSections.pteOne}
                    onSkillSelect={handleSkillSelect}
                  />
                </div>
                <div className="col-md-4">
                  <Ptetesttwo
                    isOpen={openSections.pteTwo}
                    onSkillSelect={handleSkillSelect}
                  />
                </div>
                <div className="col-md-4">
                  <Ptetestthree
                    isOpen={openSections.pteThree}
                    onSkillSelect={handleSkillSelect}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="skills-card">
                  <div className="card-header">
                    <div className="card-title">PARTIAL CREDIT TO</div>
                  </div>

                  <div className="skills-section">
                    <div className="skills-category communicative">
                      COMMUNICATIVE SKILLS
                    </div>
                    <ul className="skills-list">
                      {["Listening", "Reading", "Speaking", "Writing"].map(
                        (skill) => (
                          <li
                            key={skill}
                            onClick={() => handleToggle(skill)}
                            className={
                              isActive.includes(skill) ? "active" : "inactive"
                            }
                          >
                            {skill.toUpperCase()}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="skills-section">
                    <div className="skills-category communicative">
                      ENABLING SKILLS
                    </div>
                    <ul className="skills-list">
                      {[
                        "Grammar",
                        "Oral Fluency",
                        "Pronunciation",
                        "Spelling",
                        "Vocabulary",
                        "Written Discourse",
                      ].map((skill) => (
                        <li
                          key={skill}
                          onClick={() => handleToggle(skill)}
                          className={
                            isActive.includes(skill) ? "active" : "inactive"
                          }
                        >
                          {skill.toUpperCase()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ptetestcard;
