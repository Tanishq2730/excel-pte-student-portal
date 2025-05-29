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
  "MC, Select Multiple Answer": "multipleChooseAnswer",
  "MC, Select Single Answer": "multipleChooseSingleAnswer",
  "Reading Fill in the Blanks": "fillInTheBlanksRead",
  "Re-order Paragraphs": "reorderParagraph",
  "Summarize Spoken Text": "summarizeSpokenText",
  "MC, Choose Multiple Answer": "multipleChooseAnswerListen",
  "Fill in the Blanks": "fillInTheBlanks",
  "Highlight Correct Summary": "highlightCorrectSummary",
  "MC, Choose Single Answer": "multipleChooseSingleAnswerListen",
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
  const [activeTab, setActiveTab] = useState<"Academic" | "Core">("Core");
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

    const defaultTab = localStorage.getItem("mocktestType") as "Academic" | "Core";
    setActiveTab(defaultTab || "Academic");
  }, []);

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

  const shouldHideSubtype = (typeName: string, subName: string): boolean => {
    if (activeTab === "Academic") {
      return (
        (typeName === "Speaking" && subName === "Respond to Situation") ||
        (typeName === "Writing" && subName === "Write Email")
      );
    } else if (activeTab === "Core") {
      return (
        (typeName === "Speaking" && subName === "Re-tell Lecture") ||
        (typeName === "Writing" && subName === "Write Essay")
      );
    }
    return false;
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
                    className={`nav-link ${activeTab === "Academic" ? "active" : ""}`}
                    data-bs-toggle="tab"
                    href="#pte-academic"
                    role="tab"
                    aria-selected={activeTab === "Academic"}
                    onClick={() => {
                      localStorage.setItem("mocktestType", "Academic");
                      setActiveTab("Academic");
                    }}
                  >
                    PTE Academic / UKVI
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === "Core" ? "active" : ""}`}
                    data-bs-toggle="tab"
                    href="#pte-core"
                    role="tab"
                    aria-selected={activeTab === "Core"}
                    onClick={() => {
                      localStorage.setItem("mocktestType", "Core");
                      setActiveTab("Core");
                    }}
                  >
                    PTE Core
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className={`tab-pane text-muted ${activeTab === "Academic" ? "show active" : ""}`}
                  id="pte-academic"
                  role="tabpanel"
                >
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
                            {type.Subtypes.sort((a, b) => a.order - b.order)
                              .filter((sub) => !shouldHideSubtype(type.name, sub.sub_name))
                              .map((sub) => (
                                <Link
                                  key={sub.id}
                                  to={getLinkPath(getRoutePath(sub.sub_name), sub.id, null)}
                                  onClick={() => {
                                    localStorage.setItem("subtypeId", sub.id.toString());
                                    setShowMegaMenu(false);
                                  }}
                                >
                                  {sub.sub_name}
                                  {sub.ai_score == 1 ? <span className="ai-score">AI Score</span> : null}
                                </Link>
                              ))}
                          </div>
                        )
                    )}
                  </div>
                </div>

                <div
                  className={`tab-pane text-muted ${activeTab === "Core" ? "show active" : ""}`}
                  id="pte-core"
                  role="tabpanel"
                >
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
                            {type.Subtypes.sort((a, b) => a.order - b.order)
                              .filter((sub) => !shouldHideSubtype(type.name, sub.sub_name))
                              .map((sub) => (
                                <Link
                                  key={sub.id}
                                  to={getLinkPath(getRoutePath(sub.sub_name), sub.id, null)}
                                  onClick={() => {
                                    localStorage.setItem("subtypeId", sub.id.toString());
                                    setShowMegaMenu(false);
                                  }}
                                >
                                  {sub.sub_name}
                                  {sub.ai_score == 1 ? <span className="ai-score">AI Score</span> : null}
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
