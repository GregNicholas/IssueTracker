import React, { useEffect, useState } from "react";
import { useIssues } from "../contexts/IssuesContext";
import IssueTable from "./IssueTable";
import Issue from "./Issue";

const Issues = () => {
  const { displayIssue, setDisplayIssue, rIssues } = useIssues();
  const columns = React.useMemo(
    () => [
      {
        Header: "Issue Table",
        Footer: "Click on an item for details",
        columns: [
          {
            Header: "Assignee",
            accessor: "col0"
          },
          {
            Header: "Subject",
            accessor: "col1"
          },
          {
            Header: "IssueType",
            accessor: "col2"
          },
          {
            Header: "Category",
            accessor: "col3"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(
    () =>
      rIssues?.map((issue) => {
        return {
          col0: issue.assignee,
          col1: issue.subject,
          col2: issue.issueType,
          col3: issue.category,
          priority: issue.priority,
          status: issue.status,
          id: issue.issueID
        };
      }),
    [rIssues]
  );

  const handleClick = (e) => {
    if (displayIssue === null) {
      const issue = rIssues.filter((i) => i.issueID === e.target.id)[0];

      setDisplayIssue(issue);
    } else {
      setDisplayIssue(null);
    }
  };

  return (
    <div className="centered-container">
      <div class="tooltip">
        Hover over me
        <span class="tooltiptext">Tooltip text</span>
      </div>
      <h2 className="page-title">Issues</h2>
      {displayIssue ? (
        <Issue
          {...displayIssue}
          id={displayIssue.issueID}
          setDisplayIssue={setDisplayIssue}
          handleClick={handleClick}
          className="issue"
        />
      ) : rIssues?.length > 0 ? (
        <>
          <IssueTable columns={columns} data={data} handleClick={handleClick} />
        </>
      ) : (
        <p className="message">No Issues TABLE Available</p>
      )}
    </div>
  );
};

export default Issues;
