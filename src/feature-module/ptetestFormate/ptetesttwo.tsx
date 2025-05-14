import React, { useState, useEffect } from "react";

// Define the interface for each section
interface Section {
  id: number;
  title: string;
  content: string;
  skills: string[];
}

// Define the props for the Ptetesttwo component
interface PtetesttwoProps {
  isOpen?: number[];
  onSkillSelect?: (skills: string[]) => void;
}

const Ptetesttwo: React.FC<PtetesttwoProps> = ({ isOpen = [], onSkillSelect }) => {
  const sections: Section[] = [
    {
      id: 1,
      title: "Reading And Writing: Fill In The Blanks",
      content:
        "Question: 5 to 6 <br>Score: 1 point for correct response <br>Partial credit: Reading & Writing section.",
      skills: ["Writing", "Reading"],
    },
    {
      id: 2,
      title: "Multiple-Choice, Choose Multiple Answers",
      content:
        "Question: 1 to 2 <br>Score: 1 point for each correct response <br>-1 point for incorrect response <br>Partial credit: Reading section.",
      skills: ["Reading"],
    },
    {
      id: 3,
      title: "Re-Order Paragraphs",
      content:
        "Question: 1 to 2 <br>Score: 1 point for correct pairs<br> Partial credit: Reading section.",
      skills: ["Reading"],
    },
    {
      id: 4,
      title: "Reading: Fill In The Blanks",
      content:
        "Question: 5 to 6<br> Score: 1 point for each correct response<br> Partial credit: Reading section.",
      skills: ["Reading"],
    },
    {
      id: 5,
      title: "Multiple-Choice, Choose Single Answer",
      content:
        "Question: 1 to 2 <br>Score: 1 point for each correct response<br> Partial credit: Reading section.",
      skills: ["Reading"],
    },
  ];

  // State to manage open sections
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [openPT, setOpenPT] = useState<boolean>(false);

  // Effect to open sections based on `isOpen` prop
  useEffect(() => {
    setOpenSections(isOpen || []);
  }, [isOpen]);

  // Function to toggle the section's open/close state and notify parent about selected skills
  const toggleSection = (id: number, skills: string[]) => {
    setOpenSections((prevOpenSections) =>
      prevOpenSections.includes(id)
        ? prevOpenSections.filter((sectionId) => sectionId !== id)
        : [...prevOpenSections, id]
    );

    if (onSkillSelect && !openSections.includes(id)) {
      setOpenPT(true);
      onSkillSelect(skills); // Notify parent with relevant skills
    } else {
      setOpenPT(false);
      onSkillSelect?.([]); // Notify parent with empty skills if section is closed
    }
  };

  return (
    <div
      className="card-container"
      style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div
        className="card-headers bg-primary text-white"
        style={{
          padding: "15px",
          borderRadius: "15px 15px 0 0",
        }}
      >
        <h5 className="mb-0 text-white">PART 2: READING</h5>
        <small>29 - 30 minutes</small>
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

export default Ptetesttwo;
