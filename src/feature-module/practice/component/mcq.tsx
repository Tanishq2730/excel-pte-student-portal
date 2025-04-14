import React from "react";

const options = [
  { id: "A", text: "they began using a material that much stronger" },
  { id: "B", text: "they found a way to strengthen the statues internally" },
  { id: "C", text: "the aesthetic tastes of the public had changed over time" },
  { id: "D", text: "the cannonballs added too much weight to the statues" },
];

const Mcq: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            According to paragraph, sculptors in the Italian Renaissance stopped
            using cannonballs in bronze statues of horses because
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {options.map((option) => (
              <div key={option.id} className="col-12 col-md-6">
                <div className="d-flex align-items-start border rounded p-3 h-100">
                  <input
                    type="checkbox"
                    className="form-check-input mt-1 me-3"
                    id={`option-${option.id}`}
                  />
                  <label htmlFor={`option-${option.id}`} className="d-flex align-items-start w-100">
                    <div
                      className="me-3 d-flex justify-content-center align-items-center bg-primary text-white fw-bold rounded"
                      style={{
                        width: "30px",
                        height: "30px",
                        minWidth: "30px",
                      }}
                    >
                      {option.id}
                    </div>
                    <span>{option.text}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mcq;
