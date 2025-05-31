import React, { useState, useEffect } from "react";
import { fetchClassRecordings } from "../../api/studyToolsAPI";
import { Link } from "react-router-dom";
import { all_routes } from "../../feature-module/router/all_routes";

interface Recording {
  id: number;
  title: string;
  description: string;
  url: string;
  createdAt: string;
}

const ClassRecording: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const routes = all_routes;  

  useEffect(() => {
    const getRecordings = async () => {
      setLoading(true);
      try {
        const response = await fetchClassRecordings();
        if (response?.success && Array.isArray(response.data)) {
          setRecordings(response.data);
        } else {
          setRecordings([]);
        }
      } catch (error) {
        console.error("Error fetching class recordings:", error);
        setRecordings([]);
      }
      setLoading(false);
    };

    getRecordings();
  }, []);

  const openVideoInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="page-wrapper mt-5">
      <div className="content">
        <div className="container">
          <div className="mainHead pb-3 mainHeader">
            <Link to={routes.studyTool}>
            <div className="icon">
              <i className="fa fa-arrow-left"></i>
            </div>
            </Link>
            <h3>Class Recording</h3>
          </div>
          <div className="classRecording">
            <div className="row mt-5">
              {loading ? (
                <center>
                  <p>Loading recordings...</p>
                </center>
              ) : recordings.length > 0 ? (
                recordings.map((card, index) => (
                  <div key={index} className="col-md-3 cardvideo mb-3">
                    <div
                      className="card"
                      onClick={() => openVideoInNewTab(card.url)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body">
                        <iframe
                          src={card.url}
                          title={card.title}
                          width="100%"
                          height="150"
                          allowFullScreen
                        />
                        <h5 className="mt-2">{card.title}</h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <center>
                  <p>Recording not Found</p>
                </center>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRecording;
