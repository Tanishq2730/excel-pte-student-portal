import { useEffect, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";
import { fetchAllTypes } from "../../../api/commonAPI";

interface PracticeHeaderProps {
    showMegaMenu: boolean;
    children?: ReactNode;
}

interface Subtype {
    id: number;
    sub_name: string;
    ai_score: number;
    order: number;
    // Add other fields if needed
}

interface PracticeType {
    id: number;
    name: string;
    Subtypes: Subtype[];
}

// ✅ Map readable sub_name values to keys in all_routes
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
    "Reading Fill in the Blanks":"fillInTheBlanksRead",
    "Re-order Paragraphs":"reorderParagraph",
    "Summarize Spoken Text": "summarizeSpokenText",
    "MC, Select Multiple Answer": "multipleChooseAnswerListen",
    "Fill in the Blanks": "fillInTheBlanks",
    "Highlight Correct Summary": "highlightCorrectSummary",
    "MC, Select Single Answer": "multipleChooseSingleAnswerListen",
    "Select Missing Word": "selectMissingWord",
    "Highlight Incorrect Words": "highlightIncorrectWord",
    "Write from Dictation": "writeFromDictation",
};

const PracticeHeader = ({ showMegaMenu }: PracticeHeaderProps) => {
    const [practiceTypes, setPracticeTypes] = useState<PracticeType[]>([]);

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
    }, []);

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
          // remove the trailing optional param if not provided
          path = path.replace("/:question_id?", "");
        }
      
        return path;
      };


    return (
        <div className="practice-header-wrapper">
            <span className="nav-link">
                Practice <i className="ion-chevron-down"></i>
            </span>
            {showMegaMenu && (
                <div className="mega-menu">
                    <div className="innermegamenu">
                        <div className="card-body">
                            <ul
                                className="nav nav-pills justify-content-start mx-0 nav-style-2 mb-3"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        href="#pte-core"
                                        role="tab"
                                        aria-selected="true"
                                    >
                                        PTE Core
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        href="#pte-academic"
                                        role="tab"
                                        aria-selected="false"
                                    >
                                        PTE Academic / UKVI
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div
                                    className="tab-pane show active text-muted"
                                    id="pte-core"
                                    role="tabpanel"
                                >
                                    <div className="tabinnerasection">
                                        {practiceTypes.map((type) => (
                                            type.name !== 'All' &&
                                                <div className="mega-column" key={type.id}>
                                                <h6>{type.name}</h6>
                                                {type.Subtypes.sort((a, b) => a.order - b.order).map((sub) => (
                                                    <Link key={sub.id} to={getLinkPath(getRoutePath(sub.sub_name), sub.id, null)}>
                                                        {sub.sub_name}
                                                        {sub.ai_score ? (
                                                            <span className="ai-score">AI Score</span>
                                                        ) : null}
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="tab-pane text-muted" id="pte-academic" role="tabpanel">
                                    <p>
                                        How hotel deals can help you live a better life. <b>How celebrity cruises</b> aren&apos;t as bad as you think.
                                    </p>
                                    {/* You can enhance this later */}
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
