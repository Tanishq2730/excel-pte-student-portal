import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  fetchCommunity,
  saveCommunity,
  likeCommunity,
  unlikeCommunity,
} from "../../api/communityAPI";

interface Reply {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
}

interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
  likes_count: number;
  user_liked: boolean;
  replies: Reply[];
}

const Community: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    setLoading(true);
    try {
      const response = await fetchCommunity();
      setComments(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch community posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      await saveCommunity({ content: input, parent_id: "" });
      setInput("");
      loadComments();
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };
  
  const handleReplySend = async () => {
    if (!replyText.trim() || selectedCommentId === null) return;
    try {
      await saveCommunity({
        content: replyText,
        parent_id: selectedCommentId,
      });
      setModalShow(false);
      setReplyText("");
      loadComments();
    } catch (error) {
      console.error("Failed to post reply:", error);
    }
  };

  const handleLike = async (commentId: number, liked: boolean) => {
    try {
      if (liked) {
        await unlikeCommunity(commentId);
      } else {
        await likeCommunity(commentId);
      }
      loadComments();
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  const openReplyModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setReplyText("");
    setModalShow(true);
  };

  return (
    <div className="page-wrappers">
      <div className="container py-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Kindly post your exam memories here!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="mt-2" onClick={handleSend}>
          Send
        </Button>

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="mt-4">
            {comments.map((comment) => (
              <div className="card p-3 mb-3 communitycard" key={comment.id}>
                <div className="d-flex align-items-center mb-2">
                  <div className="personicon">
                    <i className="ion-person"></i>
                  </div>
                  <strong>{comment.user.name}</strong>
                </div>
                <p>{comment.content}</p>
                <div className="bottomfooter">
                  <div className="d-flex justify-content-end align-items-center mt-2">
                    <Button
                      variant="link"
                      className="text-decoration-none"
                      onClick={() =>
                        handleLike(comment.id, comment.user_liked)
                      }
                    >
                      👍 {comment.likes_count}
                    </Button>
                    <Button
                      variant="link"
                      className="text-decoration-none"
                      onClick={() => openReplyModal(comment.id)}
                    >
                      💬
                    </Button>
                  </div>
                </div>

                {/* Render replies */}
                {comment.replies.map((reply) => (
                  <div className="ps-4 pt-2" key={reply.id}>
                    <div className="card p-3 bg-white">
                      <div className="d-flex align-items-center mb-1">
                        <div className="personicon">
                          <i className="ion-person"></i>
                        </div>
                        <strong>{reply.user.name}</strong>
                      </div>
                      <p className="mb-1">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Reply to Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="textarea"
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              style={{ marginRight: "1em" }}
              onClick={() => setModalShow(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleReplySend}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Community;
