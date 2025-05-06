import React, { useEffect, useState } from "react";
import { fetchPredictions } from "../../api/studyToolsAPI";
import { image_url } from "../../environment";

const PredictionFile: React.FC = () => {

  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const res = await fetchPredictions();
        if (res?.success && Array.isArray(res.data)) {
          setPredictions(res.data);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    loadPredictions();
  }, []);

  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container">
          <div className="prediction-file my-5">
            <div className="prediction">
              <div className="row">
                {predictions.length > 0 ? (
                  predictions.map((item) => (
                    <div className="col-md-3" key={item.id}>
                      <div className="prediction-card">
                        <a
                          href={image_url + item.prediction_file}
                          download={item.title}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={image_url + item.cover_file} alt={item.title} />
                          <div className="pcard-inner">
                            <p>Download {item.title}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No predictions available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionFile;
