import React, { useEffect, useState } from "react";
import {
  addComments,
  removeComments,
  addLikes,
  removeLikes,
  fetchPracticeLog,
} from "../../../../api/practiceAPI";
import SpeakingScoreModal from "../speakingScoreModal";
import WritingScoreModal from "../writingScoreModal";
import ReadingScoreModal from "../readingScoreModal";
import ListeningScoreModal from "../listeningScoreModal";

interface CommentObj {
  id: number;
  comment: string;
  createdAt?: string;
}

interface CommunityLog {
  id: number;
  score: number;
  createdAt: string;
  total_score: number;
  type_id: string;
  totalLikes: number;
  comments: CommentObj[];
  likes: { id: number }[];
  user: {
    name: string;
    profile_image: string | null;
  };
}

interface ScoreProps {
  communityLogs: CommunityLog[];
}

const Score: React.FC<ScoreProps> = ({ communityLogs }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{ [key: number]: CommentObj[] }>({});
  const [showModal, setShowModal] = useState(false);
  const [activeLogId, setActiveLogId] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [likeChanges, setLikeChanges] = useState<{ [key: number]: number }>({});
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [selectedLogDetails, setSelectedLogDetails] = useState<any>(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  // Load initial comments and likes from props
  useEffect(() => {
    const commentMap: { [key: number]: CommentObj[] } = {};
    const likeMap: { [key: number]: boolean } = {};

    communityLogs.forEach((log) => {
      commentMap[log.id] = log.comments || [];
      likeMap[log.id] = (log.likes || []).length > 0;
    });

    setComments(commentMap);
    setLikes(likeMap);
  }, [communityLogs]);

  const handleAddComment = async () => {
    if (commentText.trim() !== "" && activeLogId !== null) {
      try {
        const formData = {
          practice_log_id: activeLogId,
          comment: commentText,
        };
        await addComments(formData);

        setComments((prev) => ({
          ...prev,
          [activeLogId]: [
            ...(prev[activeLogId] || []),
            {
              id: Date.now(),
              comment: commentText,
              createdAt: new Date().toISOString(),
            },
          ],
        }));

        setCommentText("");
        setShowModal(false);
      } catch (error) {
        console.error("Failed to add comment", error);
      }
    }
  };

  const handleDeleteComment = async (logId: number, commentId: number) => {
    try {
      await removeComments(commentId);
      setComments((prev) => {
        const updated = (prev[logId] || []).filter((c) => c.id !== commentId);
        return { ...prev, [logId]: updated };
      });
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  const toggleLike = async (logId: number) => {
    const liked = likes[logId];

    try {
      const formData = { practice_log_id: logId };
      if (liked) {
        await removeLikes(formData);
        setLikeChanges((prev) => ({
          ...prev,
          [logId]: (prev[logId] || 0) - 1,
        }));
      } else {
        await addLikes(formData);
        setLikeChanges((prev) => ({
          ...prev,
          [logId]: (prev[logId] || 0) + 1,
        }));
      }

      setLikes((prev) => ({
        ...prev,
        [logId]: !liked,
      }));
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };
  const handleScoreClick = async (id: number) => {
    setSelectedLogId(id);
    console.log(id, "id");

    try {
      const res = await fetchPracticeLog(id);
      console.log(res, "res");

      if (res.success) {
        const parsedScoreData = JSON.parse(res.data.score_data || "{}");
        setSelectedLogDetails({ ...res.data, score_data: parsedScoreData });
      }
    } catch (err) {
      console.error("Error fetching log detail:", err);
      setSelectedLogDetails(null);
    }
  };
  
  return (
    <>
      {communityLogs.map((log) => (
        <div
          key={log.id}
          className="container-fluid bg-light py-1 px-1 mb-3"
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
                <h5 className="mb-0 fw-bold">{log.user.name}</h5>
                <small className="text-muted">
                  {new Date(log.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button className="btn btn-soft-primary me-2">
                Score {log.score}/{log.total_score}
              </button>

              <button
                className="btn btn-soft-danger"
                data-bs-toggle="modal"
                    data-bs-target="#standard-modal"
                onClick={() => {
                  handleScoreClick(log.id);
                }}
              >
                AI Score
              </button>
            </div>
            <div className="d-flex align-items-center scoreicon">
              <div
                className="icon me-2"
                onClick={() => {
                  setShowModal(true);
                  setActiveLogId(log.id);
                }}
                style={{ cursor: "pointer" }}
              >
                <i className="ion-chatbox-working"></i>
              </div>
              <div
                className="icon"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => toggleLike(log.id)}
              >
                <i
                  className={`ion-thumbsup ${
                    likes[log.id] ? "text-primary" : ""
                  }`}
                ></i>
                <span className="ms-1">
                  {log.totalLikes + (likeChanges[log.id] || 0)}
                </span>
              </div>
            </div>
          </div>

          {(comments[log.id] || []).map((commentObj) => (
            <div
              key={commentObj.id}
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
                <p className="mb-0">{commentObj.comment}</p>
                {commentObj.createdAt && (
                  <small className="text-muted">
                    {new Date(commentObj.createdAt).toLocaleString()}
                  </small>
                )}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteComment(log.id, commentObj.id)}
              >
                <i className="fa fa-trash text-danger"></i>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div
        id="standard-modal"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="standard-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg ssss">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h4 className="modal-title bg-primary" id="exampleModalLgLabel">
                AI Score (Partial credit to : Speaking & Reading) bhghgh jj
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {selectedLogDetails?.type.name === "Speaking" && (
                <SpeakingScoreModal logDetail={selectedLogDetails} />
              )}
              {selectedLogDetails?.type.name === "Writing" && (
                <WritingScoreModal logDetail={selectedLogDetails} />
              )}
              {selectedLogDetails?.type.name === "Reading" && (
                <ReadingScoreModal logDetail={selectedLogDetails} />
              )}
              {selectedLogDetails?.type.name === "Listening" && (
                <ListeningScoreModal logDetail={selectedLogDetails} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding Comment */}
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
