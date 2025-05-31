import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TemplateCard from "./component/TemplateCard";
import { fetchAllTypes } from "../../api/commonAPI";
import { all_routes } from "../../feature-module/router/all_routes";

const Template: React.FC = () => {
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const routes = all_routes;

  useEffect(() => {
    const loadTypes = async () => {
      const res = await fetchAllTypes();
      if (res?.success && res.data.length) {
        setTypes(res.data);
        setActiveTab(res.data[0].name); // Default to first tab
      }
    };
    loadTypes();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container my-4">
          <div className="mainHead pb-3 mainHeader">
            <Link to={routes.studyTool}>
              <div className="icon">
                <i className="fa fa-arrow-left"></i>
              </div>
            </Link>
            <h3>Template</h3>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mb-3">
              {types.map((type, index) => (
                <li className="nav-item" key={type.id}>
                  <Link
                    className={`nav-link ${
                      activeTab === type.name ? "active" : ""
                    }`}
                    to={`#solid-rounded-tab${index + 1}`}
                    data-bs-toggle="tab"
                    onClick={() => setActiveTab(type.name)}
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="tab-content">
              {types.map((type, index) => (
                <div
                  key={type.id}
                  className={`tab-pane ${
                    activeTab === type.name ? "show active" : ""
                  }`}
                  id={`solid-rounded-tab${index + 1}`}
                >
                  <TemplateCard typeId={type.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
