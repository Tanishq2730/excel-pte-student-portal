import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PracticeData: React.FC = () => {
  const data = [
    {
      userName: "Mazhar",
      date: "05/02/2025",
      score: 65.29,
      profileImage: "assets/img/logo-black.png",
      message:
        "You have started speaking after 3 seconds and your response is not scored.",
    },
    {
      userName: "Ayesha",
      date: "06/02/2025",
      score: 78.65,
      profileImage: "assets/img/logo-black.png",
      message: "Your speech was too fast, please slow down next time.",
    },
    {
      userName: "Rahul",
      date: "07/02/2025",
      score: 88.5,
      profileImage: "assets/img/logo-black.png",
      message: "Great job! Keep it up.",
    },
  ];

  return (
    <>
      {data.map((user, index) => (
        <div
          key={index}
          className="maincard d-flex align-items-center justify-content-between border rounded-pill px-3 py-3 my-3"
          style={{ borderColor: "#00c6b5", maxWidth: "100%", margin: "auto" }}
        >
          <div className="d-flex align-items-center">
            <img
              src={user.profileImage}
              alt="Profile"
              className="rounded-circle me-2"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                border: "1px solid #ccc",
              }}
            />
            <div>
              <div className="fw-bold">{user.userName}</div>
              <div style={{ fontSize: "0.9rem" }}>{user.date}</div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="popbtn border rounded-pill px-2 py-1 me-3"
              style={{
                backgroundColor: "#f0f0f0",
                borderColor: "#00c6b5",
                color: "black",
                fontSize: "0.9rem",
              }}
            >
              My Score <strong>{user.score.toFixed(2)} / 100</strong>
            </button>
            <div className="text-danger" style={{ fontSize: "0.9rem" }}>
              {user.message}
            </div>
          </div>
          <button className="btn btn-danger btn-sm ms-3 rounded-circle">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ))}
    </>
  );
};

export default PracticeData;
