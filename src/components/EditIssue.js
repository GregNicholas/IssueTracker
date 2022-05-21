import React from "react";
import IssueForm from "./IssueForm";
import { useNavigate, useLocation } from "react-router-dom";

const EditIssue = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state === undefined) {
    navigate("/issues");
  }

  return (
    <>
      <div className="add-edit-issue-form">
        <h2 className="page-title">Edit Issue</h2>

        <IssueForm issue={location.state} />
      </div>
    </>
  );
};

export default EditIssue;
