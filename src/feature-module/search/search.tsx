import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

const initialSectionData = [
  {
    title: "Speaking",
    iconClass: "fas fa-microphone",
    items: [
      "READ ALOUD",
      "REPEAT SENTENCE",
      "DESCRIBE IMAGE",
      "RE-TELL LECTURE",
      "ANSWER SHORT QUESTION",
    ],
    borderColor: "border-warning",
  },
  {
    title: "Writing",
    iconClass: "fas fa-pen",
    items: ["SUMMARIZE WRITTEN TEXT", "WRITE ESSAY"],
    borderColor: "border-primary",
  },
  {
    title: "Reading",
    iconClass: "fas fa-book-open",
    items: [
      "R&W: FILL IN THE BLANKS",
      "MCQ - MULTIPLE",
      "RE-ORDER PARAGRAPH",
      "READING FILL IN THE BLANKS",
      "MCQ - SINGLE",
    ],
    borderColor: "border-success",
  },
  {
    title: "Listening",
    iconClass: "fas fa-headphones",
    items: [
      "SUMMARIZE SPOKEN TEXT",
      "MCQ - MULTIPLE",
      "FILL IN THE BLANKS",
      "HIGHLIGHT CORRECT SUMMARY",
      "MCQ - SINGLE",
      "SELECT MISSING WORDS",
      "HIGHLIGHT INCORRECT WORDS",
      "WRITE FROM DICTATION",
    ],
    borderColor: "border-info",
  },
];

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<{
    section: string;
    item: string;
  } | null>(null); // Initially null

  const handleSelect = (section: string, item: string) => {
    setSelectedItem({ section, item });
  };

  return (
    <div className="page-wrappers">
      <div className="container p-4">
        {/* Search Bar */}
        <Form.Control
          type="text"
          placeholder="Question Content / Title / Number"
          className="mb-4 advanceSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        />

        <div className="row g-4">
          {initialSectionData.map((section, index) => (
            <Col md={3} key={index}>
              <div className="d-flex align-items-center mb-2">
                <i
                  className={`${section.iconClass} me-2`}
                  style={{ fontSize: "1.5rem", color: "#1b507a" }}
                ></i>
                <h5 className="fw-bold mb-0">{section.title}</h5>
              </div>
              <hr className={section.borderColor} />
              <ul className="list-unstyled">
                {section.items
                  .filter((item) => item.includes(searchTerm))
                  .map((item, idx) => {
                    const isSelected =
                      selectedItem?.section === section.title &&
                      selectedItem?.item === item;
                    return (
                      <li
                        key={idx}
                        onClick={() => handleSelect(section.title, item)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: isSelected
                            ? "rgb(221 236 255)"
                            : "transparent",
                          borderRadius: "5px",
                          padding: "6px 8px",
                          fontWeight: isSelected ? 600 : 400,
                          color: "#333",
                        }}
                      >
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </Col>
          ))}
        </div>

        {/* Show card only when an item is selected */}
        {selectedItem && (
          <div className="searchCard">
            <div className="card p-4 mt-4">
              <h5 className="fw-bold">Translator and Interpreter</h5>
              <p className="fw-semibold">Answer:</p>
              <p>
                The speaker was talking about the difference between translators
                and interpreters. Firstly, translation refers to written
                communication whereas interpreting refers to verbal communication.
                Secondly, both jobs require different skills. Thirdly, the
                qualifications and experience required to become either a
                professional translator or interpreter do differ, although both
                roles acquire years of training and qualification which will be
                completely different.
              </p>
              <p className="fw-semibold">Transcription:</p>
              <p style={{ whiteSpace: "pre-line" }}>
                Hello, it's Megan. This week I'm going to talk about the
                difference between translators and interpreters. It's a common
                misconception that translators and interpreters do the same thing.
                So I just like to highlight a few similarities and differences
                between the two. Firstly, translation refers to written
                communication whereas interpreting refers to verbal communication.
                So, for example, a translator will not attend a court hearing to
                verbally translate between the parties involved, but will
                translate the written evidence used in the case. Secondly, both
                jobs require different skills. A translator requires the ability
                to write well and comprehensively into a target language. This
                means they need to have an excellent command of their native
                language. For example, although I can speak French to a good
                standard, I cannot translate from English to French, although I
                could translate from French to English, which means I'm only
                halfway there to being an international player. An interpreter
                needs to be able to speak both languages proficiently. Thirdly,
                the qualifications and experience required to become either a
                professional translator or interpreter do differ. Both roles
                acquire years of training, resulting in different qualifications.
                So just to be clear, translators will translate written texts and
                interpreters will translate verbal communication.
              </p>
              <button className="btn btn-primary" style={{ width: "20%" }}>
                Practice
              </button>
            </div>
            <div className="card p-4 mt-4">
              <h5 className="fw-bold">Translator and Interpreter</h5>
              <p className="fw-semibold">Answer:</p>
              <p>
                The speaker was talking about the difference between translators
                and interpreters. Firstly, translation refers to written
                communication whereas interpreting refers to verbal communication.
                Secondly, both jobs require different skills. Thirdly, the
                qualifications and experience required to become either a
                professional translator or interpreter do differ, although both
                roles acquire years of training and qualification which will be
                completely different.
              </p>
              <p className="fw-semibold">Transcription:</p>
              <p style={{ whiteSpace: "pre-line" }}>
                Hello, it's Megan. This week I'm going to talk about the
                difference between translators and interpreters. It's a common
                misconception that translators and interpreters do the same thing.
                So I just like to highlight a few similarities and differences
                between the two. Firstly, translation refers to written
                communication whereas interpreting refers to verbal communication.
                So, for example, a translator will not attend a court hearing to
                verbally translate between the parties involved, but will
                translate the written evidence used in the case. Secondly, both
                jobs require different skills. A translator requires the ability
                to write well and comprehensively into a target language. This
                means they need to have an excellent command of their native
                language. For example, although I can speak French to a good
                standard, I cannot translate from English to French, although I
                could translate from French to English, which means I'm only
                halfway there to being an international player. An interpreter
                needs to be able to speak both languages proficiently. Thirdly,
                the qualifications and experience required to become either a
                professional translator or interpreter do differ. Both roles
                acquire years of training, resulting in different qualifications.
                So just to be clear, translators will translate written texts and
                interpreters will translate verbal communication.
              </p>
              <button className="btn btn-primary" style={{ width: "20%" }}>
                Practice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
