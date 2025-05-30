import React from 'react';
import { image_url } from '../../../environment';
import { e } from 'react-router/dist/development/route-data-BmvbmBej';

interface ListeningScoreModalProps {
  logDetail: any;
}

const ListeningScoreModal: React.FC<ListeningScoreModalProps> = ({ logDetail }) => {
  if (!logDetail) return null;

  const audioUrl = `${image_url}/${logDetail?.answer}`;

  // Determine label based on subtype name
  let scoreLabel = 'Choice'; // Default
  const subtypeName = logDetail?.subtype?.sub_name;

  if (subtypeName === 'Summarize Spoken Text') {
    scoreLabel = 'Content';
  } else if (subtypeName === 'MC, Choose Multiple Answers') {
    scoreLabel = 'Choice';
  } else if (subtypeName === 'MC, Choose Multiple Answer') {
    scoreLabel = 'Choice';
  }else if (subtypeName === 'Highlight Incorrect Words') {
    scoreLabel = 'Words';
  }else if (subtypeName === 'Write from Dictation') {
    scoreLabel = 'Words';
  }

  const scoreData = [
    {
      label: scoreLabel,
      score: logDetail.score || 0,
      totalscore: logDetail.total_score || 0,
      desc: '',
      barColor: '#f08080'
    },
    {
      label: 'Your Score',
      score: logDetail.score || 0,
      desc: '',
      totalscore: logDetail.total_score || 0,
      barColor: '#b0e0e6'
    }
  ];

  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Score Section */}
      <h5 className="fw-bold">Your Score</h5>
      <div className="row mt-3">
        {scoreData.map((item, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="p-3 rounded shadow-sm" style={{ backgroundColor: '#fef9f7', border: '1px solid #f1e1dc' }}>
              <div className="d-flex justify-content-between fw-semibold">
                <span>{item.label}</span>
                <span>{item.score} / {item.totalscore}</span>
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

export default ListeningScoreModal;
