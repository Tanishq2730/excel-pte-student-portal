// src/modules/study-tools/template/component/TemplateCard.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTemplates } from "../../../api/studyToolsAPI";
import { all_routes } from "../../../feature-module/router/all_routes";

interface TemplateCardProps {
  typeId: number;
}

interface TemplateItem {
  id: number;
  title: string;
  image_pdf: string;
  content: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ typeId }) => {
  const [templates, setTemplates] = useState<TemplateItem[]>([]);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const res = await fetchTemplates(typeId);
        if (res?.success) {
          setTemplates(res.data);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    if (typeId) loadTemplates();
  }, [typeId]);

  return (
    <div className="speaking-card">
      <div className="row">
        {templates.map((template) => (
          <div className="col-md-2" key={template.id}>
            <div className="card">
              <Link
                to={all_routes.templateDetail.replace(":id", template.id.toString())}
                state={{ template }}
              >
                <div className="cardIcon">
                  <i className="ion-person" style={{ fontSize: "50px" }}></i>
                </div>
                <h5>{template.title}</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateCard;
