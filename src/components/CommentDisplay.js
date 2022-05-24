import React, { useState, useContext } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useIssues } from "../contexts/IssuesContext";

import { db } from "../firebase";
import "firebase/compat/firestore";

const CommentDisplay = ({ issueID, uid, displayComments, deleteComment }) => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { refreshComments } = useIssues();

  const handleDeleteComment = (commentID) => {
    try {
      deleteComment(commentID);
      return true;
    } catch {
      setError("Comment not deleted");
    }
  };

  const allComments = displayComments
    ? displayComments.map((comment) => {
        return (
          <div className="comment-card" key={comment.commentID}>
            <p
              style={{
                fontSize: ".8rem",
                fontWeight: "500",
                fontStyle: "italic"
              }}
            >
              {comment.author} - {comment.date}
            </p>
            <div>{comment.commentText}</div>
            {currentUser.uid === comment.uid ? (
              <p
                onClick={() => handleDeleteComment(comment.commentID)}
                className="delete-comment"
              >
                Delete Comment
              </p>
            ) : null}
          </div>
        );
      })
    : null;

  return (
    <>
      <h3 style={{ paddingTop: "1rem" }}>Comments</h3>
      {allComments && allComments.length > 0 ? (
        allComments
      ) : (
        <div>No Comments to Display</div>
      )}
    </>
  );
};

export default CommentDisplay;
