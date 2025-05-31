import React from "react";

const SuccesfullyCompleted: React.FC = () => {
  return (
    <div className="mock-test-cards">
      <div className=" ">
        <img className="check-img" src="../../../assets/img/check.jpg" alt="Success" />
        <h2 className="text-2xl font-bold text-green-600 mb-4">Your Mocktest Successfully Completed!</h2>
        
        <button 
          className="btn btn-primary rounded-pill"
          onClick={() => console.log("Check Your Score")}
        >
          Check Your Score
        </button>
      </div>
    </div>
  );
};

export default SuccesfullyCompleted;
