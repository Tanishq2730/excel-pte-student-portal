import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourseTypes } from "../../api/commonAPI";
import SubscriptionCard from "./subscriptionCard";
import History from "./history";
import Faq from "./faq";

// Define the expected type for each course tab
interface CourseType {
  id: number;
  name: string;
  order_by: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

// Define the API response type
interface CourseTypeResponse {
  success: boolean;
  data: CourseType[];
}

const SubscriptionPlan: React.FC = () => {
  const [tabs, setTabs] = useState<CourseType[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTabs() {
      const res= await getCourseTypes();
      if (res.success && res.data.length > 0) {
        setTabs(res.data);
        setActiveTab(res.data[0].id);
      }
    }
    fetchTabs();
  }, []);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };
console.log(tabs, "tabs");

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="content my-5">
          <div className="card-body">
            <ul className="nav nav-pills justify-content-center nav-style-2 mb-3" role="tablist">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                    data-bs-toggle="tab"
                    role="tab"
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.name}
                  </button>
                </li>
              ))}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  data-bs-toggle="tab"
                  role="tab"
                  to="#contacts-center"
                  aria-selected="false"
                >
                  Payment History
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  data-bs-toggle="tab"
                  role="tab"
                  to="#last-center"
                  aria-selected="false"
                >
                  FAQ
                </Link>
              </li>
            </ul>

            <div className="tab-content mt-5">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pane text-muted ${activeTab === tab.id ? "show active" : ""}`}
                  id={`tab-${tab.id}`}
                  role="tabpanel"
                >
                  <div className="row">
                    <SubscriptionCard courseTypeId={tab.id} />
                  </div>
                </div>
              ))}

              <div className="tab-pane text-muted" id="contacts-center" role="tabpanel">
                <History />
              </div>
              <div className="tab-pane text-muted" id="last-center" role="tabpanel">
                <Faq />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
