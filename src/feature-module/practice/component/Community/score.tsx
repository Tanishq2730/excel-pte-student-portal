import React from "react";

const Score = () => {
  return (
    <div
      className="container-fluid bg-light py-3"
      style={{ borderRadius: "20px" }}
    >
      <div
        className="d-flex align-items-center justify-content-between px-4 py-3 bg-white"
        style={{ borderRadius: "20px" }}
      >
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-3"
            style={{ width: "60px", height: "60px" }}
          >
            <i className="ion-person text-white fs-3"></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold">Gurpreet singh</h5>
            <small className="text-muted">11/04/2025</small>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <button className="btn btn-info text-white fw-bold me-2">
            Score 77.02/90
          </button>
          <button className="btn btn-warning text-white fw-bold">
            AI Score
          </button>
        </div>
        <div className="d-flex align-items-center scoreicon">
          <div className="icon">
            <i className="ion-chatbox-working me-2"></i>
          </div>
          <div className="icon" style={{position:'relative'}}>
            <i className="ion-thumbsup"></i>
            <span className="ms-1">0</span>
          </div>
        </div>
      </div>

      <div
        className="bg-white mt-3 d-flex align-items-start p-3"
        style={{ borderRadius: "20px" }}
      >
        <div
          className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-3"
          style={{ width: "50px", height: "50px" }}
        >
          <i className="bi bi-person-fill text-white fs-5"></i>
        </div>
        <div className="flex-grow-1">
          <strong>user9</strong>
          <p className="mb-0">hey</p>
        </div>
        <div>
          <i className="fa fa-trash text-danger"></i>
        </div>
      </div>
    </div>
  );
};

export default Score;
