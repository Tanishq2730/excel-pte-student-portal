import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../../../api/practiceAPI";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";

interface QuestionData {
  difficulties: string;
  new_question?: boolean;
  weekly?: boolean;
  attemptedCount: number;
  bookmarked: boolean;
}

interface QuestionNavigationProps {
  questionData: QuestionData | null;
  onAnswerClick: () => void;
  onRestart: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void; // Optional
}

const routeNameMap: { [key: string]: keyof typeof all_routes } = {
  "Read Aloud": "readAloud",
  "Repeat Sentence": "repeatSentence",
  "Describe Image": "describeImage",
  "Re-tell Lecture": "reTellLecture",
  "Answer Short Question": "answerShortQuestion",
  "Respond to Situation": "respondSituation",
  "Summarize Written Text": "summarizeWritinText",
  "Write Essay": "writeEssay",
  "Write Email": "writeEmail",
  "Reading and Writing Fill in the Blanks": "readingWritngFillBlank",
  "MC, Choose Multiple Answer": "multipleChooseAnswer",
  "MC, Choose Single Answer": "multipleChooseSingleAnswer",
  "Reading Fill in the Blanks": "fillInTheBlanksRead",
  "Re-order Paragraphs": "reorderParagraph",
  "Summarize Spoken Text": "summarizeSpokenText",
  "MC, Select Multiple Answer": "multipleChooseAnswerListen",
  "Fill in the Blanks": "fillInTheBlanks",
  "Highlight Correct Summary": "highlightCorrectSummary",
  "MC, Select Single Answer": "multipleChooseSingleAnswerListen",
  "Select Missing Word": "selectMissingWord",
  "Highlight Incorrect Words": "highlightIncorrectWord",
  "Write from Dictation": "writeFromDictation",
};

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questionData,
  onAnswerClick,
  onRestart,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleToggleChange = () => {
    setIsAnswerVisible(!isAnswerVisible);
    onAnswerClick(); // still trigger the answer action
  };
  const subtypeId = localStorage.getItem("subtypeId");
  const subtypeIdNumber = subtypeId ? parseInt(subtypeId) : null;
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getQuestionLink = (q: any): string => {
    const routeKey = routeNameMap[q.Subtype?.sub_name];
    const route = all_routes[routeKey];
    if (!route) return "#";
    return route
      .replace(":subtype_id", q.Subtype?.id.toString())
      .replace("/:question_id?", `/${q.id}`);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setSelectedIndex(index); // Update state
    const selectedQuestion = questionList[index];
    if (selectedQuestion) {
      const url = getQuestionLink(selectedQuestion);
      navigate(url);
    }
  };

  // Update selectedIndex when URL changes or after Next/Previous button clicks
  useEffect(() => {
    const updateSelectedIndex = () => {
      const currentId = Number(window.location.pathname.split("/").pop());
      const foundIndex = questionList.findIndex((q: any) => q.id === currentId);
      setSelectedIndex(foundIndex >= 0 ? foundIndex : 0);
    };

    if (questionList.length > 0) {
      updateSelectedIndex();
    }
  }, [questionList, window.location.pathname]);

  useEffect(() => {
    const getTypes = async () => {
      try {
        if (subtypeIdNumber != null) {
          const res = await fetchQuestions(subtypeIdNumber);
          setQuestionList(res.data);
          if (res.data.length > 0) {
            const currentId = Number(window.location.pathname.split("/").pop());
            const foundIndex = res.data.findIndex((q: any) => q.id === currentId);
            setSelectedIndex(foundIndex >= 0 ? foundIndex : 0);
          }
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    getTypes();
  }, [subtypeIdNumber]);

  const handleSubmit = async () => {
    if (onSubmit) {
      setIsLoading(true);
      try {
        await onSubmit();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const Preloader = () => {
    return (
      <div id="global-loader">
        <div className="page-loader"></div>
      </div>
    );
  };

  const handleNextWithSync = () => {
    onNext();
    // The selectedIndex will be automatically updated by the useEffect when the URL changes
  };

  const handlePreviousWithSync = () => {
    onPrevious();
    // The selectedIndex will be automatically updated by the useEffect when the URL changes
  };

  return (
    <div className="row">
      <div className="col-md-6">
        {isLoading && <Preloader />}
        <div className="btnBottom">
          {onSubmit && (
            <a href="#community" className="btn btn-info" onClick={handleSubmit}>
              Submit
            </a>
          )}
          <button className="btn btn-info mx-3" onClick={onRestart}>
            Re-Start
          </button>

          <div className="form-check form-switch d-inline-block">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked={isAnswerVisible}
              onChange={handleToggleChange}
              style={{ width: '3em', height: '1.5em', marginTop: '0em', border: '1px solid #848484' }}
            />
            <label
              className="form-check-label ms-2"
              htmlFor="flexSwitchCheckChecked"
            >
              {isAnswerVisible ? "Hide Answer" : "Show Answer"}
            </label>
          </div>

        </div>
      </div>
      <div className="col-md-6">
        <div className="btnBottom text-end d-flex justify-content-end">
          <button className="btn btn-info" onClick={handlePreviousWithSync}>
            Previous
          </button>
          <div className="mx-3 btn btn-primary d-flex align-items-center p-0">
            <select
              className="form-select bg-info text-white"
              aria-label="Question select"
              onChange={handleQuestionChange}
              value={selectedIndex !== null ? selectedIndex : ""}
              style={{ width: '6em' }}
            >
              {questionList.map((_, index) => (
                <option key={index} value={index}>
                  {index + 1}
                </option>
              ))}
            </select>
            <small style={{ fontSize: '0.85em', color: '#fff' ,width:'2em', }}>
             {questionList.length}
            </small>
          </div>
          <button className="btn btn-info" onClick={handleNextWithSync}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
