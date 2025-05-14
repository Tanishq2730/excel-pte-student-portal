import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { all_routes } from "../../feature-module/router/all_routes";

const TemplateDetail: React.FC = () => {
  const location = useLocation();
  const template = location.state?.template;
  const routes = all_routes;

  if (!template) {
    return <div className="container my-4">No template data available.</div>;
  }

  return (
    <div className="page-wrappers">
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
          <div className="card p-4 templatebg">
            <div dangerouslySetInnerHTML={{ __html: template.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
