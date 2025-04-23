import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Reply {
  id: number;
  name: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
  replies: Reply[];
}

interface Comment extends Reply {}

const Community: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [replyIndex, setReplyIndex] = useState<(number | null)[]>([null]);
  const [replyText, setReplyText] = useState("");
  const [replyChain, setReplyChain] = useState<Reply[]>([]);

  const currentUser = {
    name: "Farhan Ali",
    avatar: "/avatar.png",
  };

  const getCurrentDate = () => new Date().toLocaleDateString("en-GB");

  const handleSend = () => {
    if (!input.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      name: currentUser.name,
      avatar: currentUser.avatar,
      text: input,
      date: getCurrentDate(),
      likes: 0,
      replies: [],
    };
    setComments([newComment, ...comments]);
    setInput("");
  };

  const handleLike = (
    item: Reply,
    list: Reply[],
    setList: (val: Reply[]) => void
  ) => {
    const updatedList = list.map((el) =>
      el.id === item.id ? { ...el, likes: el.likes + 1 } : el
    );
    setList(updatedList);
  };

  const openReplyModal = (chain: Reply[]) => {
    setReplyChain(chain);
    setReplyText("");
    setModalShow(true);
  };

  const addReply = (list: Reply[], chain: Reply[], reply: Reply): Reply[] => {
    if (chain.length === 0) return [...list, reply];
    return list.map((item) =>
      item.id === chain[0].id
        ? { ...item, replies: addReply(item.replies, chain.slice(1), reply) }
        : { ...item }
    );
  };

  const handleReplySend = () => {
    if (!replyText.trim()) return;
    const newReply: Reply = {
      id: Date.now(),
      name: currentUser.name,
      avatar: currentUser.avatar,
      text: replyText,
      date: getCurrentDate(),
      likes: 0,
      replies: [],
    };
    const updatedComments = addReply(comments, replyChain, newReply);
    setComments(updatedComments);
    setModalShow(false);
  };

  const renderReplies = (replies: Reply[], parentChain: Reply[] = []) => {
    return replies.map((reply) => (
      <div className="ps-4 pt-2" key={reply.id}>
        <div className="card p-3 bg-white">
          <div className="d-flex align-items-center mb-1">
            {/* <img src={reply.avatar} alt="avatar" className="rounded-circle me-2" width="30" height="30" /> */}
            <div className="personicon">
              <i className="ion-person"></i>
            </div>
            <strong>{reply.name}</strong>
          </div>
          <p className="mb-1">{reply.text}</p>
          <small>{reply.date}</small>
          <div className="d-flex justify-content-end align-items-center mt-1">
            <Button
              variant="link"
              className="text-decoration-none"
              onClick={() =>
                handleLike(reply, replies, (val) =>
                  setComments(addReply(comments, parentChain, val[0]))
                )
              }
            >
              👍 {reply.likes}
            </Button>
            <Button
              variant="link"
              className="text-decoration-none"
              onClick={() => openReplyModal([...parentChain, reply])}
            >
              💬
            </Button>
          </div>
          {renderReplies(reply.replies, [...parentChain, reply])}
        </div>
      </div>
    ));
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

        <div className="mt-4">
          {comments.map((comment) => (
            <div className="card p-3 mb-3 communitycard" key={comment.id}>
              <div className="d-flex align-items-center mb-2">
                {/* <img
                  src={comment.avatar}
                  alt="avatar"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                /> */}
                <div className="personicon">
                    <i className="ion-person"></i>
                </div>
                <strong>{comment.name}</strong>
              </div>
              <p>{comment.text}</p>
              <div className="bottomfooter">
                <small>{comment.date}</small>
                <div className="d-flex justify-content-end align-items-center mt-2">
                  <Button
                    variant="link"
                    className="text-decoration-none"
                    onClick={() => handleLike(comment, comments, setComments)}
                  >
                    👍 {comment.likes}
                  </Button>
                  <Button
                    variant="link"
                    className="text-decoration-none"
                    onClick={() => openReplyModal([comment])}
                  >
                    💬
                  </Button>
                </div>
              </div>
              {renderReplies(comment.replies, [comment])}
            </div>
          ))}
        </div>

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
            <Button variant="secondary" style={{marginRight:"1em"}} onClick={() => setModalShow(false)}>
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
