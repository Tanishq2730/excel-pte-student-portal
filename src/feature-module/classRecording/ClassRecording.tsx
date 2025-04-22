import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

// Define the type for a single recording
interface Recording {
  url: string;
  title: string;
}

// Dummy data
const dummyRecordings: Recording[] = [
  {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Introduction to React",
  },
  {
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    title: "Advanced JavaScript",
  },
  {
    url: "https://www.youtube.com/embed/ysz5S6PUM-U",
    title: "TypeScript Basics",
  },
  {
    url: "https://www.youtube.com/embed/3fumBcKC6RE",
    title: "React Hooks Deep Dive",
  },
];

const ClassRecording: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    // Simulate async loading
    const timer = setTimeout(() => {
      setRecordings(dummyRecordings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  const openVideoInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container">
          <div className="classRecording">
            <div className="row mt-5">
              {loading ? (
                <center>
                  <p>Loading recordings...</p>
                </center>
              ) : recordings.length > 0 ? (
                recordings.map((card, index) => (
                  <div key={index} className="col-md-3 cardvideo mb-3">
                    <div className="card">
                    <div className="card-body">
                      <iframe
                        src={card.url}
                        title={card.title}
                        width="100%"
                        height="100%"
                        allowFullScreen
                        style={{ cursor: "pointer" }}
                        onClick={() => openVideoInNewTab(card.url)}
                      ></iframe>
                      <h5>{card.title}</h5>
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
