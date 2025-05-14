import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the type for section
interface Section {
  id: number;
  title: string;
  content: string;
  skills: string[];
}

interface PtetestoneProps {
  isOpen: number[]; // Corrected type here to an array of numbers (section IDs)
  onSkillSelect: (skills: string[]) => void;
}

const Ptetestone: React.FC<PtetestoneProps> = ({ isOpen, onSkillSelect }) => {
  const sections: Section[] = [
    {
      id: 1,
      title: "Read Aloud",
      content:
        "Question: 6 to 7<br> Score: 15 points each (5 content, 5 pronunciation, 5 oral fluency) <br>Partial credit: Speaking & Reading section.",
      skills: ["Speaking", "Reading", "Pronunciation", "Oral Fluency"],
    },
    {
      id: 2,
      title: "Repeat Sentence",
      content:
        "Question: 5 to 6<br> Score: 13 points each (3 content, 5 pronunciation, 5 oral fluency)<br> Partial credit: Speaking & Listening section.",
      skills: ["Listening", "Speaking", "Pronunciation", "Oral Fluency"],
    },
    {
      id: 3,
      title: "Describe Image",
      content:
        "Question: 4 to 5<br> Score: 15 points each (5 content, 5 pronunciation, 5 oral fluency)<br> Partial credit: Speaking section.",
      skills: ["Speaking", "Pronunciation", "Oral Fluency"],
    },
    {
      id: 4,
      title: "Retell Lecture",
      content:
        "Question: 1 to 2 <br>Score: 15 points each (5 content, 5 pronunciation, 5 oral fluency)<br> Partial credit: Speaking & Listening section.",
      skills: ["Listening", "Speaking", "Pronunciation", "Oral Fluency"],
    },
    {
      id: 5,
      title: "Answer Short Question",
      content:
        "Question: 6 to 7<br> Score: 1 point Partial <br>credit: Speaking & Listening section.",
      skills: ["Speaking", "Listening", "Vocabulary"],
    },
    {
      id: 6,
      title: "Summarise Written Text",
      content:
        "Question: 1 to 2<br> 7 points each (2 content, 1 form, 2 grammar, 2 vocab)<br> Partial credit: Writing & Reading section.",
      skills: ["Writing", "Reading", "Vocabulary", "Grammar"],
    },
    {
      id: 7,
      title: "Write Essay",
      content:
        "Question: 1 to 2<br> Score: 15 points (3 content, 2 form, 2 grammar, 2 spellings, 2 vocab, 2 linguistic, 2 coherence)<br> Partial credit: Writing section.",
      skills: [
        "Writing",
        "Grammar",
        "Vocabulary",
        "Spelling",
        "Written Discourse",
      ],
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
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="card-header bg-primary text-white"
        style={{ padding: "15px", borderRadius: "15px 15px 0 0" }}
      >
        <h5 className="mb-0 text-white">PART 1: SPEAKING AND WRITING</h5>
        <small>54 - 67 minutes</small>
      </div>

      <div className="list-group list-group-flush">
        {sections.map((section) => (
          <React.Fragment key={section.id}>
            <button
              className={`list-group-item list-group-item-action ${
                openSections.includes(section.id) ? "active" : ""
              }`}
              onClick={() => toggleSection(section.id, section.skills)}
              style={{
                backgroundColor: openSections.includes(section.id)
                  ? "#343a40"
                  : "#f8f9fa",
                color: openSections.includes(section.id) ? "white" : "black",
                border: "1px solid #ddd",
                textAlign:'center'
              }}
            >
              {section.title}
            </button>

            <div
              className={`collapse ${
                openSections.includes(section.id) ? "show" : ""
              }`}
            >
              <div
                className="list-group-item p-3"
                style={{ backgroundColor: "#f1f1f1",textAlign:'center' }}
              >
                <p dangerouslySetInnerHTML={{ __html: section.content }}></p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Ptetestone;
