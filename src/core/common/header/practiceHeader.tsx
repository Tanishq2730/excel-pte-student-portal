import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";
import { fetchAllTypes } from "../../../api/commonAPI";
import { useDispatch } from "react-redux";
import { setSubtypeValue } from "../../data/redux/practiceSlice";

interface PracticeHeaderProps {
  showMegaMenu: boolean;
  setShowMegaMenu: (show: boolean) => void;
}

interface Subtype {
  id: number;
  sub_name: string;
  ai_score: number;
  order: number;
}

interface PracticeType {
  id: number;
  name: string;
  Subtypes: Subtype[];
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

const typeIcons: { [key: string]: string } = {
  Speaking: "fas fa-microphone",
  Writing: "fas fa-pen",
  Reading: "fas fa-book-open",
  Listening: "fas fa-headphones",
};

const PracticeHeader = ({ showMegaMenu, setShowMegaMenu }: PracticeHeaderProps) => {
  const [practiceTypes, setPracticeTypes] = useState<PracticeType[]>([]);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const getTypes = async () => {
      try {
        const res = await fetchAllTypes();
        setPracticeTypes(res.data);
      } catch (err) {
        console.error("Error fetching practice types:", err);
      }
    };
    getTypes();

    if (!localStorage.getItem("mocktestType")) {
      localStorage.setItem("mocktestType", "Academic");
    }
  }, []);

  // Close the mega menu on route change
  useEffect(() => {
    setShowMegaMenu(false);
  }, [location.pathname]);

  const getRoutePath = (name: string): string => {
    const routeKey = routeNameMap[name];
    if (!routeKey) console.warn(`No route matched for: ${name}`);
    return routeKey ? all_routes[routeKey] : "#";
  };

  const getLinkPath = (route: string, subtypeId: number, questionId?: number | null): string => {
    let path = route.replace(":subtype_id", subtypeId.toString());
    if (questionId) {
      path = path.replace(":question_id?", questionId.toString());
    } else {
      path = path.replace("/:question_id?", "");
    }
    return path;
  };

  return (
    <div className="practice-header-wrapper">
      <span className="sub-menu">
        Practice <i className="ion-chevron-down"></i>
      </span>
      {showMegaMenu && (
        <div className="mega-menu">
          <div className="innermegamenu">
            <div className="card-body">
              <ul className="nav nav-pills justify-content-start mx-0 nav-style-2 mb-3" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#pte-academic"
                    role="tab"
                    aria-selected="false"
                    onClick={() => localStorage.setItem("mocktestType", "Academic")}
                  >
                    PTE Academic / UKVI
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#pte-core"
                    role="tab"
                    aria-selected="true"
                    onClick={() => localStorage.setItem("mocktestType", "Core")}
                  >
                    PTE Core
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane text-muted" id="pte-academic" role="tabpanel">
                  <div className="tabinnerasection">
                    {practiceTypes.map(
                      (type) =>
                        type.name !== "All" && (
                          <div className="mega-column" key={type.id}>
                            <h6>
                              <i className={typeIcons[type.name] || "fas fa-folder"}></i>
                              {type.name}
                            </h6>
                            <hr className="border-primary" />
                            {type.Subtypes.sort((a, b) => a.order - b.order).map((sub) => (
                              <Link
                                key={sub.id}
                                to={getLinkPath(getRoutePath(sub.sub_name), sub.id, null)}
                                onClick={() => {
                                  localStorage.setItem("subtypeId", sub.id.toString());
                                  setShowMegaMenu(false); // Close menu on click
                                }}
                              >
                                {sub.sub_name}
                                {sub.ai_score ? <span className="ai-score">AI Score</span> : null}
                              </Link>
                            ))}
                          </div>
                        )
                    )}
                  </div>
                </div>

                <div className="tab-pane show active text-muted" id="pte-core" role="tabpanel">
                  <div className="tabinnerasection">
                    {practiceTypes.map(
                      (type) =>
                        type.name !== "All" && (
                          <div className="mega-column" key={type.id}>
                            <h6>
                              <i className={typeIcons[type.name] || "fas fa-folder"}></i>
                              {type.name}
                            </h6>
                            <hr className="border-primary" />
                            {type.Subtypes.sort((a, b) => a.order - b.order).map((sub) => (
                              <Link
                                key={sub.id}
                                to={getLinkPath(getRoutePath(sub.sub_name), sub.id, null)}
                                onClick={() => {
                                  localStorage.setItem("subtypeId", sub.id.toString());
                                  setShowMegaMenu(false); // Close menu on click
                                }}
                              >
                                {sub.sub_name}
                                {sub.ai_score ? <span className="ai-score">AI Score</span> : null}
                              </Link>
                            ))}
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeHeader;
