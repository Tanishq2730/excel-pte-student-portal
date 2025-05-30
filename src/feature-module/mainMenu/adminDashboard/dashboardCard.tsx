import React from "react";
import CountUp from "react-countup";

interface QuestionCount {
  total_questions: number;
  attempted_questions: number;
  type_name: string;
}

export interface DashboardCountsType {
  [key: number]: QuestionCount;
}

interface DashboardCardProps {
  counts: DashboardCountsType;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ counts }) => {
  const cardIcons = {
    0: { icon: "fa fa-microphone", bgClass: "bg-danger-transparent", defaultName: "Speaking" },
    1: { icon: "ion-edit", bgClass: "bg-secondary-transparent", defaultName: "Writing" },
    2: { icon: "ion-ios7-bookmarks", bgClass: "bg-warning-transparent", defaultName: "Reading" },
    3: { icon: "ion-headphone", bgClass: "bg-success-transparent", defaultName: "Listening" },
  };

  return (
    <div className="row">
      {Object.keys(cardIcons).map((index) => {
        const numericIndex = parseInt(index);
        const iconData = cardIcons[numericIndex as keyof typeof cardIcons];
        const cardData = counts[numericIndex] || {
          type_name: iconData.defaultName,
          attempted_questions: 0,
          total_questions: 0,
        };

        return (
          <div key={numericIndex} className="col-md-3 d-flex dashcardMain">
            <div className="card flex-fill animate-card border-1">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className={`avatar avatar-xl ${iconData.bgClass} me-2 p-1`}>
                    <i className={iconData.icon} style={{ fontSize: "2em" }}></i>
                  </div>
                  <div className="overflow-hidden flex-fill">
                    <p className="mb-0">{cardData.type_name}</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <h2 className="counter">
                        <CountUp end={cardData.attempted_questions} />
                        <span className="attempt">Attempted</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                  <p className="mb-0">
                    Total Quest :{" "}
                    <span className="text-dark fw-semibold">
                      {cardData.total_questions}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCard;
