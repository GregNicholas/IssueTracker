import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useRoles } from "../contexts/RoleContext";
import { useIssues } from "../contexts/IssuesContext";

import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
import ConfirmPopup from "./ConfirmPopup";

import { db } from "../firebase";

import "firebase/compat/firestore";

const Issue = ({ id, handleClick, setDisplayIssue }) => {
  const { currentUser } = useAuth();
  const { isAdmin } = useRoles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [makeComment, setMakeComment] = useState(false);
  const { rIssues, removeIssue } = useIssues();
  const issue = rIssues?.find((el) => el.issueID === id);
  const [displayComments, setDisplayComments] = useState(issue?.comments);

  const modifyDeletePrivilege =
    currentUser.uid === issue?.uid || isAdmin(currentUser.uid);
  const modifyPrivilege = issue?.assignee === currentUser.displayName;

  const handleDelete = () => {
    try {
      deleteIssue(id);
    } catch {
      setError("Issue not submitted");
    }
    setLoading(false);
  };

  const deleteIssue = async (id) => {
    await db
      .collection("issues")
      .where("issueID", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
    removeIssue(id);
    setDisplayIssue(null);
  };

  return (
    <div key={id} className="issue-card">
      <Button
        style={{ position: "relative", float: "right" }}
        variant="secondary"
        onClick={handleClick}
      >
        close
      </Button>

      {modifyDeletePrivilege || modifyPrivilege ? (
        <div style={{ margin: "0 0 1rem 0" }}>
          <Link className="navlink-edit" to="/edit-issue" state={{ id }}>
            <Button
              variant="warning"
              id="edit-button"
              style={{ marginRight: ".5rem" }}
              onClick={() => setDisplayIssue(null)}
            >
              Edit
            </Button>
          </Link>
          {modifyDeletePrivilege && (
            <Button
              variant="danger"
              onClick={() => setPopup(true)}
              style={{ position: "relative", margin: "0 .5rem" }}
              disabled={!modifyDeletePrivilege}
            >
              Delete
            </Button>
          )}
        </div>
      ) : null}

      <div className="card-head">
        <h2 className="header-title">{issue?.subject}</h2>
        <div className="header-row">
          <div className="header-column">
            <p className="header-element">Created: {issue?.dateCreated[1]}</p>
            <p className="header-element">-{issue?.author}</p>
            <p className="header-element">Assigned to: {issue?.assignee}</p>
          </div>
          <div className="header-column header-column2">
            {issue?.dateUpdated && (
              <p className="header-element">Updated: {issue?.dateUpdated[1]}</p>
            )}
            {issue?.updatedBy && (
              <p className="header-element">-{issue?.updatedBy}</p>
            )}
            <p className="header-element">Due: {issue?.dueDate[1]}</p>
          </div>
        </div>
      </div>
      <div className="issue-card-body">
        <div className="issue-row">
          <div className="double-issue-column">
            <div
              className="text-box issue-element"
              style={{ display: "block" }}
            >
              <span
                className="issue-element-title"
                style={{ display: "block" }}
              >
                Description{" "}
              </span>
              <span className="issue-element-value">{issue?.description}</span>
            </div>
          </div>
        </div>

        <div className="issue-row">
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Type </span>
              <span className="issue-element-value">{issue?.issueType}</span>
            </div>
          </div>
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Category </span>
              <span className="issue-element-value">{issue?.category}</span>
            </div>
          </div>
        </div>
        <div className="issue-row">
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Status </span>
              {issue?.status}
            </div>
          </div>
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Priority </span>
              {issue?.priority}
            </div>
          </div>
        </div>

        <div className="comment-list double-issue-section">
          <CommentDisplay
            issueID={id}
            uid={issue?.uid}
            displayComments={displayComments}
            setDisplayComments={setDisplayComments}
          />
        </div>

        {!makeComment ? (
          <>
            <Button variant="primary" onClick={() => setMakeComment(true)}>
              New Comment
            </Button>
          </>
        ) : null}

        {makeComment ? (
          <CommentForm
            issueID={id}
            comments={issue?.comments}
            displayComments={displayComments}
            setDisplayComments={setDisplayComments}
            closeComment={setMakeComment}
          />
        ) : null}
      </div>
      {popup ? (
        <ConfirmPopup handleDelete={handleDelete} setPopup={setPopup} />
      ) : null}
    </div>
  );
};

export default Issue;
