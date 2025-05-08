import React from 'react';
import { image_url } from '../../../environment';

interface SpeakingScoreModalProps {
  logDetail: any;
}

const SpeakingScoreModal: React.FC<SpeakingScoreModalProps> = ({ logDetail }) => {
  // if (!logDetail || !logDetail.data) return null;

  const audioUrl = `${image_url}/${logDetail?.answer}`;
  const parsedScoreData = typeof logDetail?.score_data === 'string'
    ? JSON.parse(logDetail.score_data)
    : logDetail?.score_data || {};

  if (!logDetail) return null;
  const scoreData = [
    {
      label: 'Content',
      score: parsedScoreData.content || 0,
      desc: 'Poor',
      barColor: '#f08080'
    },
    {
      label: 'Pronunciation',
      score: parsedScoreData.pronunciation || 0,
      desc: 'Many consonants and vowels are mispronounced & omitted. Stress is placed in a non–English manner.',
      barColor: '#aee1f9'
    },
    {
      label: 'Fluency',
      score: parsedScoreData.fluency || 0,
      desc: 'Your speech is slow and laboured with little grouping, multiple hesitations, pauses, false starts.',
      barColor: '#fdd76e'
    },
    {
      label: 'Your Score',
      score: logDetail.score || 0,
      desc: '',
      barColor: '#b0e0e6'
    }
  ];

  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Audio Player */}
      <div className="mb-3">
        <h6 className="fw-bold">Your Recorded Audio</h6>
        <div className="border border-2 rounded-pill d-flex align-items-center px-3 py-2" style={{ maxWidth: '100%' }}>
          <audio controls src={audioUrl} className="w-100" />
        </div>
      </div>

      {/* Transcript */}
      <div className="p-3 rounded mb-3" style={{ backgroundColor: '#eef6f9' }}>
        {parsedScoreData.transcript}
      </div>
      <div className="mt-2">
          <span style={{ color: '#d32f2f' }}>Bad words</span>
          <span style={{ color: '#f5a623' }}> / AVG Words</span>
          <span style={{ color: '#4caf50' }}> / Good Words</span>
        </div>
      {/* Scored Transcript */}
      <div className="p-3 rounded mb-4" style={{ backgroundColor: '#f1f9fb' }}>
        <strong>AI Speech Recognition:</strong>
        <div className="mt-2" dangerouslySetInnerHTML={{ __html: parsedScoreData.scored_transcript || '' }} />
      </div>

      {/* Score Section */}
      <h5 className="fw-bold">Your Score</h5>
      <div className="row mt-3">
        {scoreData.map((item, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="p-3 rounded shadow-sm" style={{ backgroundColor: '#fef9f7', border: '1px solid #f1e1dc' }}>
              <div className="d-flex justify-content-between fw-semibold">
                <span>{item.label}</span>
                <span>{item.score.toFixed(2)} / {logDetail.total_score}</span>
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

export default SpeakingScoreModal;
