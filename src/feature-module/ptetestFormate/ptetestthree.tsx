import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the type for section
interface Section {
  id: number;
  title: string;
  content: string;
  skills: string[];
}

interface PtetestthreeProps {
  isOpen: number[]; // Corrected type here to an array of numbers (section IDs)
  onSkillSelect: (skills: string[]) => void;
}

const Ptetestthree: React.FC<PtetestthreeProps> = ({ isOpen, onSkillSelect }) => {
  const sections: Section[] = [
    {
      id: 1,
      title: "Summarise Spoken Text",
      content:
        "Question: 1 to 2 <br>Score: 10 points each (2cont, 2form, 2spell, 2gram, 2vocab)<br> Partial credit: Listening & Writing section.",
      skills: ["Writing", "Listening", "Vocabulary", "Grammar", "Spelling"],
    },
    {
      id: 2,
      title: "Multiple-Choice, Choose Multiple Answers",
      content:
        "Question: 1 to 2<br> Score: 1 point each for correct response<br> -1 point each for incorrect response <br>Partial credit: Listening section.",
      skills: ["Listening"],
    },
    {
      id: 3,
      title: "Fill in the blanks",
      content:
        "Question: 3 to 4<br> Score: 1 point for each correct word <br>Partial credit: Listening & Writing section.",
      skills: ["Writing", "Listening"],
    },
    {
      id: 4,
      title: "Highlight Correct Summary",
      content:
        "Question: 1 to 2 <br>Score: 1 point for correct response <br>Partial credit: Reading & Listening section.",
      skills: ["Listening", "Reading"],
    },
    {
      id: 5,
      title: "Multiple-Choice, Choose Single Answer",
      content:
        "Question: 1 to 2 <br>Score: 1 point for correct response <br>Partial credit: Listening section.",
      skills: ["Listening"],
    },
    {
      id: 6,
      title: "Select Missing Words",
      content:
        "Question: 1 to 2 <br>Score: 1 point for correct response<br> Partial credit: Listening section.",
      skills: ["Listening"],
    },
    {
      id: 7,
      title: "Highlight Incorrect Words",
      content:
        "Question: 3 to 4<br> Score: 1 point for each correct word <br>1 point for each incorrect word <br>Partial credit: Listening & Reading section.",
      skills: ["Listening", "Reading"],
    },
    {
      id: 8,
      title: "Write From Dictation",
      content:
        "Question: 3 to 4<br> score: 1 point for each correct word <br>Partial credit: Listening & Writing section.",
      skills: ["Listening", "Writing"],
    },
  ];

  const [openSections, setOpenSections] = useState<number[]>([]);
  const [openPT, setOpenPT] = useState(false);

  useEffect(() => {
    setOpenSections(isOpen || []); // Ensure isOpen is an array of numbers
  }, [isOpen]);

  const toggleSection = (id: number, skills: string[]) => {
    setOpenSections((prevOpenSections) =>
      prevOpenSections.includes(id)
        ? prevOpenSections.filter((sectionId) => sectionId !== id)
        : [...prevOpenSections, id]
    );

    if (onSkillSelect && !openSections.includes(id)) {
      setOpenPT(true);
      onSkillSelect(skills);
    } else {
      onSkillSelect([]);
      setOpenPT(false);
    }
  };

  return (
    <div
      className="card mb-4"
      style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div
        className="card-header bg-primary text-white"
        style={{ padding: "15px", borderRadius: "15px 15px 0 0" }}
      >
        <h5 className="mb-0 text-white">PART 3: LISTENING</h5>
        <small>30 - 43 minutes</small>
      </div>

      <div className="list-group list-group-flush">
        {sections.map((section) => (
          <React.Fragment key={section.id}>
            <button
              className={`list-group-item list-group-item-action ${openSections.includes(section.id) ? "active" : ""}`}
              onClick={() => toggleSection(section.id, section.skills)}
              style={{
                backgroundColor: openSections.includes(section.id) ? "#343a40" : "#f8f9fa",
                color: openSections.includes(section.id) ? "white" : "black",
                border: "1px solid #ddd",
                textAlign:'center'
              }}
            >
              {section.title}
            </button>

            <div
              className={`collapse ${openSections.includes(section.id) ? "show" : ""}`}
            >
              <div className="list-group-item p-3" style={{ backgroundColor: "#f1f1f1",textAlign:'center' }}>
                <p dangerouslySetInnerHTML={{ __html: section.content }}></p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Ptetestthree;
