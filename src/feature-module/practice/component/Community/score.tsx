import React, { useState } from "react";

const Score = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, commentText]);
      setCommentText("");
      setShowModal(false); // ✅ Close modal after adding comment
    }
  };

  const handleDeleteComment = (index: number) => {
    const updated = [...comments];
    updated.splice(index, 1);
    setComments(updated);
  };

  return (
    <>
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
              <h5 className="mb-0 fw-bold">Gurpreet Singh</h5>
              <small className="text-muted">11/04/2025</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-soft-secondary me-2">
              Score 77.02/90
            </button>
            <button className="btn btn-soft-warning">AI Score</button>
          </div>
          <div className="d-flex align-items-center scoreicon">
            <div
              className="icon me-2"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            >
              <i className="ion-chatbox-working"></i>
            </div>
            <div className="icon" style={{ position: "relative" }}>
              <i className="ion-thumbsup"></i>
              <span className="ms-1">0</span>
            </div>
          </div>
        </div>

        {/* Static Chat Example */}
        <div
          className="bg-white mt-3 d-flex align-items-start p-3"
          style={{ borderRadius: "20px", marginLeft: "5em" }}
        >
          <div
            className="rounded-circle bg-primary d-flex justify-content-center align-items-center me-3"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="bi bi-person-fill text-white fs-6"></i>
          </div>
          <div className="flex-grow-1">
            <strong>user9</strong>
            <p className="mb-0">hey</p>
          </div>
          <div>
            <i className="fa fa-trash text-danger"></i>
          </div>
        </div>

        {/* Dynamic Comments */}
        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-white mt-2 d-flex align-items-start p-3"
            style={{ borderRadius: "20px", marginLeft: "5em" }}
          >
            <div
              className="rounded-circle bg-primary d-flex justify-content-center align-items-center me-3"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="bi bi-person-fill text-white fs-6"></i>
            </div>
            <div className="flex-grow-1">
              <strong>You</strong>
              <p className="mb-0">{comment}</p>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteComment(index)}
            >
              <i className="fa fa-trash text-danger"></i>
            </div>
          </div>
        ))}
      </div>

      {/* new modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Write a Comment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddComment}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Score;
