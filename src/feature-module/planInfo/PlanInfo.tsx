import React from "react";

interface Feature {
  name: string;
  premium: string;
  free: string;
}

interface PlanCardProps {
  title: string;
  values: string[];
}

const PlanCard: React.FC<PlanCardProps> = ({ title, values }) => (
  <div className="col-md-4 mb-3">
    <div
      className={`card h-100 ${
        title === "Premium"
          ? "btn-soft-success border-success"
          : title === "Free"
          ? " border-primary"
          : "bg-white"
      }`}
    >
      <div
        className={`card-header text-white text-center ${
          title === "Premium"
            ? "bg-success"
            : title === "Free"
            ? "bg-primary"
            : "bg-info"
        }`}
      >
        {title} Plan
      </div>
      <div className="card-body text-center text-dark">
        {values.map((value, i) => (
          <div key={i} className="py-1 border-bottom">
            {value}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ActivePlanCard: React.FC = () => (
  <div className="card text-white text-center mt-4">
    <div className="card-header text-center">
        <div className="card-title text-white">
            Active Plan
        </div>
    </div>
    <div className="card-body">
      <div className="card w-60 m-auto" style={{width:"60%"}}>
            <h3>Unlimited</h3>
      </div>
    </div>
  </div>
);

const PlanInfo: React.FC = () => {
  const features: Feature[] = [
    { name: "Practice Test", premium: "All Question", free: "All Question" },
    { name: "AI Clicks", premium: "Unlimited", free: "Limited" },
    { name: "Score Checks", premium: "Unlimited", free: "Limited" },
    { name: "Templates", premium: "All", free: "Limited" },
    { name: "Strategy Videos", premium: "✔️", free: "✔️" },
    { name: "Study-Plan", premium: "✔️", free: "❌" },
    { name: "Full Mock Tests", premium: "115 x Unlimited", free: "1 x Once" },
    { name: "Sectional Mock Tests", premium: "262 x Unlimited", free: "4 x Once" },
    // { name: "CYO Mock Tests", premium: "Unlimited", free: "❌" },
  ];

  const featureNames = features.map((f) => f.name);
  const premiumValues = features.map((f) => f.premium);
  const freeValues = features.map((f) => f.free);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container planinfo">
          <div className="card">
            <div className="card-header text-center">
              <div className="card-title text-white text-center">Premium Plan</div>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Features Column */}
                <div className="col-md-4 mb-3">
                  <div className="card h-100 border-dark">
                    <div className="card-header bg-dark text-white text-center">
                      Features
                    </div>
                    <div className="card-body text-center">
                      {featureNames.map((name, i) => (
                        <div key={i} className="py-1 border-bottom">
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Premium Plan Column */}
                <PlanCard title="Premium" values={premiumValues} />

                {/* Free Plan Column */}
                <PlanCard title="Free" values={freeValues} />
              </div>
            </div>
          </div>
          <ActivePlanCard />
        </div>
      </div>
    </div>
  );
};

export default PlanInfo;
