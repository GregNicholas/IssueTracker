import React from "react";
import IssueForm from "./IssueForm";

const AddIssue = () => {
  return (
    <>
      <div className="add-edit-issue-form">
        <h2 className="page-title">Add Issue</h2>

        <IssueForm />
      </div>
    </>
  );
};

export default AddIssue;
