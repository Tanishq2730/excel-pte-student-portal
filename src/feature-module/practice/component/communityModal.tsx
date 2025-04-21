import React from 'react';

const CommunityModal: React.FC = () => {
  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Audio Player */}
      <div className="mb-3">
        <h6 className="fw-bold">Your Recorded Audio</h6>
        <div className="border border-2 rounded-pill d-flex align-items-center px-3 py-2" style={{ maxWidth: '400px' }}>
          <button className="btn btn-outline-secondary btn-sm me-2">
            <i className="fa fa-play"></i>
          </button>
          <span className="me-2">0:00</span>
          <div className="flex-grow-1">
            <div className="progress" style={{ height: '4px' }}>
              <div className="progress-bar bg-dark" style={{ width: '0%' }}></div>
            </div>
          </div>
          <i className="fa fa-volume-up ms-2"></i>
        </div>
      </div>

      {/* Transcript Text */}
      <div className="p-3 rounded mb-3" style={{ backgroundColor: '#eef6f9' }}>
        Tissues are grouped together in the body to form organs. These include the brain, heart, lungs, kidneys, and liver. Each body organ has a specific shape and is made up of different types of tissue that work together. For example, the heart consists mainly of a specialized type of muscle tissue, which contracts rhythmically to provide the heart's pumping action.
      </div>

      {/* Speech Recognition Feedback */}
      <div className="p-3 rounded mb-4" style={{ backgroundColor: '#f1f9fb' }}>
        <strong>AI Speech Recognition:</strong>
        <div className="mt-2">
          <span style={{ color: '#d32f2f' }}>D'souza</span>
          <span style={{ color: '#f5a623' }}> / group to get new</span>
          <span style={{ color: '#4caf50' }}> / body</span>
        </div>
      </div>

      {/* Score Section */}
      <h5 className="fw-bold">Your Score</h5>

      <div className="row mt-3">
        {[
          {
            label: 'Content',
            score: 10,
            desc: 'Poor',
            barColor: '#f08080'
          },
          {
            label: 'Pronunciation',
            score: 10,
            desc: 'Many consonants and vowels are mispronounced & omitted. Stress is placed in a non–English manner.',
            barColor: '#aee1f9'
          },
          {
            label: 'Fluency',
            score: 10,
            desc: 'Your speech is slow and laboured with little grouping, multiple hesitations, pauses, false starts.',
            barColor: '#fdd76e'
          },
          {
            label: 'Your Score',
            score: 10,
            desc: '',
            barColor: '#b0e0e6'
          }
        ].map((item, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="p-3 rounded" style={{ backgroundColor: '#fef9f7', border: '1px solid #f1e1dc' }}>
              <div className="d-flex justify-content-between fw-semibold">
                <span>{item.label}</span>
                <span>{item.score} / 90</span>
              </div>
              <div className="mt-2 mb-1" style={{ backgroundColor: '#e0e0e0', height: '8px', borderRadius: '4px' }}>
                <div
                  style={{
                    width: `${(item.score / 90) * 100}%`,
                    backgroundColor: item.barColor,
                    height: '100%',
                    borderRadius: '4px'
                  }}
                ></div>
              </div>
              {item.desc && <small className="text-muted d-block mt-1">{item.desc}</small>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityModal;

// Make sure to add Bootstrap & Bootstrap Icons in your index.html or via CDN
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
