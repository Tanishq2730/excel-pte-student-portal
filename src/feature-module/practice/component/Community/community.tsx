import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PracticeData from "./practiceData";
import Score from "./score";
import { fetchPracticeLogs } from "../../../../api/practiceAPI";

// Define props type
interface CommunityProps {
  questionData: any;
}

interface CommunityLog {
  id: number;
  score: number;
  createdAt: string;
  late_speak: boolean;
  total_score: number;
  totalLikes: number;
  type_id: string;
  user: {
    name: string;
    profile_image: string | null;
  };
  comments: any[];
  likes: any[];
}

// New state type
interface GroupedLogs {
  all: CommunityLog[];
  79: CommunityLog[];
  50: CommunityLog[];
  35: CommunityLog[];
}

const Community: React.FC<CommunityProps> = ({ questionData }) => {
  const [groupedLogs, setGroupedLogs] = useState<GroupedLogs>({
    all: [],
    79: [],
    50: [],
    35: [],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchPracticeLogs(questionData.id, "community");
        if (res.success && typeof res.data === "object") {
          setGroupedLogs({
            all: res.data.all || [],
            79: res.data["79"] || [],
            50: res.data["50"] || [],
            35: res.data["35"] || [],
          });
        } else {
          setGroupedLogs({ all: [], 79: [], 50: [], 35: [] });
        }
      } catch (err) {
        console.error("Error fetching practice logs:", err);
        setGroupedLogs({ all: [], 79: [], 50: [], 35: [] });
      }
    };

    if (questionData?.id) {
      getData();
    }
  }, [questionData]);

  return (
    <section id="community">
      <div className="community-section">
        <div className="card">
          <div className="card-body">
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mb-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="#solid-rounded-tab1"
                  data-bs-toggle="tab"
                >
                  My Practice
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#solid-rounded-tab2"
                  data-bs-toggle="tab"
                >
                  Community Score
                </Link>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane show active" id="solid-rounded-tab1">
                <PracticeData questionData={questionData} />
              </div>

              <div className="tab-pane" id="solid-rounded-tab2">
                <div className="card-body">
                  <ul
                    className="nav nav-pills justify-content-start nav-style-3 mb-3"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        data-bs-toggle="tab"
                        to="#home-right"
                      >
                        All Score
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#about-right"
                      >
                        79
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#services-right"
                      >
                        50
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#contacts-right"
                      >
                        35
                      </Link>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div
                      className="tab-pane show active text-muted"
                      id="home-right"
                    >
                      <Score communityLogs={groupedLogs.all} />
                    </div>
                    <div className="tab-pane text-muted" id="about-right">
                      <Score communityLogs={groupedLogs[79]} />
                    </div>
                    <div className="tab-pane text-muted" id="services-right">
                      <Score communityLogs={groupedLogs[50]} />
                    </div>
                    <div className="tab-pane text-muted" id="contacts-right">
                      <Score communityLogs={groupedLogs[35]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
