import React from "react";

// Static assets and data
const assetUrl = "https://your-static-asset-url.com/"; // replace with actual base URL

const staticPredictions = [
  {
    id: 1,
    title: "Prediction Set 1",
    file: "prediction1.pdf",
    cover: "cover1.jpg",
  },
];

const PredictionFile: React.FC = () => {
  return (
    <div className="page-wrappers">
      <div className="content">
        <div className="container">
          <div className="prediction-file my-5">
            <div className="prediction">
              <div className="row">
                {staticPredictions.length > 0 ? (
                  staticPredictions.map((item) => (
                    <div className="col-md-3" key={item.id}>
                      <div className="prediction-card">
                        <a
                          href={assetUrl + item.file}
                          download={item.title}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="assets/img/prediction.png" alt={item.title} />
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
