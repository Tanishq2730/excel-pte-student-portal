import React from 'react';
import { image_url } from '../../../environment';

interface WritingScoreModalProps {
  logDetail: any;
}

const WritingScoreModal: React.FC<WritingScoreModalProps> = ({ logDetail }) => {
  // if (!logDetail || !logDetail.data) return null;

  const audioUrl = `${image_url}/${logDetail?.answer}`;
  const parsedScoreData = JSON.parse(logDetail?.score_data || '{}');

  if (!logDetail) return null;
  const scoreData = [
    {
      label: 'Content',
      score: parsedScoreData.content || 0,
      totalscore: 2,
      desc: 'Good Summary!',
      barColor: '#f08080'
    },
    {
      label: 'Form',
      score: parsedScoreData.form || 0,
      totalscore: 1,
      desc: 'Excellent!!',
      barColor: '#aee1f9'
    },
    {
      label: 'Grammar',
      score: parsedScoreData.grammer || 0,
      totalscore: 2,
      desc: 'Has correct grammatical structure',
      barColor: '#fdd76e'
    },
    {
      label: 'Vocabulary',
      score: parsedScoreData.vocabulary || 0,
      totalscore: 2,
      desc: 'Has appropriate choice of words',
      barColor: '#fdd76e'
    },
    {
      label: 'Your Score',
      score: logDetail.score || 0,
      totalscore: 7,
      desc: '',
      barColor: '#b0e0e6'
    }
  ];

  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>     
     
     <div className="mt-2 mb-3">
        <button className="btn btn-outline-danger">
          <span className="">Bad words :30</span>
        </button>
        <button className="btn btn-outline-warning mx-3">
          <span className=""> AVG Words :40</span>
        </button>
        <button className="btn btn-outline-success">
          <span className="">Good Words :60</span>
        </button>
      </div>
      {/* Scored Transcript */}
      <div className="p-3 rounded mb-4" style={{ backgroundColor: '#f1f9fb' }}>
        <strong>AI Speech Recognition:</strong>
        <div className="mt-2" dangerouslySetInnerHTML={{ __html: parsedScoreData.highlightedText || '' }} />
      </div>

      {/* Score Section */}
      <h5 className="fw-bold">Your Score</h5>
      <div className="row mt-3">
        {scoreData.map((item, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="p-3 rounded shadow-sm" style={{ backgroundColor: '#fef9f7', border: '1px solid #f1e1dc' }}>
              <div className="d-flex justify-content-between fw-semibold">
                <span>{item.label}</span>
                <span>{item.score} / {logDetail.total_score}</span>
              </div>
              <div className="mt-2 mb-1" style={{ backgroundColor: '#e0e0e0', height: '8px', borderRadius: '4px' }}>
                <div
                  style={{
                    width: `${(item.score / item.totalscore) * 100}%`,
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

export default WritingScoreModal;
