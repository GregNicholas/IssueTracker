import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useIssues } from "../contexts/IssuesContext";
import { Button, Alert } from "react-bootstrap";
import { db } from "../firebase";

const CommentForm = ({
  issueID,
  displayComments,
  setDisplayComments,
  closeComment
}) => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState();
  const { refreshComments } = useIssues();
  const [loading, setLoading] = useState(false);
  const [issueComment, setIssueComment] = useState(() => {
    return {
      issueID: issueID,
      uid: currentUser.uid,
      author: currentUser.displayName,
      comment: "",
      commentID: uniqueID()
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueComment((prevState) => ({ ...prevState, [name]: value }));
  };

  function uniqueID() {
    function chr4() {
      return Math.random().toString(16).slice(-4);
    }
    return (
      chr4() +
      chr4() +
      "-" +
      chr4() +
      "-" +
      chr4() +
      "-" +
      chr4() +
      "-" +
      chr4() +
      chr4() +
      chr4()
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      uploadComment();
      setCommentSubmitted(true);
    } catch {
      setError("Comment not submitted");
    } finally {
      setLoading(false);
      closeComment(false);
    }
  };

  const uploadComment = async () => {
    const issue = db.collection("issues").doc(issueID);
    let commentDate = new Date().toString();
    commentDate = commentDate.slice(4, commentDate.indexOf(" GMT") - 3);
    const comment = {
      uid: issueComment.uid,
      author: currentUser.displayName,
      commentText: issueComment.comment,
      commentID: issueComment.commentID,
      date: commentDate
    };

    await issue.update({
      comments: [...displayComments, comment]
    });
    refreshComments(issueID, [...displayComments, comment]);
    setDisplayComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {commentSubmitted && <Alert variant="success">Comment Submitted!</Alert>}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="comment" style={{ display: "block" }}></label>
          <textarea
            className="input"
            placeholder="Comment..."
            name="comment"
            id="comment"
            value={issueComment.comment}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          value="Submit"
          style={{ marginRight: ".5rem" }}
        >
          Submit
        </Button>
        <Button variant="secondary" onClick={() => closeComment(false)}>
          Cancel Comment
        </Button>
      </form>
    </>
  );
};

export default CommentForm;
