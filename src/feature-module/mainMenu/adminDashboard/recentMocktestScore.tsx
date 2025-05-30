import React, { useEffect, useState } from "react";
import { RecentMocktestResults } from "../../../api/dashboardAPI";

interface ScoreSection {
  score: number;
  total_score: number;
}

interface RecentMocktestResultsType {
  Speaking: ScoreSection;
  Writing: ScoreSection;
  Reading: ScoreSection;
  Listening: ScoreSection;
}

const RecentMocktestScore: React.FC = () => {
  const [mockResult, setMocktestResult] = useState<RecentMocktestResultsType>({
    Speaking: { score: 0, total_score: 0 },
    Writing: { score: 0, total_score: 0 },
    Reading: { score: 0, total_score: 0 },
    Listening: { score: 0, total_score: 0 }
  });

  useEffect(() => {
    mockresult();
  }, []);

  const mockresult = async () => {
  const res = await RecentMocktestResults();
  if (res?.success) {
    console.log(res.data); // This is an object, not array

    // Use Object.entries to iterate over keys and values
    const formattedData = Object.entries(res.data).reduce(
      (acc: any, [section, value]: [string, any]) => {
        acc[section] = {
          score: value.score,
          total_score: value.total_score,
        };
        return acc;
      },
      {}
    );

    setMocktestResult(formattedData);
  }
};

  const totalScore =
    mockResult.Speaking.score +
    mockResult.Writing.score +
    mockResult.Reading.score +
    mockResult.Listening.score;

  const renderSection = (
    label: string,
    iconClass: string,
    color: string,
    scoreData: ScoreSection
  ) => {
    const percent = scoreData.total_score
      ? (scoreData.score / scoreData.total_score) * 100
      : 0;

    return (
      <div className="d-flex align-items-center rounded border p-2 mb-3">
        <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
          <i className={`${iconClass} text-${color}`}></i>
        </span>
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <p className="mb-1">{label}</p>
            <span>{scoreData.score}/{scoreData.total_score}</span>
          </div>
          <div className="progress progress-xs  flex-grow-1 mb-1">
            <div
              className={`progress-bar progress-bar-striped progress-bar-animated bg-${color} rounded`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card flex-fill">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-title">Recent Mock Score</h4>
        <h5 className="text-danger">Total Score: {totalScore}</h5>
      </div>
      <div className="card-body p-3">
        {renderSection("Speaking", "fa fa-microphone", "danger", mockResult.Speaking)}
        {renderSection("Writing", "ion-edit", "warning", mockResult.Writing)}
        {renderSection("Reading", "ion-ios7-bookmarks", "success", mockResult.Reading)}
        {renderSection("Listening", "ion-headphone", "info", mockResult.Listening)}
      </div>
    </div>
  );
};

export default RecentMocktestScore;
