import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { RecentActivity } from "../../../api/dashboardAPI";
import { all_routes } from "../../router/all_routes";

interface RecentActivityType {
  id: number;
  title: string;
  description: string;
  image: string;
  badge: string;
  type:string;
  questionId:number;
  sub_type_id:number;
  created_at: string;
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

const ActivityHistory: React.FC = () => {
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    getRecentActivity();
  }, []);

  const getRecentActivity = async () => {
    const res = await RecentActivity();
    // console.log(res,"recentActivity");
    if (res?.success) {
      // console.log("Data being set to state:", res.data);
      setRecentActivity(res.data);
    }
  };


 const getQuestionLink = (q: any): string => {
  const routeKey = routeNameMap[q.Subtype?.sub_name];
  const route = all_routes[routeKey];
  if (!route) return "#";
  return route
    .replace(":subtype_id", q.Subtype?.id.toString())
    .replace("/:question_id?", `/${q.id}`);
};
  console.log(recentActivity);
  

    return (
    <div className="card flex-fill">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-titile">Activity History</h4>
      </div>
      <div
        className="card-body py-1 "
        style={{ height: "21.4em", overflowY: "scroll" }}
      >
        <ul className="list-group list-group-flush">
          {recentActivity.map((activity, index) => (
            <li key={activity.id} className="list-group-item py-3 px-0 pb-0">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center overflow-hidden mb-3">
                  {/* <Link to="#" className="avatar activity-avatar avatar-xl flex-shrink-0 me-2">
                    <i className="ion-person"></i>
                  </Link> */}
                  <div className="overflow-hidden">
                   <Link
                      to={getQuestionLink({
                        id: activity.questionId,
                        Subtype: {
                          id: activity.sub_type_id,
                          sub_name: activity.type?.split(" - ")[1]?.trim(),
                        },
                      })}
                      className="d-flex align-items-center text-info mb-1"
                    >
                      {activity.badge}
                    </Link>
                    <h6 className="text-truncate mb-1">
                      {activity.type}
                    </h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <p>{activity.created_at || "No description"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityHistory;
