import React from "react";
import { useLocation } from "react-router-dom";

const TemplateDetail: React.FC = () => {
  const location = useLocation();
  const template = location.state?.template;

  if (!template) {
    return <div className="container my-4">No template data available.</div>;
  }

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container my-4">
          <div className="card p-4 templatebg">            
            <div dangerouslySetInnerHTML={{ __html: template.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
